import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "active-link" : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">

      <span className="navbar-brand logo" onClick={() => navigate("/")}>
        DairyNest
      </span>

      <button
        className="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

        <ul className="navbar-nav me-auto">

          {user?.role === "admin" && (
            <>
              <li className="nav-item">
                <button
                  className={`nav-link nav-anim ${isActive("/admin")}`}
                  onClick={() => navigate("/admin")}
                >
                  <b>Admin Dashboard</b>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link nav-anim ${isActive("/admin/orders")}`}
                  onClick={() => navigate("/admin/orders")}
                >
                  <b>Orders Dashboard</b>
                </button>
              </li>
            </>
          )}

          {user?.role === "staff" && (
            <li className="nav-item">
              <button
                className={`nav-link nav-anim ${isActive("/staff")}`}
                onClick={() => navigate("/staff")}
              >
                <b>Staff Panel</b>
              </button>
            </li>
          )}

          {user?.role === "shop" && (
            <>
              <li className="nav-item">
                <button
                  className={`nav-link nav-anim ${isActive("/shop")}`}
                  onClick={() => navigate("/shop")}
                >
                  <b>Shop</b>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link nav-anim ${isActive("/cart")}`}
                  onClick={() => navigate("/cart")}
                >
                  <b>Cart</b>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link nav-anim ${isActive("/orders")}`}
                  onClick={() => navigate("/orders")}
                >
                  <b>My Orders</b>
                </button>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex align-items-center gap-2 right-area">

          {!user ? (
            <>
              <button
                className="btn btn-outline-light btn-anim"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="btn btn-success btn-anim"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="text-white user-text">
                {user.username || user.name} [ {user.role} ]
              </span>

              <button className="btn btn-danger btn-anim" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }

        .custom-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 6px 25px rgba(0,0,0,0.4);
          animation: slideDown 0.6s ease;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .logo:hover {
          color: #22c55e;
          transform: scale(1.05);
        }

        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }

        .nav-anim {
          position: relative;
          color: #e5e7eb !important;
          transition: 0.3s;
        }

        .nav-anim:hover {
          color: #22c55e !important;
        }

        .nav-anim::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0%;
          height: 2px;
          background: #22c55e;
          transition: 0.3s;
          transform: translateX(-50%);
        }

        .nav-anim:hover::after {
          width: 100%;
        }

        .active-link {
          color: #22c55e !important;
        }

        .active-link::after {
          width: 100%;
        }

        .btn-anim {
          position: relative;
          overflow: hidden;
          transition: 0.3s;
        }

        .btn-anim::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: 0.5s;
        }

        .btn-anim:hover::before {
          left: 100%;
        }

        .btn-anim:hover {
          transform: scale(1.05);
        }

        .user-text {
          font-size: 14px;
          opacity: 0.85;
        }

        .custom-toggler {
          border: none;
        }

        @media (max-width: 768px) {
          .navbar-collapse {
            background: rgba(15,23,42,0.95);
            margin-top: 10px;
            padding: 15px;
            border-radius: 12px;
            animation: fadeIn 0.4s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .right-area {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;