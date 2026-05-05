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
    return `process.env.REACT_APP_API_URL${item.image}`;
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: "DairyNest",

        handler: async function (response) {
          try {
            console.log("PAYMENT SUCCESS:", response);

            const verifyRes = await fetch(
              `${process.env.REACT_APP_API_URL}/api/verify-payment`,
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

            const saveRes = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                shopName: "DairyNest",
                shopOwner: user?.name || "guest",
                address: address,
                products: cart.map((item) => ({
                  productName: item.name || item.productName,
                  quantity: item.quantity,
                  price: item.price,
                  image: item.image,
                })),
              }),
            });

            const saved = await saveRes.json();

            if (!saved.success) {
              alert("Order not saved successfully");
              return;
            }

            localStorage.removeItem("cart");

            alert("Payment Successfully Completed! 🎉");
            navigate("/orders");

          } catch (err) {
            console.log("ERROR:", err);
            alert("Something went wrong");
          }
        },

        prefill: {
          name: user?.name || "User",
          email: user?.email || "test@gmail.com",
          contact: user?.phone || "9999999999",
        },

        theme: {
          color: "#22c55e",
        },
      };
      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        console.log("FAILED:", response);
        alert("Payment failed");
      });

      razor.open();

    } catch (err) {
      console.log(err);
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="left">
          <div className="card glass">
            <h3>Delivery Address</h3>
            {address ? (
              <>
                <p style={{ color: "#22c55e" }}><b>{address.name}</b></p>
                <p style={{ color: "#3b82f6" }}>{address.address}</p>
                <p style={{ color: "#f59e0b" }}>{address.city} - {address.pincode}</p>
                <p style={{ color: "#ef4444" }}>{address.phone}</p>
              </>
            ) : <p>No Address</p>}
          </div>

          <div className="card glass">
            <h3>Order Items</h3>

            {cart.map((item, i) => (
              <div key={i} className="item">
                <img src={getImage(item)} alt="" />
                <div className="info">
                  <h4>{item.name || item.productName}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <p className="price">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="right">
          <div className="summary glass">
            <h3>Price Details</h3>

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
        .page { background: #020617; min-height: 100vh; padding: 30px; color: #fff; }
        .container { display: flex; gap: 25px; max-width: 1200px; margin: auto; }
        .left { flex: 2; }
        .right { flex: 1; }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 16px; padding: 20px; }
        .item { display: flex; justify-content: space-between; margin: 10px 0; }
        button { width: 100%; padding: 14px; background: #22c55e; color: #fff; border: none; }
        .info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info h4 {
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6; /* blue */
}

.info p {
  font-size: 14px;
  color: #6b7280; /* light gray */
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #22c55e; /* green */
}
      `}</style>
    </div>
  );
};

export default PaymentPage;