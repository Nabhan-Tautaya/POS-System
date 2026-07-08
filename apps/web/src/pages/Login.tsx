import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

/**
 * Login is intentionally NOT wrapped in <Layout />. There's no
 * cashier, branch, or nav to show yet — see App.tsx routing.
 *
 * On submit this calls AuthContext's login(), which flips
 * isAuthenticated to true, then navigates to /dashboard. Every
 * other route is gated behind RequireAuth, so this is the one
 * real entry point into the app.
 */
export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If someone is already logged in and lands on /login, skip straight
  // to the dashboard instead of showing the form again.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Enter both a username and a password.");
      return;
    }

    setError("");
    login(username.trim());
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">Access your POS terminal</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or email"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            Sign in
          </button>
        </form>

        <p className="login-hint">
          Demo build — any non-empty username/password signs you in.
        </p>
      </div>
    </div>
  );
}
