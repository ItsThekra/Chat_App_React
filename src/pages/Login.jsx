import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (form.username.trim() && form.password.trim()) {
      try {
        const res = await axios.get("https://683a1f0b43bb370a8671e6c9.mockapi.io/users");
        const matched = res.data.find(
          (user) => user.username === form.username && user.password === form.password
        );
        if (matched) {
          localStorage.setItem("user", matched.username);
          navigate("/chat");
        } else {
          alert("Invalid username or password");
        }
      } catch (err) {
        alert("Login failed");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-300 to-purple-400">
      <div className="bg-white rounded-xl shadow-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          name="username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
