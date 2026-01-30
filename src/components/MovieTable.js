import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";

export default function MovieTable({ onEdit }) {
  const { movies } = useContext(MovieContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 2;

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Search movie..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.genre}</td>
              <td>₹{m.price}</td>
              <td>
                <button
                  className="text-blue-600"
                  onClick={() => onEdit(m)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          disabled={page * pageSize >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
