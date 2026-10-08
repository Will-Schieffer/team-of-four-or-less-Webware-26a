import { Show, SignInButton, UserButton } from "@clerk/react";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import Search from "./Search";

export default function Navbar() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full h-[8vh] bg-slate-950 px-6 py-4 text-white">
      <div>
        <Link to="/" className="text-lg">
          <Logo />
        </Link>

        {!isHomepage && (
          <div className="ml-4 inline-block">
            <Search />
          </div>
        )}
      </div> 
      <Show when="signed-out">
        <SignInButton>
          <button
            type="button"
            className=" group rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            <span className='inline-block font-bold transition-transform duration-200 group-hover:scale-125'>Sign In</span>
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton appearance={{ elements: {
          userButtonTrigger: "w-12 h-12 min-w-12 min-h-12",
          userButtonAvatarBox: "w-12 h-12 min-w-12 min-h-12",
          userButtonAvatarImg: "w-12 h-12"
        }}} />
      </Show>
    </nav>
  );
}
