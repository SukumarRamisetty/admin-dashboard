import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= CONTEXT ================= */
const ThemeContext = createContext();
const localizer = momentLocalizer(moment);

/* ================= DATA ================= */
const chartData = [
  { name: "Mon", tickets: 120 },
  { name: "Tue", tickets: 200 },
  { name: "Wed", tickets: 150 },
  { name: "Thu", tickets: 300 },
  { name: "Fri", tickets: 280 },
];

const events = [
  { title: "Movie Booking", start: new Date(2026, 0, 18), end: new Date(2026, 0, 18) },
  { title: "Premiere Show", start: new Date(2026, 0, 20), end: new Date(2026, 0, 20) },
];

/* ================= APP ================= */
export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
      }}
    >
      <Router>
        <Layout />
      </Router>
    </ThemeContext.Provider>
  );
}

/* ================= LAYOUT ================= */
function Layout() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
          <Link to="/movies" className="block hover:bg-gray-700 p-2 rounded">Movies</Link>
          <Link to="/calendar" className="block hover:bg-gray-700 p-2 rounded">Calendar</Link>
          <Link to="/kanban" className="block hover:bg-gray-700 p-2 rounded">Kanban</Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 flex justify-between items-center shadow">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Toggle Theme
          </button>
        </header>

        <main className="p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */
function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Users" value="1245" />
        <Card title="Tickets" value="8430" />
        <Card title="Revenue" value="₹12.5L" />
      </div>

      <div className="bg-white p-6 rounded shadow border">
        <h3 className="font-bold mb-4">Weekly Ticket Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tickets" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ================= USERS TABLE ================= */
function UsersTable() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ravi", email: "ravi@gmail.com" },
    { id: 2, name: "Sita", email: "sita@gmail.com" },
    { id: 3, name: "Amit", email: "amit@gmail.com" },
    { id: 4, name: "John", email: "john@gmail.com" },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow border">
      <h3 className="font-bold mb-4">Users Table</h3>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= MOVIES (ADD + EDIT + GENRE) ================= */
function Movies() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Avatar", genre: "Sci-Fi", price: 250 },
    { id: 2, title: "Inception", genre: "Thriller", price: 200 },
  ]);

  const addMovie = () => {
    const title = prompt("Movie name");
    const genre = prompt("Genre");
    const price = prompt("Price");

    if (title && genre && price > 0) {
      setMovies([...movies, { id: Date.now(), title, genre, price }]);
    }
  };

  const editMovie = (movie) => {
    const newTitle = prompt("Edit movie name", movie.title);
    const newGenre = prompt("Edit genre", movie.genre);
    const newPrice = prompt("Edit price", movie.price);

    if (newTitle && newGenre && newPrice > 0) {
      setMovies(
        movies.map((m) =>
          m.id === movie.id
            ? { ...m, title: newTitle, genre: newGenre, price: newPrice }
            : m
        )
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow border">
      <h3 className="font-bold mb-4">Movies</h3>

      <button
        onClick={addMovie}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Movie
      </button>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Movie</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.title}</td>
              <td className="border p-2">{m.genre}</td>
              <td className="border p-2">{m.price}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => editMovie(m)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= CALENDAR ================= */
function CalendarPage() {
  return (
    <div className="bg-white p-6 rounded shadow border">
      <Calendar localizer={localizer} events={events} style={{ height: 500 }} />
    </div>
  );
}

/* ================= KANBAN ================= */
function Kanban() {
  const [board, setBoard] = useState({
    todo: ["Add new movie", "Schedule show"],
    progress: ["Confirm booking"],
    done: ["Payment received"],
  });

  const moveTask = (from, index) => {
    if (from === "todo") {
      const task = board.todo[index];
      setBoard({
        ...board,
        todo: board.todo.filter((_, i) => i !== index),
        progress: [...board.progress, task],
      });
    } else if (from === "progress") {
      const task = board.progress[index];
      setBoard({
        ...board,
        progress: board.progress.filter((_, i) => i !== index),
        done: [...board.done, task],
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["todo", "progress", "done"].map((col) => (
        <div key={col} className="bg-white p-4 rounded shadow border">
          <h3 className="font-bold mb-4 uppercase">{col}</h3>
          {board[col].map((task, index) => (
            <div
              key={index}
              onClick={() => moveTask(col, index)}
              className="bg-blue-100 p-3 mb-3 rounded cursor-pointer"
            >
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow border">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
