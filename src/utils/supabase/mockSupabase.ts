// Local Mock Supabase Client
const SESSION_COOKIE_NAME = "sb-mock-session";

// Helpers to read/write/delete cookies in both browser and server environments
function getSessionCookie(): any {
  if (typeof window !== "undefined") {
    const match = document.cookie.match(new RegExp("(^| )" + SESSION_COOKIE_NAME + "=([^;]+)"));
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch (e) {
        return null;
      }
    }
    return null;
  } else {
    try {
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      const val = cookieStore.get(SESSION_COOKIE_NAME)?.value;
      return val ? JSON.parse(val) : null;
    } catch (e) {
      return null;
    }
  }
}

function setSessionCookie(sessionData: any) {
  const value = encodeURIComponent(JSON.stringify(sessionData));
  if (typeof window !== "undefined") {
    // 7 days expiration
    document.cookie = `${SESSION_COOKIE_NAME}=${value}; max-age=${60 * 60 * 24 * 7}; path=/`;
  } else {
    try {
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
      });
    } catch (e) {
      // Ignore set errors in read-only environments
    }
  }
}

function deleteSessionCookie() {
  if (typeof window !== "undefined") {
    document.cookie = `${SESSION_COOKIE_NAME}=; max-age=-1; path=/`;
  } else {
    try {
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);
    } catch (e) {
      // Ignore delete errors in read-only environments
    }
  }
}

// Read/write the JSON DB file. This is server-side only.
function readDbSync() {
  if (typeof window !== "undefined") return { users: [], members: [] };
  try {
    const fs = require("fs");
    const path = require("path");
    const dbPath = path.resolve(process.cwd(), "mock-db.json");
    const content = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(content);
  } catch (e) {
    console.error("Error reading mock-db.json:", e);
    return { users: [], members: [] };
  }
}

function writeDbSync(data: any) {
  if (typeof window !== "undefined") return;
  try {
    const fs = require("fs");
    const path = require("path");
    const dbPath = path.resolve(process.cwd(), "mock-db.json");
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing mock-db.json:", e);
  }
}

class MockQueryBuilder {
  private table: string;
  private filters: { column: string; value: any }[] = [];
  private orderCol: string | null = null;
  private orderOpts: any = null;
  private isSingle = false;
  private updateData: any = null;

  constructor(table: string) {
    this.table = table;
  }

  select(columns: string = "*") {
    return this;
  }

  update(data: any) {
    this.updateData = data;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ column, value });
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  order(column: string, options: any = {}) {
    this.orderCol = column;
    this.orderOpts = options;
    return this;
  }

  // Chaining thenable
  async then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    try {
      const result = await this.execute();
      if (onfulfilled) return onfulfilled(result);
      return result;
    } catch (error) {
      if (onrejected) return onrejected(error);
      throw error;
    }
  }

  private async execute() {
    // DB reads/writes only happen on the server side
    const db = readDbSync();
    let list = db[this.table] || [];

    if (this.updateData) {
      const updatedList = list.map((item: any) => {
        let isMatch = true;
        for (const filter of this.filters) {
          if (item[filter.column] !== filter.value) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          return { ...item, ...this.updateData };
        }
        return item;
      });

      db[this.table] = updatedList;
      writeDbSync(db);
      return { data: this.updateData, error: null };
    }

    // Apply filters
    for (const filter of this.filters) {
      list = list.filter((item: any) => item[filter.column] === filter.value);
    }

    // Apply order
    if (this.orderCol) {
      const col = this.orderCol;
      const asc = this.orderOpts?.ascending !== false;
      list.sort((a: any, b: any) => {
        if (a[col] < b[col]) return asc ? -1 : 1;
        if (a[col] > b[col]) return asc ? 1 : -1;
        return 0;
      });
    }

    if (this.isSingle) {
      const first = list[0] || null;
      return { data: first, error: first ? null : { message: "Row not found", code: "PGRST116" } };
    }

    return { data: list, error: null };
  }
}

export const mockSupabase = {
  auth: {
    getUser: async () => {
      const session = getSessionCookie();
      if (session && session.user) {
        return { data: { user: session.user }, error: null };
      }
      return { data: { user: null }, error: null };
    },

    signInWithPassword: async ({ email, password }: any) => {
      try {
        if (typeof window !== "undefined") {
          // Client-side authentication via API route
          const res = await fetch("/api/mock-db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "signIn", email, password })
          });
          const data = await res.json();
          if (!res.ok || data.error) {
            return { data: { user: null }, error: { message: data.error || "Authentication failed" } };
          }
          setSessionCookie({ user: data.user });
          return { data: { user: data.user }, error: null };
        } else {
          // Server-side authentication (fallback)
          const db = readDbSync();
          const user = db.users.find((u: any) => u.email === email && u.password === password);
          if (!user) {
            return { data: { user: null }, error: { message: "Invalid email or password" } };
          }
          const member = db.members.find((m: any) => m.id === user.id);
          const sessionUser = {
            id: user.id,
            email: user.email,
            user_metadata: {
              full_name: user.full_name,
              is_admin: member?.is_admin === true
            }
          };
          setSessionCookie({ user: sessionUser });
          return { data: { user: sessionUser }, error: null };
        }
      } catch (err: any) {
        return { data: { user: null }, error: { message: err.message || "Network error" } };
      }
    },

    signUp: async ({ email, password, options }: any) => {
      try {
        const fullName = options?.data?.full_name || email.split("@")[0];
        if (typeof window !== "undefined") {
          // Client-side registration via API route
          const res = await fetch("/api/mock-db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "signUp", email, password, fullName })
          });
          const data = await res.json();
          if (!res.ok || data.error) {
            return { data: { user: null }, error: { message: data.error || "Registration failed" } };
          }
          
          // Sign up session defaults to non-admin
          const sessionUser = {
            id: data.user.id,
            email: data.user.email,
            user_metadata: {
              full_name: fullName,
              is_admin: false
            }
          };
          setSessionCookie({ user: sessionUser });
          return { data: { user: sessionUser }, error: null };
        } else {
          // Server-side registration (fallback)
          const db = readDbSync();
          if (db.users.some((u: any) => u.email === email)) {
            return { data: { user: null }, error: { message: "User already exists" } };
          }
          const newId = "mock-uuid-" + Math.random().toString(36).substr(2, 9);
          const newUser = { id: newId, email, password, full_name: fullName };
          const newMember = {
            id: newId,
            full_name: fullName,
            email,
            membership_status: "unpaid",
            membership_plan: "standard",
            membership_start_date: null,
            membership_end_date: null,
            is_admin: false,
            created_at: new Date().toISOString()
          };
          db.users.push(newUser);
          db.members.push(newMember);
          writeDbSync(db);

          const sessionUser = {
            id: newId,
            email,
            user_metadata: {
              full_name: fullName,
              is_admin: false
            }
          };
          setSessionCookie({ user: sessionUser });
          return { data: { user: sessionUser }, error: null };
        }
      } catch (err: any) {
        return { data: { user: null }, error: { message: err.message || "Network error" } };
      }
    },

    signOut: async () => {
      deleteSessionCookie();
      return { error: null };
    }
  },

  from: (table: string) => {
    return new MockQueryBuilder(table);
  }
};
