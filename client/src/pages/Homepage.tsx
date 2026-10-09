import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";

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
      <div className="flex items-center justify-between w-full bg-slate-950 pt-16 pb-16">
        <section className="flex flex-col mt-16 ml-20 text-left">
          <h1 className="text-5xl font-bold pb-2">
            Ranked #1 in Utility Comparison
          </h1>
          <h2 className="text-2xl font-medium mt-2 pb-4">
            Voted the best utility comparison tool by users across the country!
          </h2>
        </section>
        <img className="w-[40vw] h-auto rounded-xl mr-20" src="../../public/number-one.jpg" />
      </div>
      <div className="flex items-center justify-between w-full bg-slate-950 pt-16 pb-16">
        <img className="w-[40vw] h-auto rounded-xl ml-20" src="../../public/telephone-line.jpg" />
        <section className="flex flex-col mt-16 mr-20 text-right">
          <h1 className="text-5xl font-bold pb-2">
            Save Your Favorite Providers
          </h1>
          <h2 className="text-2xl font-medium mt-2 pb-4">
          Utilicheck allows you to save your favorite providers for easy access.
          </h2>
        </section>
      </div>
      <Footer />
    </main>
  );
}
