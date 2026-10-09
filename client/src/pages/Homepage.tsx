import Navbar from "../components/Navbar";
import Search from "../components/Search";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <div
        className="w-full min-h-[calc(100vh-10vh)] mt-[8vh] bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 24, 0) 60%, rgba(2, 6, 24, 1) 100%),
            url('/homepage.jpg')`,
          backgroundPosition: "top center",
          backgroundSize: "115% auto",
        }}
      >
        <section className="flex flex-col items-center justify-center mt-16 px-6 text-center">
          <h1 className="text-5xl font-bold pb-2">Welcome to Utilicheck!</h1>
          <h2 className="text-2xl font-medium mt-2 pb-4">
            Utilicheck shows you every provider at your address so you can find
            your best option!
          </h2>
          <h3 className="text-lg font-medium mt-2 pb-4">
            Search for your address or ZIP code!
          </h3>
          <Search />
        </section>
      </div>
      <section className="flex flex-col items-center justify-center mt-16 px-6 text-center">
        <h1 className="text-5xl font-bold pb-2">TESTING</h1>
        <h2 className="text-2xl font-medium mt-2 pb-4">
          THIS AREA IS TO TEST THE BACKGROUND AND SCROLL
        </h2>
        <p>Example text found here</p>
      </section>
    </main>
  );
}
