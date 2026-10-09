import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Navbar from "../components/Navbar";
import SaveLocationButton from "../components/SaveLocationButton";

type Offering = {
  id: number;
  category: string;
  provider: { name: string };
};

type UtilityResponse = {
  place: { city: string; state: string; zip: string };
  utilities: Record<string, Offering[]>;
};

export default function ResultsPage() {
  const { userInput } = useParams();
  const userInputUpper = userInput?.trim().toUpperCase();

  const [utilities, setUtilities] = useState<Offering[]>([]);
  const [place, setPlace] = useState<UtilityResponse["place"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);
    setUtilities([]);
    setPlace(null);

    const fetchUtilities = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/utilities/${zip}`,
          { signal: controller.signal },
        );

        if (response.status === 404) return;

        if (!response.ok) {
          throw new Error("Failed to find utilities for this address/ZIP Code.");
        }

        const data: UtilityResponse = await response.json();

        if (controller.signal.aborted) return;

        setPlace(data.place);
        setUtilities(Object.values(data.utilities).flat());
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Unable to load utilities.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    if (userInput) {
      fetchUtilities();
    } else {
      setError("A ZIP code is required.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [zip]);

  return (
    <div className="min-h-svh bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-6 pt-[calc(10vh+1.5rem)]">
        <Link
          to="/"
          className="text-teal-600 hover:underline mb-6 inline-block"
        >
          &larr; Back to Search
        </Link>

        <h1 className="text-3xl font-semibold mb-6">
          Providers for{" "}
          {place ? `${place.city}, ${place.state} · ${place.zip}` : zip}
        </h1>

        {!loading && !error && place && (
          <div className="mb-6">
            <SaveLocationButton key={place.zip} zip={place.zip} />
          </div>
        )}

        {loading && <p className="text-slate-500">Loading your options...</p>}

        {error && (
          <p role="alert" className="text-red-500 bg-red-50 p-4 rounded-md">
            {error}
          </p>
        )}

        {!loading && !error && utilities.length === 0 && (
          <p className="text-slate-500">No utilities found for this area.</p>
        )}

        <div className="grid gap-4">
          {utilities.map((utility) => (
            <div
              key={utility.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
            >
              <h2 className="text-xl font-medium text-slate-800">
                {utility.provider.name}
              </h2>
              <p className="text-slate-500 mt-1">
                Type:{" "}
                <span className="capitalize">
                  {utility.category.toLowerCase()}
                </span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
