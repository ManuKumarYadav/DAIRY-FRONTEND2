import React, { useEffect, useState } from "react";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/orders`
      );

      const data = await res.json();

      setOrders(data?.data || []);

    } catch (err) {

      console.log(err);
      setOrders([]);

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ status }),
        }
      );

      fetchOrders();

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {

    switch (status) {

      case "Pending":
        return {
          background:
            "linear-gradient(135deg,#f59e0b,#ea580c)",
        };

      case "Paid":
        return {
          background:
            "linear-gradient(135deg,#2563eb,#06b6d4)",
        };

      case "Delivered":
        return {
          background:
            "linear-gradient(135deg,#22c55e,#16a34a)",
        };

      case "Cancelled":
        return {
          background:
            "linear-gradient(135deg,#ef4444,#dc2626)",
        };

      default:
        return {
          background: "#64748b",
        };
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.overlay}></div>

      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>

          <div>

            <h1 style={styles.heading}>
              Orders Dashboard
            </h1>

            <p style={styles.subHeading}>
              Manage all dairy product orders
            </p>

          </div>

          <div style={styles.totalBox}>

            <h2 style={styles.totalNumber}>
              {orders.length}
            </h2>

            <p style={styles.totalText}>
              Total Orders
            </p>

          </div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div style={styles.loadingBox}>

            <div style={styles.loader}></div>

            <p style={styles.loadingText}>
              Loading Orders...
            </p>

          </div>

        ) : orders.length === 0 ? (

          <div style={styles.emptyCard}>

            <h2>No Orders Found</h2>

            <p>
              Orders will appear here once customers
              place them.
            </p>

          </div>

        ) : (

          <div style={styles.grid}>

            {orders.map((o) => (

              <div key={o._id} style={styles.card}>

                {/* TOP */}

                <div style={styles.cardTop}>

                  <div>

                    <h2 style={styles.productName}>
                      {o.productName || "Product"}
                    </h2>

                    <p style={styles.shopName}>
                      🏪 {o.shopName || "DairyNest"}
                    </p>

                  </div>

                  <div
                    style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(o.status),
                    }}
                  >
                    {o.status}
                  </div>

                </div>

                {/* INFO */}

                <div style={styles.infoGrid}>

                  <div style={styles.infoCard}>

                    <p style={styles.infoLabel}>
                      Quantity
                    </p>

                    <h3 style={styles.infoValue}>
                      {o.quantity || 1}
                    </h3>

                  </div>

                  <div style={styles.infoCard}>

                    <p style={styles.infoLabel}>
                      Order ID
                    </p>

                    <h3 style={styles.infoValue}>
                      #{o._id?.slice(-5)}
                    </h3>

                  </div>

                </div>

                {/* ADDRESS */}

                {o.address && (

                  <div style={styles.addressCard}>

                    <h3 style={styles.addressHeading}>
                      Delivery Address
                    </h3>

                    <div style={styles.addressRow}>
                      👤 {o.address.name}
                    </div>

                    <div style={styles.addressRow}>
                      📍 {o.address.street}
                    </div>

                    <div style={styles.addressRow}>
                      🏙️ {o.address.city} -{" "}
                      {o.address.pincode}
                    </div>

                    <div style={styles.addressRow}>
                      📞 {o.address.phone}
                    </div>

                  </div>
                )}

                {/* BUTTONS */}

                <div style={styles.buttonRow}>

                  {o.status === "Pending" && (

                    <button
                      style={styles.payBtn}
                      onClick={() =>
                        updateStatus(o._id, "Paid")
                      }
                    >
                      Mark Paid
                    </button>
                  )}

                  {o.status === "Paid" && (

                    <button
                      style={styles.deliverBtn}
                      onClick={() =>
                        updateStatus(
                          o._id,
                          "Delivered"
                        )
                      }
                    >
                      Deliver
                    </button>
                  )}

                  {o.status !== "Cancelled" &&
                    o.status !== "Delivered" && (

                      <button
                        style={styles.cancelBtn}
                        onClick={() =>
                          updateStatus(
                            o._id,
                            "Cancelled"
                          )
                        }
                      >
                        Cancel
                      </button>
                    )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminOrders;

const styles = {

  /* ================= PAGE ================= */

  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#020617,#081229,#020617)",

    position: "relative",

    overflowX: "hidden",

    paddingTop: window.innerWidth < 768 ? "110px" : "140px",

    paddingLeft: window.innerWidth < 768 ? "16px" : "25px",

    paddingRight: window.innerWidth < 768 ? "16px" : "25px",

    paddingBottom: "40px",
  },

  overlay: {
    position: "absolute",

    inset: 0,

    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(34,197,94,0.15), transparent 35%)",
  },

  container: {
    position: "relative",

    zIndex: 2,
  },

  /* ================= HEADER ================= */

  header: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "20px",

    marginBottom: "35px",
  },

  heading: {
    color: "#fff",

    fontSize:
      window.innerWidth < 768
        ? "38px"
        : window.innerWidth < 1100
        ? "48px"
        : "58px",

    fontWeight: "900",

    lineHeight: "1.1",

    marginBottom: "10px",
  },

  subHeading: {
    color: "#94a3b8",

    fontSize:
      window.innerWidth < 768
        ? "15px"
        : "18px",

    lineHeight: "1.6",
  },

  totalBox: {
    minWidth:
      window.innerWidth < 768
        ? "100%"
        : "170px",

    background:
      "rgba(15,23,42,0.88)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    padding:
      window.innerWidth < 768
        ? "20px"
        : "25px",

    borderRadius: "28px",

    textAlign: "center",

    backdropFilter: "blur(20px)",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.35)",
  },

  totalNumber: {
    color: "#22c55e",

    fontSize:
      window.innerWidth < 768
        ? "42px"
        : "52px",

    fontWeight: "900",
  },

  totalText: {
    color: "#cbd5e1",

    fontSize: "16px",

    marginTop: "8px",
  },

  /* ================= LOADING ================= */

  loadingBox: {
    height: "60vh",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",
  },

  loader: {
    width: "70px",

    height: "70px",

    border:
      "6px solid rgba(255,255,255,0.1)",

    borderTop:
      "6px solid #22c55e",

    borderRadius: "50%",
  },

  loadingText: {
    marginTop: "20px",

    color: "#cbd5e1",

    fontSize: "20px",
  },

  /* ================= EMPTY ================= */

  emptyCard: {
    background:
      "rgba(15,23,42,0.88)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    padding:
      window.innerWidth < 768
        ? "40px 20px"
        : "80px",

    borderRadius: "30px",

    textAlign: "center",

    color: "#fff",
  },

  /* ================= GRID ================= */

  grid: {
    display: "grid",

    gridTemplateColumns:
      window.innerWidth < 768
        ? "1fr"
        : "repeat(auto-fit,minmax(380px,1fr))",

    gap:
      window.innerWidth < 768
        ? "20px"
        : "30px",
  },

  /* ================= CARD ================= */

  card: {
    background:
      "rgba(15,23,42,0.88)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    borderRadius:
      window.innerWidth < 768
        ? "24px"
        : "32px",

    padding:
      window.innerWidth < 768
        ? "22px"
        : "28px",

    backdropFilter: "blur(18px)",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.35)",

    transition: "0.3s",
  },

  cardTop: {
    display: "flex",

    justifyContent: "space-between",

    alignItems:
      window.innerWidth < 768
        ? "flex-start"
        : "center",

    flexDirection:
      window.innerWidth < 768
        ? "column"
        : "row",

    gap: "18px",

    marginBottom: "24px",
  },

  productName: {
    color: "#fff",

    fontSize:
      window.innerWidth < 768
        ? "28px"
        : "34px",

    fontWeight: "900",

    marginBottom: "8px",

    wordBreak: "break-word",
  },

  shopName: {
    color: "#94a3b8",

    fontSize: "16px",
  },

  statusBadge: {
    padding: "10px 18px",

    borderRadius: "50px",

    color: "#fff",

    fontSize: "14px",

    fontWeight: "700",
  },

  /* ================= INFO GRID ================= */

  infoGrid: {
    display: "grid",

    gridTemplateColumns:
      window.innerWidth < 768
        ? "1fr"
        : "1fr 1fr",

    gap: "18px",

    marginBottom: "24px",
  },

  infoCard: {
    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,255,255,0.05)",

    padding:
      window.innerWidth < 768
        ? "18px"
        : "22px",

    borderRadius: "22px",
  },

  infoLabel: {
    color: "#94a3b8",

    fontSize: "15px",

    marginBottom: "10px",
  },

  infoValue: {
    color: "#fff",

    fontSize:
      window.innerWidth < 768
        ? "28px"
        : "38px",

    fontWeight: "900",
  },

  /* ================= ADDRESS ================= */

  addressCard: {
    background:
      "rgba(255,255,255,0.04)",

    border:
      "1px solid rgba(255,255,255,0.05)",

    borderRadius: "24px",

    padding:
      window.innerWidth < 768
        ? "18px"
        : "24px",

    marginBottom: "25px",
  },

  addressHeading: {
    color: "#fff",

    fontSize:
      window.innerWidth < 768
        ? "22px"
        : "26px",

    marginBottom: "18px",

    fontWeight: "800",
  },

  addressRow: {
    color: "#cbd5e1",

    marginBottom: "14px",

    fontSize:
      window.innerWidth < 768
        ? "14px"
        : "16px",

    lineHeight: "1.6",

    wordBreak: "break-word",
  },

  /* ================= BUTTONS ================= */

  buttonRow: {
    display: "flex",

    flexDirection:
      window.innerWidth < 768
        ? "column"
        : "row",

    gap: "14px",

    flexWrap: "wrap",
  },

  payBtn: {
    flex: 1,

    border: "none",

    padding: "16px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#f59e0b,#ea580c)",

    color: "#fff",

    fontSize: "16px",

    fontWeight: "700",

    cursor: "pointer",
  },

  deliverBtn: {
    flex: 1,

    border: "none",

    padding: "16px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",

    color: "#fff",

    fontSize: "16px",

    fontWeight: "700",

    cursor: "pointer",
  },

  cancelBtn: {
    flex: 1,

    border: "none",

    padding: "16px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "#fff",

    fontSize: "16px",

    fontWeight: "700",

    cursor: "pointer",
  },
};