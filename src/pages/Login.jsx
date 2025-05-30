
// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("user", username);
      navigate("/chat");
    } else {
      alert("Please enter a name to continue");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-blue-100">
      <h1 className="text-xl font-bold">Login</h1>
      <input
        className="border p-2 rounded"
        placeholder="Enter your name"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
