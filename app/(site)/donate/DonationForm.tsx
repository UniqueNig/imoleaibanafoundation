"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { HandCoins } from "lucide-react";
import { initializeDonation, type DonateActionState } from "./actions";

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000];

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-royal-400";

export default function DonationForm() {
  const [state, formAction, pending] = useActionState<DonateActionState, FormData>(
    initializeDonation,
    undefined
  );
  const [selected, setSelected] = useState<number>(PRESET_AMOUNTS[1]);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  function selectPreset(amount: number) {
    setSelected(amount);
    if (amountInputRef.current) amountInputRef.current.value = String(amount);
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white/80">Amount (₦)</label>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => selectPreset(amount)}
              className={`rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors ${
                selected === amount ? "glass-gold text-white" : "glass text-white/70 hover:text-white"
              }`}
            >
              ₦{amount.toLocaleString()}
            </button>
          ))}
        </div>
        <label htmlFor="amount" className="mt-3 block text-xs font-medium text-white/50">
          Or enter a custom amount
        </label>
        <input
          ref={amountInputRef}
          id="amount"
          name="amount"
          type="number"
          min={100}
          step={100}
          required
          defaultValue={selected}
          onChange={() => setSelected(0)}
          placeholder="e.g. 15,000"
          className={`${inputClass} mt-1.5`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-white/80">Full name (optional)</label>
          <input name="name" className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80">Email</label>
          <input name="email" type="email" required className={`${inputClass} mt-1.5`} />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="glass-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <HandCoins size={18} />
        {pending ? "Redirecting to secure checkout…" : "Donate Now"}
      </button>

      <p className="text-center text-xs text-white/40">
        You&apos;ll be redirected to Paystack&apos;s secure checkout to complete your payment.
      </p>
    </form>
  );
}
