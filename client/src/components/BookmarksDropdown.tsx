import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useBookmarks } from "../BookmarksContext";

export default function BookmarksDropdown() {
  const { bookmarks, loading, error, remove, refresh } = useBookmarks();
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  async function handleRemove(id: number) {
    setRemoving(id);
    setActionError(null);

    try {
      await remove(id);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Unable to remove bookmark.",
      );
    } finally {
      setRemoving(null);
    }
  }

  return (
    <div ref={container} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="bookmarks-panel"
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-800"
      >
        Bookmarks ▾
      </button>

      {open && (
        <div
          id="bookmarks-panel"
          className="absolute right-0 top-full z-50 mt-3 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white p-3 text-slate-900 shadow-xl"
        >
          <h2 className="px-2 py-2 font-semibold">Saved locations</h2>

          {loading && <p className="p-2 text-sm">Loading bookmarks...</p>}

          {error && (
            <div className="p-2 text-sm">
              <p role="alert" className="text-red-600">
                {error}
              </p>
              <button
                type="button"
                onClick={() => void refresh()}
                className="mt-2 text-teal-700 underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && bookmarks.length === 0 && (
            <p className="p-2 text-sm text-slate-500">
              No saved locations yet. Save one from a results page.
            </p>
          )}

          <ul className="max-h-72 overflow-y-auto">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id} className="flex items-center gap-2">
                <Link
                  to={`/results/${bookmark.zip}`}
                  className="min-w-0 flex-1 rounded-lg p-2 hover:bg-slate-100"
                >
                  <span className="block font-medium">
                    {bookmark.place.city}, {bookmark.place.state}
                  </span>
                  <span className="text-sm text-slate-500">{bookmark.zip}</span>
                </Link>

                <button
                  type="button"
                  disabled={removing !== null}
                  aria-label={`Remove bookmark for ${bookmark.place.city}, ${bookmark.zip}`}
                  onClick={() => void handleRemove(bookmark.id)}
                  className="rounded-lg px-3 py-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  {removing === bookmark.id ? "…" : "×"}
                </button>
              </li>
            ))}
          </ul>

          {actionError && (
            <p role="alert" className="p-2 text-sm text-red-600">
              {actionError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
