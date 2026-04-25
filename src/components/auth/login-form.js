"use client";

import { useActionState } from "react";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { loginAction } from "@/app/login/actions";
import SiteHeader from "@/components/shared/site-header";

const initialState = {
  error: "",
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full   flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <SiteHeader activeItem="Home" actionLabel="Secure Login" showSearch={false} />

        <section className="overflow-hidden rounded-[36px] border">
          <div className="grid min-h-[760px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between px-6 py-10 sm:px-10">
              <div className="max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.2em]">
                  Secure Operator Access
                </p>
                <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight lg:text-6xl">
                  Live Air Quality.
                  <br />
                  <span className="text-blue-600">Healthier Tomorrow.</span>
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-9 opacity-80">
                  Sign in to monitor live AQI, location-level telemetry, smart alerts,
                  and device control from a unified air quality dashboard.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600" />
                    Realtime data
                  </span>
                  <span>Hyperlocal insights</span>
                  <span>Smart alerts</span>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border p-5">
                  <p className="text-[11px] uppercase tracking-[0.16em]">
                    Monitoring
                  </p>
                  <p className="mt-3 text-lg font-semibold">Realtime nodes</p>
                  <p className="mt-2 text-sm">
                    Track AQI at every active location.
                  </p>
                </div>
                <div className="rounded-[24px] border p-5">
                  <p className="text-[11px] uppercase tracking-[0.16em]">
                    Alerts
                  </p>
                  <p className="mt-3 text-lg font-semibold">Threshold triggers</p>
                  <p className="mt-2 text-sm">
                    Surface incidents before they escalate.
                  </p>
                </div>
                <div className="rounded-[24px] border p-5">
                  <p className="text-[11px] uppercase tracking-[0.16em]">
                    Control
                  </p>
                  <p className="mt-3 text-lg font-semibold">Remote purifier</p>
                  <p className="mt-2 text-sm">
                    Manage device state from the dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center px-6 py-10 sm:px-10">
              <div className="mx-auto w-full max-w-md">
                <div className="rounded-3xl border p-8 shadow-[0_18px_42px_rgba(140,185,204,0.12)]">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>

                  <p className="mt-6 text-[11px] uppercase tracking-[0.16em]">
                    Sign In
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    Access Dashboard
                  </h2>
                  <p className="mt-2 text-sm">
                    Enter your operator credentials to continue.
                  </p>

                  <form action={formAction} className="mt-8 space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-200">Email</span>
                      <div className="flex items-center gap-3 border p-4 rounded-xl">
                        <Mail className="h-4 w-4" />
                        <input
                          name="email"
                          type="email"
                          placeholder="operator@atmosgrid.com"
                          defaultValue="operator@atmosgrid.com"
                          className="w-full bg-transparent text-sm outline-none placeholder"
                          autoComplete="email"
                        />
                      </div>
                    </label>

                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-200">Password</span>
                      <div className="flex items-center gap-3 border p-4 rounded-xl">
                        <LockKeyhole className="h-4 w-4" />
                        <input
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          defaultValue="Operator@123"
                          className="w-full bg-transparent text-sm outline-none placeholder"
                          autoComplete="current-password"
                        />
                      </div>
                    </label>

                    {state?.error ? (
                      <div className="rounded-2xl border border-[#F3D6D6] bg-[#FFF5F5] px-4 py-3 text-sm text-[#A35E5E]">
                        {state.error}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={pending}
                      className="inline-flex p-4 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer disabled:opacity-60"
                    >
                      {pending ? "Signing in..." : "Sign in"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="mt-6 rounded-[22px] border p-4">
                    <p className="text-[11px] uppercase tracking-[0.16em]">
                      Demo Credentials
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      operator@atmosgrid.com
                    </p>
                    <p className="mt-1 text-sm">Operator@123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
