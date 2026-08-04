import Link from "next/link";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { connectDB } from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { verifyTransaction } from "@/lib/paystack";

type Props = { searchParams: Promise<{ reference?: string }> };

export default async function DonateCallbackPage({ searchParams }: Props) {
  const { reference } = await searchParams;

  let status: "success" | "failed" | "error" = "error";
  let amount = 0;

  if (reference) {
    try {
      const result = await verifyTransaction(reference);
      amount = result.amount / 100;
      status = result.status === "success" ? "success" : "failed";

      await connectDB();
      const donation = await Donation.findOne({ reference });
      if (donation && donation.status === "pending") {
        donation.status = status;
        donation.channel = result.channel ?? "";
        if (result.paid_at) donation.paidAt = new Date(result.paid_at);
        await donation.save();
      }
    } catch {
      status = "error";
    }
  }

  return (
    <div className="mesh-hero relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <div className="glass relative max-w-md rounded-3xl p-10 text-center">
        {status === "success" && (
          <>
            <CheckCircle2 size={48} className="mx-auto text-emerald-400" />
            <h1 className="mt-5 text-2xl font-semibold text-white">Thank You!</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Your donation of ₦{amount.toLocaleString()} was received. We&apos;re deeply grateful
              for your support.
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle size={48} className="mx-auto text-red-400" />
            <h1 className="mt-5 text-2xl font-semibold text-white">Payment Not Completed</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Your payment wasn&apos;t completed and you haven&apos;t been charged. Feel free to try
              again.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <Clock size={48} className="mx-auto text-gold-400" />
            <h1 className="mt-5 text-2xl font-semibold text-white">We&apos;re Checking Your Payment</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              We couldn&apos;t confirm your payment status right away. If you completed checkout,
              it will be reflected shortly.
            </p>
          </>
        )}

        <Link
          href="/donate"
          className="glass-gold mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Back to Donate Page
        </Link>
      </div>
    </div>
  );
}
