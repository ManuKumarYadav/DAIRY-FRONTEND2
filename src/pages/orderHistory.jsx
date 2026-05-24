import React, { useEffect, useState } from "react";

const OrderHistory = () => {

  const [orders, setOrders] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/orders/shop/${user?.name}`
      );

      const data = await res.json();

      setOrders(data.data || []);

    } catch (err) {

      console.log(err);
    }
  };

  const cancelOrder = async (id) => {

    try {

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: "Cancelled",
          }),
        }
      );

      fetchOrders();

    } catch (err) {

      console.log(err);
    }
  };

  const getProgress = (status) => {

    if (status === "Placed") return "15%";

    if (status === "Paid") return "60%";

    if (status === "Delivered") return "100%";

    return "0%";
  };

  const getImage = (img) => {

    if (!img)
      return "https://via.placeholder.com/120";

    if (img.startsWith("http"))
      return img;

    return `${process.env.REACT_APP_API_URL}${img}`;
  };

  return (

    <>
      <div className="orders-page">

        <div className="bg-glow one"></div>
        <div className="bg-glow two"></div>

        <div className="orders-container">

          <div className="heading">

            <span className="badge">
              📦 DairyNest Orders
            </span>

            <h1>
              My Premium
              <span> Orders</span>
            </h1>

            <p>
              Track your fresh dairy deliveries
              in real-time.
            </p>

          </div>

          {
            orders.length === 0 && (

              <div className="empty glass">

                <h2>No Orders Found</h2>

                <p>
                  Your premium dairy orders
                  will appear here.
                </p>

              </div>
            )
          }

          {
            orders.map((order) => (

              <div
                key={order._id}
                className="order-card glass"
              >

                <div className="top-section">

                  <div>

                    <span
                      className={`status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>

                    <h2>
                      ₹{order.totalPrice}
                    </h2>

                  </div>

                  {
                    order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          cancelOrder(order._id)
                        }
                      >
                        Cancel Order
                      </button>
                    )
                  }

                </div>

                <div className="products-grid">

                  {
                    order.products.map((item, i) => (

                      <div
                        key={i}
                        className="product-card"
                      >

                        <div className="img-box">

                          <img
                            src={getImage(item.image)}
                            alt=""
                          />

                        </div>

                        <div className="product-info">

                          <h3>
                            {item.productName}
                          </h3>

                          <p>
                            Quantity:
                            {" "}
                            {item.quantity}
                          </p>

                          <span>
                            ₹
                            {item.price *
                              item.quantity}
                          </span>

                        </div>

                      </div>
                    ))
                  }

                </div>

                <div className="address-box">

                  <h4>
                    🚚 Delivery Address
                  </h4>

                  <p>
                    {order?.address?.name}
                  </p>

                  <p>
                    {order?.address?.city}
                    {" "}
                    -
                    {" "}
                    {order?.address?.pincode}
                  </p>

                  <p>
                    📞
                    {" "}
                    {order?.address?.phone}
                  </p>

                </div>

                <div className="tracking">

                  <div
                    className="track-line"
                    style={{
                      "--progress":
                        getProgress(order.status),
                    }}
                  >

                    <div className="dot active"></div>

                    <div
                      className={`dot ${
                        order.status !== "Placed"
                          ? "active"
                          : ""
                      }`}
                    ></div>

                    <div
                      className={`dot ${
                        order.status ===
                        "Delivered"
                          ? "active"
                          : ""
                      }`}
                    ></div>

                  </div>

                  <div className="labels">

                    <span>Placed</span>
                    <span>Paid</span>
                    <span>Delivered</span>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:"Poppins",sans-serif;
      }

      .orders-page{
        min-height:100vh;
        padding:120px 40px 50px;
        background:#020617;
        color:white;
      }

      .orders-container{
        max-width:1400px;
        margin:auto;
      }

      .heading{
        margin-bottom:50px;
      }

      .heading h1{
        font-size:72px;
        font-weight:900;
      }

      .heading h1 span{
        color:#22c55e;
      }

      .heading p{
        color:#94a3b8;
        margin-top:15px;
        font-size:18px;
      }

      .badge{
        display:inline-block;
        padding:10px 18px;
        border-radius:30px;
        background:#1e293b;
        color:#60a5fa;
        margin-bottom:20px;
      }

      .glass{
        background:#0f172a;
        border:1px solid rgba(255,255,255,0.06);
      }

      .order-card{
        padding:30px;
        border-radius:28px;
        margin-bottom:30px;
      }

      .top-section{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:30px;
        gap:20px;
      }

      .top-section h2{
        margin-top:12px;
        color:#22c55e;
        font-size:42px;
      }

      .status{
        padding:10px 18px;
        border-radius:30px;
        font-size:14px;
        font-weight:700;
      }

      .status.placed{
        background:#f59e0b;
      }

      .status.paid{
        background:#2563eb;
      }

      .status.delivered{
        background:#22c55e;
      }

      .status.cancelled{
        background:#ef4444;
      }

      .cancel-btn{
        border:none;
        padding:14px 22px;
        border-radius:14px;
        background:#ef4444;
        color:white;
        cursor:pointer;
      }

      .products-grid{
        display:grid;
        grid-template-columns:
        repeat(auto-fit,minmax(260px,1fr));
        gap:20px;
        margin-bottom:30px;
      }

      .product-card{
        padding:18px;
        border-radius:22px;
        background:#111827;
      }

      .img-box{
        width:100%;
        height:220px;
        background:white;
        border-radius:18px;
        overflow:hidden;
        margin-bottom:15px;
      }

      .img-box img{
        width:100%;
        height:100%;
        object-fit:contain;
      }

      .product-info h3{
        font-size:26px;
        margin-bottom:10px;
      }

      .product-info p{
        color:#94a3b8;
        margin-bottom:10px;
      }

      .product-info span{
        color:#22c55e;
        font-size:28px;
        font-weight:800;
      }

      .address-box{
        padding:22px;
        border-radius:20px;
        background:#111827;
        margin-bottom:30px;
      }

      .address-box h4{
        margin-bottom:15px;
      }

      .address-box p{
        color:#cbd5e1;
        line-height:1.8;
      }

      .track-line{
        display:flex;
        justify-content:space-between;
        position:relative;
        margin-bottom:12px;
      }

      .track-line::before{
        content:"";
        position:absolute;
        width:100%;
        height:5px;
        background:#1e293b;
        top:50%;
        transform:translateY(-50%);
      }

      .track-line::after{
        content:"";
        position:absolute;
        width:var(--progress);
        height:5px;
        background:#22c55e;
        top:50%;
        transform:translateY(-50%);
      }

      .dot{
        width:20px;
        height:20px;
        border-radius:50%;
        background:#334155;
        z-index:2;
      }

      .dot.active{
        background:#22c55e;
      }

      .labels{
        display:flex;
        justify-content:space-between;
        color:#94a3b8;
      }

      .empty{
        padding:60px;
        border-radius:30px;
        text-align:center;
      }

      @media(max-width:768px){

        .orders-page{
          padding:100px 18px 30px;
        }

        .heading h1{
          font-size:42px;
          line-height:1.1;
        }

        .top-section{
          flex-direction:column;
          align-items:flex-start;
        }

        .top-section h2{
          font-size:32px;
        }

        .products-grid{
          grid-template-columns:1fr;
        }

        .cancel-btn{
          width:100%;
        }
      }

      `}</style>
    </>
  );
};

export default OrderHistory;