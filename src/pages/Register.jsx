import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    const { username, email, password } = form;

    if (!username.trim() || !email.trim() || !password.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'All fields are required.' });
      return;
    }

    if (username.length < 4) {
      Swal.fire({ icon: 'warning', title: 'Username too short', text: 'Username must be at least 4 characters.' });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({ icon: 'warning', title: 'Invalid Email', text: 'Please enter a valid email address.' });
      return;
    }

    if (password.length < 8) {
      Swal.fire({ icon: 'warning', title: 'Weak Password', text: 'Password must be at least 8 characters.' });
      return;
    }

    try {
      await axios.post("https://683a1f0b43bb370a8671e6c9.mockapi.io/users", form);
      Swal.fire({
        icon: 'success',
        title: 'Account created',
        text: 'You can now login',
      }).then(() => navigate("/"));
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Registration failed', text: 'Please try again later' });
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
