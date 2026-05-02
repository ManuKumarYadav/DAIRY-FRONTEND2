import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (i) => {
    const updated = [...cart];
    updated[i].quantity++;
    updateCart(updated);
  };

  const decreaseQty = (i) => {
    const updated = [...cart];
    if (updated[i].quantity > 1) updated[i].quantity--;
    updateCart(updated);
  };

  const removeItem = (i) => {
    const updated = cart.filter((_, index) => index !== i);
    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getImage = (item) => {
    if (!item.image) return "https://via.placeholder.com/100";
    if (item.image.startsWith("http")) return item.image;
    return `http://localhost:5000${item.image}`;
  };

  return (
    <div className="page">
      <div className="container">

        <div className="left">
          <h2 className="title"><b>Shopping Cart [{cart.length}]</b></h2>

          {cart.map((item, i) => (
            <div key={i} className="card glass">

              <img src={getImage(item)} alt="" />

              <div className="details">
                <h4 style={{ color: "#22c55e" }}>{item.name}</h4>
                <p className="price">₹{item.price}</p>

                <div className="qty">
                  <button
                    className="qtyBtn"
                    onClick={() => decreaseQty(i)}
                  >
                    −
                  </button>

                  <span className="qtyNum">{item.quantity}</span>

                  <button
                    className="qtyBtn"
                    onClick={() => increaseQty(i)}
                  >
                    +
                  </button>
                </div>

                <p className="remove" onClick={() => removeItem(i)}>
                  Remove
                </p>
              </div>

              <div className="total">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="right">
          <div className="summary glass">
            <h3><b>Cart Summary</b></h3>

            <div className="row">
              <span>Items ({cart.length})</span>
              <span>₹{total}</span>
            </div>

            <div className="row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>

            <hr />

            <div className="final">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="checkoutBtn" onClick={() => navigate("/address")}>
              Proceed to Checkout →
            </button>
          </div>
        </div>

      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .page {
          background: linear-gradient(135deg, #020617, #0f172a);
          min-height: 100vh;
          padding: 25px;
          color: #fff;
        }

        .container {
          display: flex;
          gap: 25px;
          max-width: 1200px;
          margin: auto;
        }

        .left { flex: 2; }
        .right { flex: 1; }

        .title {
          margin-bottom: 20px;
        }

        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 14px;
          margin-bottom: 15px;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.6);
        }

        .card img {
          width: 90px;
          height: 90px;
          border-radius: 10px;
          object-fit: cover;
        }

        .details {
          flex: 1;
        }

        .price {
          color: #cbd5f5;
        }

        .qty {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
        }

        .qtyBtn {
          width: 35px;
          height: 35px;
          border-radius: 10px;
          border: none;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;

          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: #fff;

          transition: 0.3s;
        }

        .qtyBtn:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transform: scale(1.1);
        }

        .qtyNum {
          font-size: 16px;
          font-weight: bold;
          color: #22c55e;
        }

        .remove {
          margin-top: 8px;
          color: #ef4444;
          cursor: pointer;
          font-weight: 500;
        }

        .remove:hover {
          text-decoration: underline;
        }

        .total {
          font-weight: bold;
          color: #22c55e;
        }

        .summary {
          padding: 20px;
          border-radius: 14px;
          position: sticky;
          top: 20px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }

        .free {
          color: #22c55e;
          font-weight: bold;
        }

        .final {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }

        .checkoutBtn {
          width: 100%;
          padding: 14px;
          margin-top: 20px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .checkoutBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(34,197,94,0.4);
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .summary {
            position: static;
          }

          .card {
            flex-direction: column;
            align-items: flex-start;
          }

          .total {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;