"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import Script from "next/script";

export default function RazorpayCheckoutButton({ isPaid, memberData }: { isPaid: boolean, memberData: any }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // 1. Create order on the server
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: 'standard', 
          amount: 4999 // ₹4999 INR
        }),
      });

      const data = await res.json();
      
      if (!data.order) {
        throw new Error("Failed to create Razorpay Order");
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Aura Fitness",
        description: "Premium Athlete Ecosystem Access",
        order_id: data.order.id,
        handler: function (response: any) {
             alert("Payment Successful! Welcome to Aura Fitness.");
             window.location.reload(); // Reload to fetch new membership status from Supabase
        },
        prefill: {
          email: memberData?.email || "",
          name: memberData?.full_name || "",
        },
        theme: {
          color: "#FF3131"
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to initialize payment gateway. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
          isPaid 
          ? "bg-surface border border-white/10 hover:bg-white/5 text-white" 
          : "bg-primary hover:bg-red-600 text-white shadow-[0_0_20px_rgba(255,49,49,0.3)] hover:shadow-[0_0_30px_rgba(255,49,49,0.5)] cursor-pointer"
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <CreditCard className="h-5 w-5" />
        {loading ? "Initializing..." : isPaid ? "Manage Billing" : "Renew Membership"}
      </button>
    </>
  );
}
