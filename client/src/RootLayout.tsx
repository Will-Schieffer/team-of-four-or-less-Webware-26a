import { ClerkProvider } from "@clerk/react";
import { Route, Routes, useNavigate } from "react-router";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const appearance = {
  variables: {
    colorPrimary: "#0f766e",
    borderRadius: "0.75rem",
    fontFamily: "inherit",
  },
};

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      appearance={appearance}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <Routes>
        <Route path="/" element={<App />} />
        {/* Must be a splat route so Clerk's nested steps resolve */}
        <Route path="/sign-in/*" element={<LoginPage />} />
      </Routes>
    </ClerkProvider>
  );
}
