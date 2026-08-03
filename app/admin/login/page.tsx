"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Logomark from "@/app/components/Logomark";
import { login, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="mesh-hero flex min-h-screen items-center justify-center px-6 py-24">
      <div className="glass w-full max-w-sm rounded-3xl p-8">
        <div className="flex items-center gap-2.5">
          <Logomark className="h-9 w-9" />
          <div>
            <h1 className="text-base font-semibold text-white">Admin Sign In</h1>
            <p className="text-xs text-white/55">Imole Aibana Foundation CMS</p>
          </div>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-royal-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-royal-400"
            />
          </div>

          {state?.error && <p className="text-sm text-red-300">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="glass-gold w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
