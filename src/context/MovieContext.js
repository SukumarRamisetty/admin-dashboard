import { createContext, useState } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([
    { id: 1, title: "Avatar", genre: "Sci-Fi", price: 250 },
    { id: 2, title: "Inception", genre: "Thriller", price: 200 },
    { id: 3, title: "Interstellar", genre: "Sci-Fi", price: 300 },
  ]);

  const addMovie = (movie) => {
    setMovies([...movies, { ...movie, id: Date.now() }]);
  };

  const updateMovie = (movie) => {
    setMovies(
      movies.map((m) => (m.id === movie.id ? movie : m))
    );
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, updateMovie }}>
      {children}
    </MovieContext.Provider>
  );
}
