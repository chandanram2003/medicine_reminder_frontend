import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        {
          email,
          password,
        },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>

          <Link
            to="/register"
            className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
