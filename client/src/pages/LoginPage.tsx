import { SignIn } from "@clerk/react";
import { Link } from "react-router";
import Logo from "../components/Logo";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-teal-500/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 h-[32rem] w-[32rem] rounded-full bg-emerald-400/20 blur-3xl"
      />

      <div className="relative grid min-h-svh lg:grid-cols-2">
        <aside className="relative hidden flex-col justify-between p-12 lg:flex">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/login-hero.jpg')" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/60 to-slate-950"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"
          />

          <Link to="/" className="relative text-xl">
            <Logo />
          </Link>

          <div className="relative max-w-md">
            <h1 className="text-4xl leading-tight font-semibold tracking-tight">
              Every utility provider for your address, in one place.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Skip the dozen browser tabs. Compare what's available the moment
              you move.
            </p>
          </div>
        </aside>

        <main className="flex flex-col items-center justify-center px-6 py-12">
          <Link to="/" className="mb-8 text-xl lg:hidden">
            <Logo />
          </Link>
          <SignIn />
        </main>
      </div>
    </div>
  );
}
