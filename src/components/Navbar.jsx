import React from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || null;

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
    window.location.reload();
  };

  const activeMenu = (path) => {

    return location.pathname === path
      ? "active-link"
      : "";
  };

  return (
    <>
      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      .premium-navbar{

        position:fixed;
        top:0;
        left:0;

        width:100%;

        z-index:999;

        display:flex;
        align-items:center;
        justify-content:space-between;

        padding:10px 4%;

        background:
        rgba(2,6,23,0.78);

        backdrop-filter:blur(16px);

        border-bottom:
        1px solid rgba(255,255,255,0.06);

        box-shadow:
        0 6px 25px rgba(0,0,0,0.25);
      }

      /* LOGO */

      .premium-logo{

        display:flex;
        align-items:center;

        gap:12px;

        cursor:pointer;
      }

      .premium-logo-icon{

        width:52px;
        height:52px;

        border-radius:16px;

        display:flex;
        align-items:center;
        justify-content:center;

        font-size:24px;

        background:
        linear-gradient(
          135deg,
          #2563eb,
          #22c55e
        );

        box-shadow:
        0 10px 25px rgba(37,99,235,0.35);
      }

      .premium-logo-text h1{

        color:white;

        font-size:28px;
        font-weight:800;

        line-height:1;
      }

      .premium-logo-text p{

        color:#94a3b8;

        font-size:12px;

        margin-top:4px;
      }

      /* CENTER LINKS */

      .premium-links{

        display:flex;
        align-items:center;

        gap:12px;
      }

      .premium-link{

        border:none;
        outline:none;

        cursor:pointer;

        padding:11px 18px;

        border-radius:14px;

        background:transparent;

        color:#e2e8f0;

        font-size:15px;
        font-weight:600;

        transition:0.3s;
      }

      .premium-link:hover{

        background:
        rgba(255,255,255,0.08);

        color:white;

        transform:
        translateY(-2px);
      }

      .active-link{

        background:
        linear-gradient(
          135deg,
          #2563eb,
          #22c55e
        );

        color:white;

        box-shadow:
        0 8px 22px rgba(37,99,235,0.3);
      }

      /* RIGHT */

      .premium-right{

        display:flex;
        align-items:center;

        gap:15px;
      }

      .premium-user{

        display:flex;
        align-items:center;

        gap:10px;
      }

      .premium-avatar{

        width:44px;
        height:44px;

        border-radius:50%;

        display:flex;
        align-items:center;
        justify-content:center;

        color:white;

        font-size:18px;
        font-weight:700;

        background:
        linear-gradient(
          135deg,
          #22c55e,
          #2563eb
        );
      }

      .premium-user h4{

        color:white;

        font-size:15px;

        margin:0;
      }

      .premium-user span{

        color:#94a3b8;

        font-size:12px;
      }

      .logout-btn{

        border:none;

        cursor:pointer;

        padding:12px 22px;

        border-radius:14px;

        background:
        linear-gradient(
          135deg,
          #ef4444,
          #dc2626
        );

        color:white;

        font-size:15px;
        font-weight:700;

        transition:0.3s;
      }

      .logout-btn:hover{

        transform:
        translateY(-2px);

        box-shadow:
        0 10px 20px rgba(239,68,68,0.3);
      }

      .guest-btn{

        border:none;

        cursor:pointer;

        padding:12px 24px;

        border-radius:14px;

        background:
        linear-gradient(
          135deg,
          #2563eb,
          #22c55e
        );

        color:white;

        font-size:15px;
        font-weight:700;

        transition:0.3s;
      }

      .guest-btn:hover{

        transform:
        translateY(-2px);

        box-shadow:
        0 10px 25px rgba(37,99,235,0.3);
      }

      /* MOBILE */

      @media(max-width:1100px){

        .premium-links{
          display:none;
        }
      }

      @media(max-width:700px){

        .premium-navbar{

          padding:12px 4%;
        }

        .premium-logo-icon{

          width:45px;
          height:45px;

          font-size:20px;
        }

        .premium-logo-text h1{

          font-size:22px;
        }

        .premium-logo-text p{

          display:none;
        }

        .premium-user h4,
        .premium-user span{

          display:none;
        }

        .logout-btn{

          padding:10px 14px;
          font-size:13px;
        }

        .guest-btn{

          padding:10px 16px;
          font-size:13px;
        }
      }

      `}</style>

      <nav className="premium-navbar">

        {/* LEFT */}

        <div
          className="premium-logo"
          onClick={() => navigate("/")}
        >

          <div className="premium-logo-icon">
            🥛
          </div>

          <div className="premium-logo-text">

            <h1>DairyNest</h1>

            <p>Premium Dairy Platform</p>

          </div>

        </div>

        {/* CENTER */}

        {user && (

          <div className="premium-links">

            {user.role === "shop" && (
              <>
                <button
                  className={`premium-link ${activeMenu("/shop")}`}
                  onClick={() => navigate("/shop")}
                >
                  Shop
                </button>

                <button
                  className={`premium-link ${activeMenu("/cart")}`}
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </button>

                <button
                  className={`premium-link ${activeMenu("/orders")}`}
                  onClick={() => navigate("/orders")}
                >
                  My Orders
                </button>
              </>
            )}

            {user.role === "admin" && (
              <>
                <button
                  className={`premium-link ${activeMenu("/admin")}`}
                  onClick={() => navigate("/admin")}
                >
                  Dashboard
                </button>

                <button
                  className={`premium-link ${activeMenu("/admin/orders")}`}
                  onClick={() => navigate("/admin/orders")}
                >
                  Orders
                </button>
              </>
            )}

            {user.role === "staff" && (

              <button
                className={`premium-link ${activeMenu("/staff")}`}
                onClick={() => navigate("/staff")}
              >
                Staff Panel
              </button>
            )}

          </div>
        )}

        {/* RIGHT */}

        <div className="premium-right">

          {user ? (

            <>
              <div className="premium-user">

                <div className="premium-avatar">
                  {user?.name?.charAt(0)}
                </div>

                <div>

                  <h4>
                    {user?.name}
                  </h4>

                  <span>
                    {user?.role}
                  </span>

                </div>

              </div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>

          ) : (

            <button
              className="guest-btn"
              onClick={() => navigate("/")}
            >
              Get Started
            </button>

          )}

        </div>

      </nav>
    </>
  );
};

export default Navbar;