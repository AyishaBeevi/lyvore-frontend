import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await login(email, password);

    // Save token after successful login
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    navigate(state?.from || "/");
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="container-max py-12">
      <h1 className="text-2xl font-semibold text-brand-brown">Login</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-md">
        <input
          className="border p-3 rounded-xl2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-3 rounded-xl2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">Login</button>
      </form>
      <p className="mt-4 text-sm">
  Don't have an account? <a href="/register" className="text-blue-500 underline">Register here</a>
</p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}