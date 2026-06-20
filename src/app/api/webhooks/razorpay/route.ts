import { NextResponse } from "next/server";
import crypto from "crypto";
import { mockSupabase as supabaseAdmin } from "@/utils/supabase/mockSupabase";
import { addDays } from "date-fns";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_KEY_SECRET!;

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        
        // Retrieve custom notes we attached during create-order
        const userId = payment.notes?.userId;
        const planId = payment.notes?.planId;

        if (userId) {
            // Update the user's membership status in Supabase
            const { error } = await supabaseAdmin
              .from('members')
              .update({
                membership_status: 'paid',
                membership_plan: planId || 'standard',
                membership_start_date: new Date().toISOString(),
                membership_end_date: addDays(new Date(), 30).toISOString(),
              })
              .eq('id', userId);

            if (error) {
                console.error("Error updating member in Supabase:", error);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
