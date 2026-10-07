import Navbar from "./components/Navbar";

// Public home page: usable signed in or out.
export default function App() {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">
          Find utilities for your address
        </h1>
      </main>
    </div>
  );
}
