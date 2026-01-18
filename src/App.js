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

function App() {
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
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="p-4 space-y-3">
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
          <Link to="/calendar" className="block hover:bg-gray-700 p-2 rounded">Calendar</Link>
          <Link to="/kanban" className="block hover:bg-gray-700 p-2 rounded">Kanban</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className={`px-6 py-4 flex justify-between items-center ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Toggle Theme
          </button>
        </header>

        <main className="p-6 flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersTable />} />
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
  const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Users" value="1245" />
        <Card title="Tickets" value="8430" />
        <Card title="Revenue" value="₹12.5L" />
      </div>

      <div className={`p-6 rounded shadow ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}>
        <h2 className="text-xl font-bold mb-4">Weekly Ticket Sales</h2>
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

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 2;

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const addUser = () => {
    const name = prompt("Enter name");
    const email = prompt("Enter email");
    if (name && email) {
      setUsers([...users, { id: Date.now(), name, email }]);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Users Table</h2>

      <div className="flex justify-between mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={addUser} className="bg-green-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="border px-3 py-1 rounded">
          Prev
        </button>
        <button disabled={page * pageSize >= filtered.length} onClick={() => setPage(page + 1)} className="border px-3 py-1 rounded">
          Next
        </button>
      </div>
    </div>
  );
}

/* ================= CALENDAR ================= */

function CalendarPage() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Movie Booking Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

/* ================= KANBAN (CLICK BASED) ================= */

function Kanban() {
  const [board, setBoard] = useState({
    todo: ["Add new movie", "Schedule show"],
    progress: ["Confirm booking"],
    done: ["Payment received"],
  });

  const moveTask = (col, index) => {
    if (col === "todo") {
      const task = board.todo[index];
      setBoard({
        ...board,
        todo: board.todo.filter((_, i) => i !== index),
        progress: [...board.progress, task],
      });
    } else if (col === "progress") {
      const task = board.progress[index];
      setBoard({
        ...board,
        progress: board.progress.filter((_, i) => i !== index),
        done: [...board.done, task],
      });
    } else {
      alert("Task already completed ✅");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.keys(board).map((col) => (
        <div key={col} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-3 uppercase">{col}</h3>
          {board[col].map((task, index) => (
            <div
              key={index}
              onClick={() => moveTask(col, index)}
              className="p-3 mb-2 bg-blue-100 rounded cursor-pointer hover:bg-blue-200"
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
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`p-6 rounded shadow ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}>
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default App;
