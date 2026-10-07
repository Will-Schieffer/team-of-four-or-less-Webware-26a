import { Show, SignInButton, UserButton } from "@clerk/react";
import { Link } from "react-router";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-slate-950 px-6 py-4 text-white">
      <Link to="/" className="text-lg">
        <Logo />
      </Link>

      <Show when="signed-out">
        <SignInButton>
          <button
            type="button"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Sign in
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
}
