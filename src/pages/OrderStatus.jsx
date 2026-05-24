import React from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const OrderStatus = () => {

  const location = useLocation();

  const navigate = useNavigate();

  let orders = location.state?.orders;

  if (!orders) {

    const saved =
      JSON.parse(
        localStorage.getItem("latestOrders")
      );

    orders = saved || [];
  }

  if (!orders || orders.length === 0) {

    return (

      <div className="status-page">

        <div className="bg one"></div>
        <div className="bg two"></div>

        <div className="empty-card glass">

          <div className="empty-icon">
            📦
          </div>

          <h1>No Orders Found</h1>

          <p>
            Looks like you haven't placed
            any premium dairy orders yet.
          </p>

          <button
            className="shop-btn"
            onClick={() => navigate("/shop")}
          >
            Go To Shop
          </button>

        </div>

        <Style />

      </div>
    );
  }

  return (

    <div className="status-page">

      <div className="bg one"></div>
      <div className="bg two"></div>

      <div className="status-container">

        {/* TOP */}

        <div className="success-section">

          <div className="success-icon">
            ✓
          </div>

          <span className="badge">
            Payment Successful
          </span>

          <h1>
            Order
            <span> Confirmed</span>
          </h1>

          <p>
            Your premium dairy products
            are now being prepared and
            shipped.
          </p>

        </div>

        {/* ORDERS */}

        <div className="orders-grid">

          {
            orders.map((order, index) => (

              <div
                key={index}
                className="order-card glass"
              >

                <div className="top-row">

                  <div>

                    <h2>
                      {order?.productName ||
                        "Product"}
                    </h2>

                    <p className="shop-name">
                      🏪
                      {" "}
                      {order?.shopName}
                    </p>

                  </div>

                  <div className="qty-box">

                    x
                    {order?.quantity}

                  </div>

                </div>

                <div className="line"></div>

                <div className="status-row">

                  <span>
                    Order Status
                  </span>

                  <div className="status-badge">
                    {order?.status}
                  </div>

                </div>

                <div className="delivery-box">

                  <h4>
                    🚚 Delivery Update
                  </h4>

                  <p>
                    Your order is packed and
                    will arrive shortly.
                  </p>

                </div>

                {/* TRACKING */}

                <div className="tracking">

                  <div className="track-line">

                    <div className="dot active"></div>
                    <div className="dot active"></div>
                    <div className="dot"></div>

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

        {/* BUTTON */}

        <button
          className="view-btn"
          onClick={() => navigate("/orders")}
        >
          View All Orders →
        </button>

      </div>

      <Style />

    </div>
  );
};

const Style = () => (

  <style>{`

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  .status-page{

    min-height:100vh;

    padding:120px 30px 50px;

    position:relative;

    overflow:hidden;

    background:
    linear-gradient(
      135deg,
      #020617,
      #081229,
      #020617
    );

    color:white;
  }

  .bg{

    position:absolute;

    border-radius:50%;

    filter:blur(120px);

    opacity:0.22;
  }

  .bg.one{

    width:350px;
    height:350px;

    background:#2563eb;

    top:-120px;
    left:-120px;
  }

  .bg.two{

    width:400px;
    height:400px;

    background:#22c55e;

    bottom:-140px;
    right:-120px;
  }

  .status-container{

    position:relative;
    z-index:2;

    max-width:1450px;

    margin:auto;
  }

  /* SUCCESS */

  .success-section{

    text-align:center;

    margin-bottom:60px;
  }

  .success-icon{

    width:120px;
    height:120px;

    margin:auto;
    margin-bottom:24px;

    border-radius:50%;

    display:flex;
    align-items:center;
    justify-content:center;

    font-size:48px;
    font-weight:900;

    background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a
    );

    box-shadow:
    0 25px 60px rgba(34,197,94,0.35);
  }

  .badge{

    display:inline-block;

    padding:12px 24px;

    border-radius:40px;

    background:
    rgba(37,99,235,0.15);

    border:
    1px solid rgba(255,255,255,0.08);

    color:#60a5fa;

    font-weight:700;

    margin-bottom:24px;
  }

  .success-section h1{

    font-size:76px;

    line-height:1;

    margin-bottom:20px;

    font-weight:900;
  }

  .success-section h1 span{

    background:
    linear-gradient(
      135deg,
      #60a5fa,
      #22c55e
    );

    -webkit-background-clip:text;

    -webkit-text-fill-color:transparent;
  }

  .success-section p{

    color:#cbd5e1;

    font-size:22px;

    max-width:750px;

    margin:auto;

    line-height:1.8;
  }

  /* GRID */

  .orders-grid{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(350px,1fr));

    gap:28px;

    margin-bottom:50px;
  }

  .glass{

    background:
    rgba(15,23,42,0.72);

    border:
    1px solid rgba(255,255,255,0.08);

    backdrop-filter:blur(20px);

    box-shadow:
    0 25px 60px rgba(0,0,0,0.45);
  }

  .order-card{

    padding:30px;

    border-radius:30px;

    transition:0.35s;
  }

  .order-card:hover{

    transform:
    translateY(-8px);

    box-shadow:
    0 35px 70px rgba(0,0,0,0.55);
  }

  .top-row{

    display:flex;

    justify-content:space-between;

    align-items:flex-start;

    margin-bottom:22px;
  }

  .top-row h2{

    font-size:34px;

    margin-bottom:10px;
  }

  .shop-name{

    color:#94a3b8;

    font-size:16px;
  }

  .qty-box{

    min-width:65px;

    height:65px;

    border-radius:18px;

    display:flex;
    align-items:center;
    justify-content:center;

    background:
    linear-gradient(
      135deg,
      #2563eb,
      #22c55e
    );

    font-size:24px;
    font-weight:900;
  }

  .line{

    width:100%;
    height:1px;

    background:
    rgba(255,255,255,0.08);

    margin-bottom:24px;
  }

  .status-row{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:24px;
  }

  .status-row span{

    color:#cbd5e1;

    font-size:18px;
  }

  .status-badge{

    padding:10px 18px;

    border-radius:30px;

    background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a
    );

    font-size:14px;
    font-weight:800;
  }

  .delivery-box{

    padding:22px;

    border-radius:22px;

    margin-bottom:30px;

    background:
    rgba(255,255,255,0.05);

    border:
    1px solid rgba(255,255,255,0.05);
  }

  .delivery-box h4{

    font-size:22px;

    margin-bottom:12px;
  }

  .delivery-box p{

    color:#cbd5e1;

    line-height:1.7;
  }

  /* TRACK */

  .tracking{

    margin-top:20px;
  }

  .track-line{

    position:relative;

    display:flex;

    justify-content:space-between;

    margin-bottom:14px;
  }

  .track-line::before{

    content:"";

    position:absolute;

    width:100%;
    height:6px;

    background:
    rgba(255,255,255,0.08);

    top:50%;

    transform:translateY(-50%);

    border-radius:20px;
  }

  .track-line::after{

    content:"";

    position:absolute;

    width:65%;
    height:6px;

    background:
    linear-gradient(
      135deg,
      #2563eb,
      #22c55e
    );

    top:50%;

    transform:translateY(-50%);

    border-radius:20px;
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

    box-shadow:
    0 0 18px rgba(34,197,94,0.7);
  }

  .labels{

    display:flex;

    justify-content:space-between;

    color:#94a3b8;

    font-size:14px;
  }

  /* BUTTON */

  .view-btn{

    display:block;

    margin:auto;

    padding:20px 38px;

    border:none;

    border-radius:20px;

    background:
    linear-gradient(
      135deg,
      #2563eb,
      #22c55e
    );

    color:white;

    font-size:20px;
    font-weight:800;

    cursor:pointer;

    transition:0.35s;
  }

  .view-btn:hover{

    transform:
    translateY(-5px);

    box-shadow:
    0 25px 45px rgba(37,99,235,0.35);
  }

  /* EMPTY */

  .empty-card{

    position:relative;
    z-index:2;

    max-width:700px;

    margin:auto;

    padding:60px;

    border-radius:32px;

    text-align:center;
  }

  .empty-icon{

    font-size:90px;

    margin-bottom:25px;
  }

  .empty-card h1{

    font-size:54px;

    margin-bottom:16px;
  }

  .empty-card p{

    color:#cbd5e1;

    font-size:18px;

    line-height:1.7;

    margin-bottom:30px;
  }

  .shop-btn{

    padding:18px 34px;

    border:none;

    border-radius:18px;

    background:
    linear-gradient(
      135deg,
      #2563eb,
      #22c55e
    );

    color:white;

    font-size:18px;
    font-weight:800;

    cursor:pointer;
  }

  /* MOBILE */

  @media(max-width:768px){

    .status-page{

      padding-left:18px;
      padding-right:18px;
    }

    .success-section h1{

      font-size:48px;
    }

    .success-section p{

      font-size:18px;
    }

    .top-row{

      flex-direction:column;

      gap:20px;
    }

    .top-row h2{

      font-size:28px;
    }

    .empty-card{

      padding:35px;
    }

    .empty-card h1{

      font-size:38px;
    }
  }

  `}</style>
);

export default OrderStatus;