import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/orders/shop/${user?.name}`
);
    const data = await res.json();
    setOrders(data.data || []);
  };

  const cancelOrder = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Cancelled" }),
    });
    fetchOrders();
  };

  const getProgress = (status) => {
    if (status === "Placed") return "0%";
    if (status === "Paid") return "50%";
    if (status === "Delivered") return "100%";
    return "0%";
  };

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/60";
    if (img.startsWith("http")) return img;
    return `${process.env.REACT_APP_API_URL}${img}`;
  };

  return (
    <div className="page">
      <h2 className="title"><b>My Orders</b></h2>
      <hr />
      {orders.length === 0 && <p className="empty"><b>No Orders Found</b></p>}
      {orders.map((order) => (
        <div key={order._id} className="card">

          <div className="products">
            {order.products.map((item, i) => (
              <div key={i} className="productRow">

                <img src={getImage(item.image)} alt="" />

                <div className="info">
                  <h4 style={{ color: "#2ad51a" }}><b>{item.productName}</b></h4>
                  <p style={{ color: "#d4d7db" }}><b>Qty:</b> {item.quantity}</p>
                </div>

                <div className="price">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            ))}
          </div>

          <div className="summary">
            <div>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
              <p className="total">Total Price: ₹{order.totalPrice}</p>
            </div>

            {order.status !== "Cancelled" &&
              order.status !== "Delivered" && (
                <button onClick={() => cancelOrder(order._id)}>
                  Cancel
                </button>
              )}
          </div>

         
          <div className="address">
            <p style={{ color: "#22c55e" }}><b>{order?.address?.name}</b></p>
            <p style={{ color: "#22c55e" }}>{order?.address?.city} - {order?.address?.pincode}</p>
            <p style={{ color: "#22c55e" }}>Phone No:{order?.address?.phone}</p>
          </div>

          <div className="tracking">
            <div
              className="trackLine"
              style={{ "--progress": getProgress(order.status) }}
            >
              <div className="dot active"></div>
              <div className={`dot ${order.status !== "Placed" ? "active" : ""}`}></div>
              <div className={`dot ${order.status === "Delivered" ? "active" : ""}`}></div>
            </div>

            <div className="labels">
              <span>Order Placed</span>
              <span>Paid</span>
              <span>Delivered</span>
            </div>
          </div>

        </div>
      ))}

      <style>{`
        .page {
          background: linear-gradient(135deg, #020617, #0f172a);
          min-height: 100vh;
          padding: 20px;
          color: #fff;
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
        }

        .empty {
          text-align: center;
          opacity: 0.6;
        }

        .card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);

          border-radius: 12px;
          padding: 14px;
          margin-bottom: 14px;

          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-2px);
        }

        .productRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .productRow img {
          width: 45px;
          height: 45px;
          border-radius: 8px;
          object-fit: cover;
        }

        .info {
          flex: 1;
          margin-left: 10px;
        }

        .info h4 {
          font-size: 14px;
          margin: 0;
        }

        .info p {
          font-size: 12px;
          color: #94a3b8;
        }

        .price {
          font-size: 14px;
          font-weight: 600;
          color: #22c55e;
        }
        .summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .status {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .status.paid { background: #22c55e; }
        .status.cancelled { background: #ef4444; }
        .status.delivered { background: #3b82f6; }

        .total {
          font-weight: bold;
          color: #22c55e;
        }

        button {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          background: #ef4444;
          color: #fff;
          cursor: pointer;
        }

        .address {
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.9;
        }

        .tracking {
          margin-top: 10px;
        }

        .trackLine {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }

        .trackLine::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.2);
          top: 50%;
          transform: translateY(-50%);
        }

        .trackLine::after {
          content: "";
          position: absolute;
          width: var(--progress);
          height: 3px;
          background: #22c55e;
          top: 50%;
          transform: translateY(-50%);
        }

        .dot {
          width: 10px;
          height: 10px;
          background: #555;
          border-radius: 50%;
          z-index: 2;
        }

        .dot.active {
          background: #22c55e;
        }

        .labels {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #94a3b8;
        }

        @media (max-width: 600px) {
          .productRow {
            flex-direction: column;
            align-items: flex-start;
          }

          .price {
            margin-top: 5px;
          }

          .summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderHistory;