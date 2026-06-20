import { createClient } from "@/utils/supabase/server";
import { Users, CreditCard, Activity, ArrowRight } from "lucide-react";
import { NewCustomersBarChart, DailyCheckinsLineChart } from "@/components/AdminCharts";
import { AdminTable } from "@/components/AdminTable";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  // Basic queries for KPI and Table implementation.
  // In a production app, the SQL queries from the plan would be executed via Supabase RPC or direct ORM if Prisma was used.
  // For now, we perform the aggregations natively.

  const { data: members, error } = await supabase.from("members").select("*").order("created_at", { ascending: false });

  const totalMembers = members?.length || 0;
  const activePaid = (members as any[])?.filter((m: any) => m.membership_status === "paid").length || 0;
  const pendingUnpaid = totalMembers - activePaid;

  // Mock data for charts (Based on the SQL queries in our plan)
  const barChartData = [
    { month: "Jan", customers: 12 }, { month: "Feb", customers: 19 }, { month: "Mar", customers: 15 },
    { month: "Apr", customers: 22 }, { month: "May", customers: 28 }, { month: "Jun", customers: 35 },
  ];

  const lineChartData = [
    { day: "01", checkins: 45 }, { day: "02", checkins: 52 }, { day: "03", checkins: 48 },
    { day: "04", checkins: 61 }, { day: "05", checkins: 59 }, { day: "06", checkins: 75 },
    { day: "07", checkins: 82 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ADMIN COMMAND CENTER</h1>
            <p className="text-gray-400">Gym analytics and membership oversight.</p>
          </div>
          <Link href="/dashboard" className="glass-panel px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
            Back to Dashboard
          </Link>
        </header>

        {/* KPI CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-accent relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform"><Users className="w-32 h-32" /></div>
            <p className="text-gray-400 font-medium mb-1">Total Active Customers</p>
            <h3 className="text-4xl font-black text-white">{activePaid}</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-400 relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform"><CreditCard className="w-32 h-32" /></div>
            <p className="text-gray-400 font-medium mb-1">Monthly Revenue (Est.)</p>
            <h3 className="text-4xl font-black text-white">${activePaid * 49}</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform"><Activity className="w-32 h-32" /></div>
            <p className="text-gray-400 font-medium mb-1">Pending Payments</p>
            <h3 className="text-4xl font-black text-white">{pendingUnpaid}</h3>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> New Customers (Last 6 Months)</h3>
            <NewCustomersBarChart data={barChartData} />
          </div>
          <div className="glass-panel p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /> Daily New Members (Current Month)</h3>
            <DailyCheckinsLineChart data={lineChartData} />
          </div>
        </div>

        {/* MEMBER TABLE */}
        <AdminTable initialMembers={members || []} />

      </div>
    </div>
  );
}
