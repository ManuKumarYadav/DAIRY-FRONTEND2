import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

const PaymentPage = () => {

  const [cart, setCart] = useState([]);

  const [address, setAddress] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    setCart(
      JSON.parse(
        localStorage.getItem("cart")
      ) || []
    );

    setAddress(
      JSON.parse(
        localStorage.getItem("address")
      )
    );

  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.price || 0) *
      (item.quantity || 0),
    0
  );

  const getImage = (item) => {

    if (!item.image)
      return "https://via.placeholder.com/100";

    if (item.image.startsWith("http"))
      return item.image;

    return `${process.env.REACT_APP_API_URL}${item.image}`;
  };

  const handlePayment = async () => {

    if (!window.Razorpay) {

      alert("Razorpay not loaded");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/payment/create-order`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount: total,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {

        alert("Order creation failed");
        return;
      }

      const options = {

        key:
          process.env
            .REACT_APP_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        order_id: data.order_id,

        name: "DairyNest",

        description:
          "Premium Dairy Checkout",

        handler:
          async function (response) {

            try {

              const verifyRes =
                await fetch(
                  `${process.env.REACT_APP_API_URL}/api/payment/verify-payment`,
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify(
                      response
                    ),
                  }
                );

              const verifyData =
                await verifyRes.json();

              if (!verifyData.success) {

                alert(
                  "Payment verification failed"
                );

                return;
              }

              const saveRes =
                await fetch(
                  `${process.env.REACT_APP_API_URL}/api/orders`,
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      shopName:
                        "DairyNest",

                      shopOwner:
                        user?.name ||
                        "guest",

                      address:
                        address,

                      products:
                        cart.map(
                          (item) => ({
                            productName:
                              item.name ||
                              item.productName,

                            quantity:
                              item.quantity,

                            price:
                              item.price,

                            image:
                              item.image,
                          })
                        ),
                    }),
                  }
                );

              const saved =
                await saveRes.json();

              if (!saved.success) {

                alert(
                  "Order save failed"
                );

                return;
              }

              localStorage.removeItem(
                "cart"
              );

              navigate(
                "/order-status",
                {
                  state: {
                    orders:
                      saved.data
                        ?.products ||
                      cart,
                  },
                }
              );

            } catch (err) {

              console.log(err);

              alert(
                "Something went wrong"
              );
            }
          },

        prefill: {

          name:
            user?.name || "User",

          email:
            user?.email ||
            "test@gmail.com",

          contact:
            user?.phone ||
            "9999999999",
        },

        theme: {
          color: "#22c55e",
        },
      };

      const razor =
        new window.Razorpay(options);

      razor.open();

    } catch (err) {

      console.log(err);

      alert("Payment error");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="payment-page">

      <div className="bg one"></div>
      <div className="bg two"></div>

      <div className="payment-container">

        {/* LEFT */}

        <div className="left-section">

          {/* ADDRESS */}

          <div className="glass address-card">

            <span className="badge">
              📍 Delivery Address
            </span>

            <h2>
              Shipping Details
            </h2>

            {
              address ? (
                <>

                  <div className="address-box">

                    <h3>
                      {address.name}
                    </h3>

                    <p>
                      {address.address}
                    </p>

                    <p>
                      {address.city}
                      {" "}
                      -
                      {" "}
                      {address.pincode}
                    </p>

                    <span>
                      📞
                      {" "}
                      {address.phone}
                    </span>

                  </div>

                </>
              ) : (
                <p>No Address Found</p>
              )
            }

          </div>

          {/* PRODUCTS */}

          <div className="glass products-card">

            <h2>
              🛒 Order Items
            </h2>

            {
              cart.map((item, i) => (

                <div
                  key={i}
                  className="item-card"
                >

                  <img
                    src={getImage(item)}
                    alt=""
                  />

                  <div className="item-info">

                    <h3>
                      {item.name ||
                        item.productName}
                    </h3>

                    <p>
                      Qty:
                      {" "}
                      {item.quantity}
                    </p>

                  </div>

                  <div className="price">

                    ₹
                    {item.price *
                      item.quantity}

                  </div>

                </div>
              ))
            }

          </div>

        </div>

        {/* RIGHT */}

        <div className="right-section">

          <div className="glass summary">

            <div className="top-dots">

              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>

            </div>

            <h2>
              Payment Summary
            </h2>

            <div className="row">

              <span>
                Items Total
              </span>

              <span>
                ₹{total}
              </span>

            </div>

            <div className="row">

              <span>
                Delivery
              </span>

              <span className="free">
                FREE
              </span>

            </div>

            <div className="row">

              <span>
                GST
              </span>

              <span>
                ₹0
              </span>

            </div>

            <hr />

            <div className="total">

              <span>
                Total
              </span>

              <span>
                ₹{total + 0}
              </span>

            </div>

            <button
              className="pay-btn"
              onClick={handlePayment}
              disabled={loading}
            >

              {
                loading
                  ? "Processing..."
                  : "Proceed To Pay →"
              }

            </button>

            <p className="secure">

              🔒 100% Secure Razorpay Payment

            </p>

          </div>

        </div>

      </div>

      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      .payment-page{

        min-height:100vh;

        padding:120px 30px 40px;

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

      .payment-container{

        position:relative;
        z-index:2;

        max-width:1450px;

        margin:auto;

        display:grid;

        grid-template-columns:2fr 1fr;

        gap:30px;
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

      .address-card,
      .products-card,
      .summary{

        padding:32px;

        border-radius:30px;

        margin-bottom:28px;
      }

      .badge{

        display:inline-block;

        padding:12px 22px;

        border-radius:40px;

        background:
        rgba(37,99,235,0.14);

        color:#60a5fa;

        border:
        1px solid rgba(255,255,255,0.08);

        font-weight:700;

        margin-bottom:22px;
      }

      h2{

        font-size:42px;

        margin-bottom:25px;

        font-weight:900;
      }

      .address-box{

        padding:25px;

        border-radius:22px;

        background:
        rgba(255,255,255,0.05);
      }

      .address-box h3{

        font-size:28px;

        margin-bottom:12px;
      }

      .address-box p{

        color:#cbd5e1;

        margin-bottom:8px;
      }

      .address-box span{

        color:#22c55e;

        font-weight:700;
      }

      .item-card{

        display:flex;

        align-items:center;

        gap:18px;

        padding:18px;

        border-radius:22px;

        background:
        rgba(255,255,255,0.05);

        margin-bottom:18px;
      }

      .item-card img{

        width:90px;
        height:90px;

        object-fit:cover;

        border-radius:18px;

        background:white;
      }

      .item-info{

        flex:1;
      }

      .item-info h3{

        font-size:24px;

        margin-bottom:8px;
      }

      .item-info p{

        color:#94a3b8;
      }

      .price{

        color:#22c55e;

        font-size:26px;

        font-weight:900;
      }

      .summary{

        position:sticky;

        top:100px;
      }

      .top-dots{

        display:flex;

        gap:10px;

        margin-bottom:24px;
      }

      .dot{

        width:16px;
        height:16px;

        border-radius:50%;
      }

      .red{
        background:#ef4444;
      }

      .yellow{
        background:#f59e0b;
      }

      .green{
        background:#22c55e;
      }

      .row{

        display:flex;

        justify-content:space-between;

        margin-bottom:18px;

        color:#cbd5e1;

        font-size:18px;
      }

      .free{

        color:#22c55e;

        font-weight:800;
      }

      hr{

        border:none;

        height:1px;

        background:
        rgba(255,255,255,0.08);

        margin:25px 0;
      }

      .total{

        display:flex;

        justify-content:space-between;

        align-items:center;

        font-size:30px;

        font-weight:900;

        margin-bottom:28px;
      }

      .pay-btn{

        width:100%;

        padding:20px;

        border:none;

        border-radius:18px;

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

      .pay-btn:hover{

        transform:
        translateY(-4px);

        box-shadow:
        0 20px 40px rgba(37,99,235,0.35);
      }

      .secure{

        text-align:center;

        margin-top:18px;

        color:#94a3b8;
      }

      @media(max-width:1000px){

        .payment-container{

          grid-template-columns:1fr;
        }

        .summary{

          position:static;
        }
      }

      @media(max-width:700px){

        .payment-page{

          padding-left:18px;
          padding-right:18px;
        }

        h2{

          font-size:32px;
        }

        .item-card{

          flex-direction:column;

          align-items:flex-start;
        }

        .price{

          align-self:flex-end;
        }
      }

      `}</style>

    </div>
  );
};

export default PaymentPage;