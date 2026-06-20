"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";

export function AdminTable({ initialMembers }: { initialMembers: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = initialMembers.filter(
    (m) =>
      m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-3xl overflow-hidden mt-8">
      <div className="p-8 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
        <h3 className="text-xl font-bold">Member Directory</h3>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface/50 text-gray-400 text-sm">
            <tr>
              <th className="px-8 py-4 font-medium tracking-wider uppercase">Member</th>
              <th className="px-8 py-4 font-medium tracking-wider uppercase">Email</th>
              <th className="px-8 py-4 font-medium tracking-wider uppercase">Status</th>
              <th className="px-8 py-4 font-medium tracking-wider uppercase">Expires On</th>
              <th className="px-8 py-4 font-medium tracking-wider uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredMembers?.map((member) => (
              <tr key={member.id} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-4 font-medium">{member.full_name || "N/A"}</td>
                <td className="px-8 py-4 text-gray-400">{member.email}</td>
                <td className="px-8 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      member.membership_status === "paid"
                        ? "bg-accent/20 text-accent border border-accent/20"
                        : "bg-primary/20 text-primary border border-primary/20"
                    }`}
                  >
                    {member.membership_status || "unpaid"}
                  </span>
                </td>
                <td className="px-8 py-4 text-gray-400">
                  {member.membership_end_date
                    ? format(new Date(member.membership_end_date), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="px-8 py-4 text-right">
                  <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-gray-400">
                  No members found matching "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
