import { useEffect, useState } from "react";

export default function MovieForm({ onSubmit, initialData, onClose }) {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    price: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setMovie(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!movie.title || !movie.genre || !movie.price) {
      setError("All fields are required");
      return;
    }

    if (movie.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    onSubmit(movie);
    onClose();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">
        {initialData ? "Edit Movie" : "Add Movie"}
      </h3>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Movie Title"
        value={movie.title}
        onChange={(e) =>
          setMovie({ ...movie, title: e.target.value })
        }
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Genre"
        value={movie.genre}
        onChange={(e) =>
          setMovie({ ...movie, genre: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full p-2 border rounded mb-3"
        placeholder="Ticket Price"
        value={movie.price}
        onChange={(e) =>
          setMovie({ ...movie, price: e.target.value })
        }
      />

      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {initialData ? "Update" : "Add"}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
