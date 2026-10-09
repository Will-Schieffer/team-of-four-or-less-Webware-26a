import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Navbar from "../components/Navbar";

export default function ResultsPage() {
  const { userInput } = useParams();
  const userInputUpper = userInput?.trim().toUpperCase();

  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/utilities/${userInput}`,
        );
        if (!response.ok) {
          throw new Error("Failed to find utilities for this address/ZIP Code.");
        }
        const data = await response.json();
        setUtilities(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userInput) {
      fetchUtilities();
    }
  }, [userInput]);

  return (
    <div className="min-h-svh bg-slate-50 p-6 text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-3xl mt-[8vh]">
        <Link
          to="/"
          className="text-teal-600 hover:underline mb-6 inline-block"
        >
          &larr; Back to Search
        </Link>

        <h1 className="text-3xl font-semibold mb-6">Providers for {userInputUpper}</h1>

        {loading && <p className="text-slate-500">Loading your options...</p>}
        {error && (
          <p className="text-red-500 bg-red-50 p-4 rounded-md">{error}</p>
        )}

        {!loading && !error && utilities.length === 0 && (
          <p className="text-slate-500">No utilities found for this area.</p>
        )}

        <div className="grid gap-4">
          {utilities.map((utility: any, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
            >
              <h2 className="text-xl font-medium text-slate-800">
                {utility.name}
              </h2>
              <p className="text-slate-500 mt-1">
                Type: <span className="capitalize">{utility.type}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
