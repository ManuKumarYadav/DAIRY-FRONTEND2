import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data?.data || []);
    } catch (err) {
      console.log(err);
      setOrders([]);
    }
  };
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Pending") return "#ff9800";
    if (status === "Paid") return "#2874f0";
    if (status === "Delivered") return "#2e7d32";
    if (status === "Cancelled") return "#d32f2f";
    return "#999";
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}><b>Orders Dashboard</b></h2>
      <hr />

      {orders.length === 0 && (
        <div style={styles.empty}>
          <h3>No Orders Yet</h3>
        </div>
      )}

      <div style={styles.grid}>
        {orders.map((o) => (
          <div key={o._id} style={styles.card}>

            <div style={styles.cardTop}>
              <h3 style={styles.title}>{o.productName}</h3>

              <span
                style={{
                  ...styles.status,
                  background: getStatusColor(o.status),
                }}
              >
                {o.status}
              </span>
            </div>

            <p><b>Shop:</b> {o.shopName}</p>
            <p><b>Quantity:</b> {o.quantity}</p>

            {o.address && (
              <div style={styles.addressBox}>
                <h4 style={{ marginBottom: "6px" }}>Delivery Details</h4>

                <p><b>{o.address.name}</b></p>
                <p>{o.address.street}</p>
                <p>
                  {o.address.city} - {o.address.pincode}
                </p>
                <p>{o.address.phone}</p>
              </div>
            )}

            <div style={styles.actions}>
              {o.status === "Pending" && (
                <button
                  style={styles.greenBtn}
                  onClick={() => updateStatus(o._id, "Paid")}
                >
                  Mark Paid
                </button>
              )}

              {o.status === "Paid" && (
                <button
                  style={styles.blueBtn}
                  onClick={() => updateStatus(o._id, "Delivered")}
                >
                  Deliver
                </button>
              )}

              {o.status !== "Cancelled" && o.status !== "Delivered" && (
                <button
                  style={styles.cancelBtn}
                  onClick={() => updateStatus(o._id, "Cancelled")}
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;

const styles = {
  page: {
    background: "#f1f3f6",
    minHeight: "100vh",
    padding: "20px",
  },

  heading: {
    marginBottom: "15px",
  },

  empty: {
    textAlign: "center",
    marginTop: "50px",
    color: "#777",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },

  title: {
    margin: 0,
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  status: {
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  addressBox: {
    marginTop: "10px",
    padding: "10px",
    background: "#f8f9fa",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  actions: {
    marginTop: "12px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  greenBtn: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  blueBtn: {
    background: "#2874f0",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};