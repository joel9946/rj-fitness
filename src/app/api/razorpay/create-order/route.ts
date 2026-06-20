import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/utils/supabase/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan, amount } = await req.json();

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      receipt: `receipt_order_${user.id}`,
      notes: {
        userId: user.id,
        planId: plan,
      }
    };

    let order;
    if (
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID === "rzp_test_placeholder" ||
      process.env.RAZORPAY_KEY_SECRET === "rzp_secret_placeholder" ||
      !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      // Mock order for testing
      order = {
        id: `order_mock_${Math.random().toString(36).substr(2, 9)}`,
        entity: "order",
        amount: amount * 100,
        amount_paid: 0,
        amount_due: amount * 100,
        currency: "INR",
        receipt: options.receipt,
        status: "created",
        attempts: 0,
        notes: options.notes,
        created_at: Math.floor(Date.now() / 1000)
      };
    } else {
      order = await razorpay.orders.create(options);
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
