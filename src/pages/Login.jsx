import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      const data = res.data;

      const userData = {
        ...data.user,
        username:
          data.user.username ||
          data.user.name ||
          data.user.email?.split("@")[0] ||
          "guest",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "admin") navigate("/admin");
      else if (userData.role === "staff") navigate("/staff");
      else navigate("/shop");

    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue to DairyNest</p>

        {message && <div className="error-msg">{message}</div>}

        <form onSubmit={handleLogin} className="login-form">

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;