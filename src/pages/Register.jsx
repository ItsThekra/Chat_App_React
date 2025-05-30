import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";


export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.username.trim() && form.email.trim() && form.password.trim()) {
      try {
        await axios.post("https://683a1f0b43bb370a8671e6c9.mockapi.io/users", form);
        localStorage.setItem("user", form.username);
        navigate("/chat");
      } catch (err) {
        alert("Registration failed");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-300 to-blue-400">
      <div className="bg-white rounded-xl shadow-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <input
          name="username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          name="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Email"
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
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/" className="text-purple-600 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
