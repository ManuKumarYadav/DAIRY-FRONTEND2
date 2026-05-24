import React, { useState } from "react";
import "./home.css";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("shop");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const res = await API.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      const data = res.data;

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "admin") {

        navigate("/admin");
      }

      else if (
        data.user.role === "staff"
      ) {

        navigate("/staff");
      }

      else {

        navigate("/shop");
      }

      window.location.reload();

    } catch (err) {

      setMessage(
        err.response?.data?.msg ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      await API.post(
        "/api/auth/register",
        {
          name,
          username: name,
          email,
          password,
          role,
        }
      );

      setMessage(
        "Registration Successful"
      );

      setIsLogin(true);

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Register Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="premium-home">

      {/* BACKGROUND */}

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      {/* HERO */}

      <section className="premium-hero">

        {/* LEFT */}

        <div className="hero-left">

          <div className="hero-badge">
            🚀 Smart Dairy Management
          </div>

          <h1>
            Fresh Dairy
            <span> Delivered</span>
            <br />
            Every Morning
          </h1>

          <p>
            Order premium farm fresh milk,
            paneer, curd, butter and more
            directly from trusted dairy farms.
          </p>

          <div className="feature-list">

            <div className="feature-card">
              ✅ Daily Fresh Delivery
            </div>

            <div className="feature-card">
              ✅ Secure Online Payments
            </div>

            <div className="feature-card">
              ✅ Trusted Dairy Farmers
            </div>

          </div>

          <div className="hero-stats">

            <div className="stat-box">

              <h2>10K+</h2>

              <span>Customers</span>

            </div>

            <div className="stat-box">

              <h2>24/7</h2>

              <span>Delivery</span>

            </div>

            <div className="stat-box">

              <h2>100%</h2>

              <span>Fresh</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="auth-wrapper">

          <div className="auth-card">

            {/* TABS */}

            <div className="tabs">

              <button
                className={
                  isLogin
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setIsLogin(true)
                }
              >
                Login
              </button>

              <button
                className={
                  !isLogin
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setIsLogin(false)
                }
              >
                Register
              </button>

            </div>

            <h2>
              {
                isLogin
                  ? "Welcome Back"
                  : "Create Account"
              }
            </h2>

            <p className="auth-subtitle">

              {
                isLogin
                  ? "Login to continue your dairy orders"
                  : "Join DairyNest today"
              }

            </p>

            {message && (

              <div className="message-box">
                {message}
              </div>
            )}

            {/* LOGIN */}

            {
              isLogin ? (

                <form
                  onSubmit={handleLogin}
                  className="auth-form"
                >

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                  <button
                    className="auth-btn"
                    disabled={loading}
                  >

                    {
                      loading
                        ? "Please Wait..."
                        : "Login Now"
                    }

                  </button>

                </form>

              ) : (

                <form
                  onSubmit={handleRegister}
                  className="auth-form"
                >

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(
                        e.target.value
                      )
                    }
                  >

                    <option value="shop">
                      Shop
                    </option>

                    <option value="staff">
                      Staff
                    </option>

                  </select>

                  <button
                    className="auth-btn"
                    disabled={loading}
                  >

                    {
                      loading
                        ? "Creating..."
                        : "Create Account"
                    }

                  </button>

                </form>

              )
            }

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;