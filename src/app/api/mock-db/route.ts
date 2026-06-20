import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "mock-db.json");

function readDb() {
  try {
    const content = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(content);
  } catch (e) {
    return { users: [], members: [] };
  }
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}

function generateId() {
  return "mock-uuid-" + Math.random().toString(36).substr(2, 9) + "-" + Math.random().toString(36).substr(2, 9);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;
    const db = readDb();

    if (action === "signIn") {
      const { email, password } = body;
      const user = db.users.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
      }

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            full_name: user.full_name
          }
        }
      });
    }

    if (action === "signUp") {
      const { email, password, fullName } = body;
      const exists = db.users.some((u: any) => u.email === email);
      if (exists) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      const newId = generateId();
      const newUser = {
        id: newId,
        email,
        password,
        full_name: fullName || email.split("@")[0]
      };

      const newMember = {
        id: newId,
        full_name: newUser.full_name,
        email: newUser.email,
        membership_status: "unpaid",
        membership_plan: "standard",
        membership_start_date: null,
        membership_end_date: null,
        is_admin: false,
        created_at: new Date().toISOString()
      };

      db.users.push(newUser);
      db.members.push(newMember);
      writeDb(db);

      return NextResponse.json({
        user: {
          id: newId,
          email,
          user_metadata: {
            full_name: newMember.full_name
          }
        }
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error: any) {
    console.error("Mock DB API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
