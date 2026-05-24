import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(saved);

  }, []);

  const updateCart = (updated) => {

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const increaseQty = (i) => {

    const updated = [...cart];

    updated[i].quantity++;

    updateCart(updated);
  };

  const decreaseQty = (i) => {

    const updated = [...cart];

    if (updated[i].quantity > 1) {
      updated[i].quantity--;
    }

    updateCart(updated);
  };

  const removeItem = (i) => {

    const updated =
      cart.filter((_, index) => index !== i);

    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const getImage = (item) => {

    if (!item.image)
      return "https://via.placeholder.com/120";

    if (item.image.startsWith("http"))
      return item.image;

    return `${process.env.REACT_APP_API_URL}${item.image}`;
  };

  return (

    <div className="cart-page">

      <div className="cart-overlay"></div>

      <div className="cart-container">

        {/* LEFT */}

        <div className="cart-left">

          <div className="cart-heading">

            <span className="cart-badge">
              Premium Cart
            </span>

            <h1>
              Shopping Cart
              <span>
                {" "}[{cart.length}]
              </span>
            </h1>

            <p>
              Manage your premium dairy products
              before checkout.
            </p>

          </div>

          {
            cart.length === 0 ? (

              <div className="empty-cart glass">

                <h2>Your Cart is Empty</h2>

                <p>
                  Add premium dairy products
                  to continue shopping.
                </p>

                <button
                  className="shop-btn"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              cart.map((item, i) => (

                <div
                  key={i}
                  className="cart-card glass"
                >

                  <div className="image-box">

                    <img
                      src={getImage(item)}
                      alt=""
                    />

                    <div className="discount">
                      Premium
                    </div>

                  </div>

                  <div className="cart-details">

                    <h3>{item.name}</h3>

                    <p className="product-desc">
                      Farm fresh dairy product
                    </p>

                    <div className="price-row">

                      <span className="main-price">
                        ₹{item.price}
                      </span>

                      <span className="old-price">
                        ₹{item.price + 80}
                      </span>

                    </div>

                    <div className="qty-row">

                      <button
                        className="qty-btn"
                        onClick={() =>
                          decreaseQty(i)
                        }
                      >
                        −
                      </button>

                      <span className="qty-num">
                        {item.quantity}
                      </span>

                      <button
                        className="qty-btn"
                        onClick={() =>
                          increaseQty(i)
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(i)
                      }
                    >
                      Remove Item
                    </button>

                  </div>

                  <div className="item-total">

                    ₹
                    {item.price * item.quantity}

                  </div>

                </div>

              ))

            )
          }

        </div>

        {/* RIGHT */}

        <div className="cart-right">

          <div className="summary glass">

            <div className="summary-top">

              <div className="circle red"></div>
              <div className="circle yellow"></div>
              <div className="circle green"></div>

            </div>

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>Items</span>

              <span>{cart.length}</span>

            </div>

            <div className="summary-row">

              <span>Subtotal</span>

              <span>₹{total}</span>

            </div>

            <div className="summary-row">

              <span>Delivery</span>

              <span className="free">
                FREE
              </span>

            </div>

            <div className="summary-row">

              <span>GST</span>

              <span>₹0</span>

            </div>

            <hr />

            <div className="final-row">

              <span>Total</span>

              <span>₹{total + 0}</span>

            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/address")
              }
            >
              Proceed To Checkout →
            </button>

          </div>

        </div>

      </div>

      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      .cart-page{

        min-height:100vh;

        padding-top:110px;
        padding-left:35px;
        padding-right:35px;
        padding-bottom:50px;

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

      .cart-overlay{

        position:absolute;
        inset:0;

        background:
        radial-gradient(
          circle at top left,
          rgba(37,99,235,0.18),
          transparent 30%
        ),

        radial-gradient(
          circle at bottom right,
          rgba(34,197,94,0.12),
          transparent 30%
        );
      }

      .cart-container{

        position:relative;
        z-index:2;

        max-width:1450px;

        margin:auto;

        display:grid;

        grid-template-columns:2fr 1fr;

        gap:30px;
      }

      .cart-heading{

        margin-bottom:30px;
      }

      .cart-badge{

        display:inline-block;

        padding:12px 22px;

        border-radius:40px;

        background:
        rgba(37,99,235,0.14);

        border:
        1px solid rgba(255,255,255,0.08);

        color:#60a5fa;

        font-weight:600;

        margin-bottom:22px;
      }

      .cart-heading h1{

        font-size:64px;

        line-height:1;

        font-weight:900;

        margin-bottom:16px;

        background:
        linear-gradient(
          135deg,
          #ffffff,
          #60a5fa,
          #22c55e
        );

        -webkit-background-clip:text;

        -webkit-text-fill-color:transparent;
      }

      .cart-heading p{

        color:#cbd5e1;

        font-size:20px;

        max-width:700px;

        line-height:1.7;
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

      .cart-card{

        display:flex;

        align-items:center;

        gap:24px;

        padding:24px;

        border-radius:28px;

        margin-bottom:24px;

        transition:0.35s;
      }

      .cart-card:hover{

        transform:
        translateY(-6px);

        box-shadow:
        0 30px 70px rgba(0,0,0,0.6);
      }

      .image-box{

        position:relative;
      }

      .image-box img{

        width:140px;
        height:140px;

        object-fit:cover;

        border-radius:22px;

        background:white;

        padding:10px;
      }

      .discount{

        position:absolute;

        top:10px;
        left:10px;

        background:
        linear-gradient(
          135deg,
          #2563eb,
          #22c55e
        );

        color:white;

        font-size:12px;

        font-weight:700;

        padding:6px 12px;

        border-radius:20px;
      }

      .cart-details{

        flex:1;
      }

      .cart-details h3{

        font-size:32px;

        font-weight:800;

        margin-bottom:8px;
      }

      .product-desc{

        color:#94a3b8;

        margin-bottom:20px;
      }

      .price-row{

        display:flex;

        align-items:center;

        gap:14px;

        margin-bottom:20px;
      }

      .main-price{

        color:#22c55e;

        font-size:34px;

        font-weight:900;
      }

      .old-price{

        color:#94a3b8;

        text-decoration:line-through;

        font-size:22px;
      }

      .qty-row{

        display:flex;

        align-items:center;

        gap:16px;

        margin-bottom:20px;
      }

      .qty-btn{

        width:42px;
        height:42px;

        border:none;

        border-radius:12px;

        background:
        linear-gradient(
          135deg,
          #2563eb,
          #1d4ed8
        );

        color:white;

        font-size:24px;

        font-weight:700;

        cursor:pointer;

        transition:0.3s;
      }

      .qty-btn:hover{

        transform:scale(1.08);
      }

      .qty-num{

        font-size:22px;

        font-weight:700;

        color:#22c55e;
      }

      .remove-btn{

        border:none;

        background:none;

        color:#ef4444;

        font-size:16px;

        cursor:pointer;

        font-weight:600;
      }

      .remove-btn:hover{

        text-decoration:underline;
      }

      .item-total{

        font-size:34px;

        font-weight:900;

        color:#22c55e;
      }

      .summary{

        position:sticky;

        top:100px;

        padding:34px;

        border-radius:30px;
      }

      .summary-top{

        display:flex;

        gap:10px;

        margin-bottom:24px;
      }

      .circle{

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

      .summary h2{

        font-size:42px;

        font-weight:900;

        margin-bottom:28px;
      }

      .summary-row{

        display:flex;

        justify-content:space-between;

        margin-bottom:18px;

        color:#cbd5e1;

        font-size:18px;
      }

      .free{

        color:#22c55e;

        font-weight:700;
      }

      hr{

        border:none;

        height:1px;

        background:
        rgba(255,255,255,0.1);

        margin:24px 0;
      }

      .final-row{

        display:flex;

        justify-content:space-between;

        align-items:center;

        font-size:30px;

        font-weight:900;

        margin-bottom:28px;
      }

      .checkout-btn{

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

        transition:0.3s;
      }

      .checkout-btn:hover{

        transform:
        translateY(-4px);

        box-shadow:
        0 20px 40px rgba(37,99,235,0.35);
      }

      .empty-cart{

        padding:60px;

        border-radius:28px;

        text-align:center;
      }

      .empty-cart h2{

        font-size:42px;

        margin-bottom:14px;
      }

      .empty-cart p{

        color:#cbd5e1;

        margin-bottom:28px;
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

        font-weight:700;

        cursor:pointer;
      }

      @media(max-width:1100px){

        .cart-container{

          grid-template-columns:1fr;
        }

        .summary{

          position:static;
        }
      }

      @media(max-width:700px){

        .cart-page{

          padding-left:18px;
          padding-right:18px;
        }

        .cart-heading h1{

          font-size:46px;
        }

        .cart-card{

          flex-direction:column;

          align-items:flex-start;
        }

        .item-total{

          align-self:flex-end;
        }

        .summary h2{

          font-size:34px;
        }
      }

      `}</style>

    </div>
  );
};

export default Cart;