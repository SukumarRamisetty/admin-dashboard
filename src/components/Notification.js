export default function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`p-3 mb-4 rounded text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
