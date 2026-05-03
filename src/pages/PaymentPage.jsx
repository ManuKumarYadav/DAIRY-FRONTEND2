import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setAddress(JSON.parse(localStorage.getItem("address")));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const getImage = (item) => {
    if (!item.image) return "https://via.placeholder.com/100";
    if (item.image.startsWith("http")) return item.image;
    return `${process.env.REACT_APP_API_URL}${item.image}`;
  };

  const handlePayment = async () => {
    if (!window.Razorpay) return alert("Razorpay not loaded");
    if (!user?.name) return alert("Login required");

    if (!address) {
      alert("Complete address required");
      navigate("/address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();
      if (!order?.id) return alert("Order failed");

      const rzp = new window.Razorpay({
        key: "rzp_test_SXOEjU2qDvP9mf",
        amount: order.amount,
        currency: "INR",
        name: "DairyNest",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${process.env.REACT_APP_API_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
              alert("Payment verification failed");
              return;
            }

            const saveRes = await fetch(
              `${process.env.REACT_APP_API_URL}/api/orders`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  shopName: "DairyNest",
                  shopOwner: user?.name || "guest",
                  address,
                  products: cart.map((item) => ({
                    productName:
                      item.name || item.productName || "Item",
                    quantity: Number(item.quantity) || 1,
                    price: Number(item.price) || 0,
                    image: item.image || "",
                  })),
                }),
              }
            );

            const saved = await saveRes.json();

            if (!saved.success) {
              alert("Order save failed");
              return;
            }

            localStorage.removeItem("cart");

            alert("Payment Successfully Completed!");
            navigate("/orders");

          } catch (err) {
            console.log("Save error:", err);
            alert("Order save failed");
          }
        },

        theme: { color: "#22c55e" },
      });

      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="left">

          <div className="card glass">
            <h3><b>Delivery Address</b></h3>
            {address ? (
              <>
                <p style={{ color: "#22c55e" }}>Name: <b>{address.name}</b></p>
                <p style={{ color: "#22c55e" }}>{address.address}</p>
                <p style={{ color: "#22c55e" }}>{address.city} - {address.pincode}</p>
                <p style={{ color: "#22c55e" }}>Phone No: {address.phone}</p>
              </>
            ) : <p>No Address</p>}
          </div>

          <div className="card glass">
            <h3><b>Order Items</b></h3>

            {cart.map((item, i) => (
              <div key={i} className="item">
                <img src={getImage(item)} alt="" />

                <div className="info">
                  <h4 style={{ color: "#22c55e" }}>{item.name || item.productName}</h4>
                  <p style={{ color: "#22c55e" }}>Qty: {item.quantity}</p>
                </div>

                <p className="price">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

        </div>

        <div className="right">
          <div className="summary glass">
            <h3><b>Price Details</b></h3>

            <div className="row">
              <span>Items Total</span>
              <span>₹{total}</span>
            </div>

            <div className="row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>

            <hr />

            <div className="total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Proceed to Pay →"}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .page {
          background: linear-gradient(135deg, #020617, #0f172a);
          min-height: 100vh;
          padding: 30px;
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

        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .card {
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 20px;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .item img {
          width: 70px;
          height: 70px;
          border-radius: 10px;
        }

        .info {
          flex: 1;
          margin-left: 15px;
        }

        .price {
          font-weight: bold;
          color: #22c55e;
        }

        .summary {
          padding: 25px;
          border-radius: 16px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
        }

        .free {
          color: #22c55e;
          font-weight: bold;
        }

        .total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          margin: 15px 0;
          font-weight: bold;
        }

        button {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;