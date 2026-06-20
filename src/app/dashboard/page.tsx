import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Dumbbell, CreditCard, LogOut, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";

function getRemainingDays(endDateString: string | null) {
  if (!endDateString) return 0;
  
  const endDate = new Date(endDateString);
  const now = new Date();
  
  endDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch from members table
  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", user.id)
    .single();

  const daysRemaining = getRemainingDays(member?.membership_end_date);
  const isPaid = member?.membership_status === "paid";
  const statusColor = isPaid ? "text-accent" : "text-primary";
  const glowColor = isPaid ? "shadow-[0_0_30px_rgba(0,229,255,0.2)]" : "shadow-[0_0_30px_rgba(255,49,49,0.2)]";

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">MEMBER AREA</h1>
            <p className="text-gray-400">Welcome back, {member?.full_name || user.email}</p>
          </div>
          <div className="flex gap-4">
             {member?.is_admin && (
                <Link href="/admin" className="glass-panel px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors border-accent/30 text-accent">
                  Admin Dashboard
                </Link>
             )}
            <form action="/auth/signout" method="post">
              <button className="glass-panel px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </form>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Status Card */}
          <div className={`glass-panel p-8 rounded-3xl md:col-span-2 relative overflow-hidden ${glowColor}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20 ${isPaid ? "bg-accent" : "bg-primary"}`} />
            
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Current Status</p>
                <div className="flex items-center gap-3">
                  {isPaid ? <CheckCircle className={`h-8 w-8 ${statusColor}`} /> : <AlertTriangle className={`h-8 w-8 ${statusColor}`} />}
                  <h2 className={`text-3xl font-bold ${statusColor} uppercase`}>
                    {member?.membership_status || 'Unpaid'}
                  </h2>
                </div>
              </div>
              <Dumbbell className={`h-12 w-12 opacity-20 ${statusColor}`} />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-400 mb-1">Days Remaining</p>
                <p className="text-5xl font-black">{daysRemaining}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Expiration Date</p>
                <p className="text-xl font-medium mt-3">
                  {member?.membership_end_date ? format(new Date(member.membership_end_date), "MMM dd, yyyy") : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Subscription</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Manage your billing, update your payment methods, and review your invoice history securely via Razorpay.
              </p>
            </div>
            
            <RazorpayCheckoutButton isPaid={isPaid} memberData={member} />
          </div>
        </div>

      </div>
    </div>
  );
}
