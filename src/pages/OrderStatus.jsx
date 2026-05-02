import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let orders = location.state?.orders;

  if (!orders) {
    const saved = JSON.parse(localStorage.getItem("latestOrders"));
    orders = saved || [];
  }

  if (!orders || orders.length === 0) {
    return (
      <div style={styles.page}>
        <h2>No Order Found </h2>
        <button onClick={() => navigate("/shop")}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2>Payment Successful</h2>

      {orders.map((order, index) => (
        <div key={index} style={styles.card}>
          <h3>{order?.productName || "Product"}</h3>
          <p>Shop: {order?.shopName}</p>
          <p>Quantity: {order?.quantity}</p>

          <p>
             Status:
            <span style={styles.status}>
              {order?.status}
            </span>
          </p>
        </div>
      ))}

      <button style={styles.btn} onClick={() => navigate("/orders")}>
        View All Orders
      </button>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    textAlign: "center",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px auto",
    width: "300px",
    borderRadius: "10px",
    background: "#fff",
  },
  status: {
    marginLeft: "10px",
    background: "green",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  btn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default OrderStatus;