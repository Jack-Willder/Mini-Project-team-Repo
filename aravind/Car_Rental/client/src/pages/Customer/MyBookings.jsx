import React, { useEffect, useState } from "react";

// ViewBookings.jsx
// Default export React component.
// Tailwind CSS utility classes are used for styling so no separate CSS file is required.
// Integration notes (below) show how to fetch bookings from your backend (example: GET /api/bookings).

export default function ViewBookings({ apiEndpoint = "/api/bookings", token = null }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);

  useEffect(() => {
    let cancelled = false;
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        // Example: send token in Authorization header if provided
        const res = await fetch(`${apiEndpoint}?page=${page}&limit=${perPage}` , {
          headers: token
            ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            : { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          // Expecting data to be an array or an object { items, total }
          if (Array.isArray(data)) {
            setBookings(data);
          } else if (data.items) {
            setBookings(data.items);
          } else {
            setBookings([]);
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load bookings");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchBookings();
    return () => (cancelled = true);
  }, [apiEndpoint, token, page, perPage]);

  const filtered = bookings.filter((b) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.location && b.location.toLowerCase().includes(q)) ||
      (b.status && b.status.toLowerCase().includes(q)) ||
      (b.customerName && b.customerName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Bookings</h1>
          <p className="text-sm text-gray-500">View and manage your recent bookings</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, location, name or status"
            className="w-full sm:w-72 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
          />
          <button
            onClick={() => {
              setPage(1);
            }}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Reset
          </button>
        </div>
      </header>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-pulse text-gray-600">Loading bookings...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">No bookings found.</div>
      )}

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((b) => (
          <article key={b._id || b.id} className="bg-white shadow-sm rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {/* If you store images, replace with <img src={b.image} /> */}
                <span className="text-gray-400 text-sm">Image</span>
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{b.title || "Untitled Booking"}</h2>
                <p className="text-sm text-gray-500">{b.location || "Unknown location"}</p>

                <div className="mt-2 text-sm text-gray-700">
                  <div><strong>Customer:</strong> {b.customerName || "-"}</div>
                  <div><strong>Date:</strong> {b.date || b.bookingDate || "-"}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      (b.status || "").toLowerCase() === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : (b.status || "").toLowerCase() === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {(b.status || "Pending").toString()}
                    </span>

                    <button
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(b))}
                      className="ml-auto text-xs px-2 py-1 border rounded-md hover:bg-gray-50"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50">View</button>
              <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Cancel</button>
            </footer>
          </article>
        ))}
      </main>

      {/* Simple pagination controls */}
      <nav className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {Math.min((page - 1) * perPage + 1, 1)} - {Math.min(page * perPage, (bookings && bookings.length) || 0)}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 border rounded-md"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}

/*
Integration notes (copy into your app):

1) Tailwind setup
- This component uses Tailwind utility classes. If your project doesn't have Tailwind installed,
  either add Tailwind or replace the classes with your own CSS.

2) Example backend response shapes supported by the component:
- Array of bookings: [{ id, title, location, date, customerName, status }]
- Paginated: { items: [...], total }

3) Example fetch on the server (Node/Express):

  // GET /api/bookings?page=1&limit=6
  app.get('/api/bookings', authenticate, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const items = await Bookings.find({ userId: req.user.id }).skip(skip).limit(limit).lean();
    res.json({ items, total: await Bookings.countDocuments({ userId: req.user.id }) });
  });

4) How to use in a page:

  import ViewBookings from './ViewBookings';

  function MyPage(){
    const token = localStorage.getItem('token');
    return <ViewBookings apiEndpoint="/api/bookings" token={token} />
  }

*/
