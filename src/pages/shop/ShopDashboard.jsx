import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopDashboard = ({ setCart }) => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {

    try {

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products`
      );

      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
      cart.find((item) => item._id === product._id);

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    if (setCart) setCart(cart);

    alert(product.name + " added to Cart");
  };

  return (
    <div style={styles.page}>

      {/* TOP */}

      <div style={styles.topSection}>

        <div>

          <h1 style={styles.heading}>
            Premium Dairy Products
          </h1>

          <p style={styles.subtitle}>
            Fresh farm products delivered directly
            to your doorstep everyday.
          </p>

        </div>

      </div>

      {/* PRODUCTS */}

      <div style={styles.grid}>

        {products.length === 0 ? (

          <h2 style={{ color: "white" }}>
            No Products Available
          </h2>

        ) : (

          products.map((p) => (

            <div
              key={p._id}
              style={styles.card}
            >

              {/* IMAGE */}

              <div style={styles.imageBox}>

                <img
                  src={
                    p.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={p.name}
                  style={styles.image}
                />

                {p.discount > 0 && (

                  <div style={styles.discount}>
                    {p.discount}% OFF
                  </div>
                )}
              </div>

              {/* DETAILS */}

              <div style={styles.details}>

                <h2 style={styles.name}>
                  {p.name}
                </h2>

                <div style={styles.priceRow}>

                  <span style={styles.price}>
                    ₹{p.price}
                  </span>

                  {p.originalPrice && (

                    <span style={styles.oldPrice}>
                      ₹{p.originalPrice}
                    </span>
                  )}
                </div>

                <p style={styles.stock}>
                  {p.stock === 0
                    ? "Out of Stock"
                    : `Stock: ${p.stock}`}
                </p>

                {/* BUTTONS */}

                <div style={styles.btnRow}>

                  <button
                    style={{
                      ...styles.cartBtn,
                      opacity:
                        p.stock === 0 ? 0.5 : 1,
                    }}
                    disabled={p.stock === 0}
                    onClick={() => addToCart(p)}
                  >
                    Add To Cart
                  </button>

                  <button
                    style={styles.buyBtn}
                    onClick={() =>
                      navigate("/cart")
                    }
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopDashboard;


const styles = {

  /* ================= PAGE ================= */

  page: {

    minHeight: "100vh",

    paddingTop:
      window.innerWidth < 768 ? "105px" : "120px",

    paddingLeft:
      window.innerWidth < 768 ? "16px" : "40px",

    paddingRight:
      window.innerWidth < 768 ? "16px" : "40px",

    paddingBottom: "40px",

    background:
    `
    radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 25%),
    radial-gradient(circle at bottom right, rgba(34,197,94,0.12), transparent 25%),
    linear-gradient(135deg,#0f172a,#111827,#020617)
    `,

    backgroundAttachment:"fixed",

    overflowX:"hidden",
  },

  /* ================= TOP ================= */

  topSection: {

    display: "flex",

    justifyContent: "space-between",

    alignItems:
      window.innerWidth < 900
        ? "flex-start"
        : "center",

    flexDirection:
      window.innerWidth < 900
        ? "column"
        : "row",

    gap: "20px",

    marginBottom:
      window.innerWidth < 768
        ? "30px"
        : "40px",
  },

  heading: {

    fontSize:
      window.innerWidth < 480
        ? "34px"
        : window.innerWidth < 768
        ? "42px"
        : "52px",

    fontWeight: "900",

    lineHeight: "1.1",

    color: "white",

    marginBottom: "10px",
  },

  subtitle: {

    color: "#94a3b8",

    fontSize:
      window.innerWidth < 768
        ? "15px"
        : "20px",

    maxWidth: "700px",

    lineHeight: "1.7",
  },

  /* ================= GRID ================= */

  grid: {

    display: "grid",

    gridTemplateColumns:
      window.innerWidth < 600
        ? "1fr"
        : "repeat(auto-fill,minmax(280px,1fr))",

    gap:
      window.innerWidth < 768
        ? "20px"
        : "30px",
  },

  /* ================= CARD ================= */

  card: {

    background:
      "rgba(15,23,42,0.85)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    borderRadius:
      window.innerWidth < 768
        ? "22px"
        : "28px",

    overflow: "hidden",

    transition: "0.35s",

    backdropFilter: "blur(20px)",

    boxShadow:
      "0 15px 40px rgba(0,0,0,0.35)",
  },

  /* ================= IMAGE ================= */

  imageBox: {

    position: "relative",

    height:
      window.innerWidth < 480
        ? "220px"
        : "260px",

    overflow: "hidden",
  },

  image: {

    width: "100%",
    height: "100%",

    objectFit: "cover",

    transition: "0.4s",
  },

  discount: {

    position: "absolute",

    top: "15px",
    left: "15px",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "white",

    padding:
      window.innerWidth < 480
        ? "6px 12px"
        : "8px 14px",

    borderRadius: "12px",

    fontSize:
      window.innerWidth < 480
        ? "11px"
        : "13px",

    fontWeight: "700",
  },

  /* ================= DETAILS ================= */

  details: {

    padding:
      window.innerWidth < 768
        ? "18px"
        : "24px",
  },

  name: {

    color: "white",

    fontSize:
      window.innerWidth < 480
        ? "24px"
        : "28px",

    fontWeight: "800",

    marginBottom: "14px",

    wordBreak: "break-word",
  },

  priceRow: {

    display: "flex",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "14px",

    marginBottom: "10px",
  },

  price: {

    color: "#22c55e",

    fontSize:
      window.innerWidth < 480
        ? "26px"
        : "30px",

    fontWeight: "800",
  },

  oldPrice: {

    color: "#94a3b8",

    fontSize:
      window.innerWidth < 480
        ? "15px"
        : "18px",

    textDecoration: "line-through",
  },

  stock: {

    color: "#cbd5e1",

    fontSize:
      window.innerWidth < 480
        ? "14px"
        : "16px",

    marginBottom: "20px",
  },

  /* ================= BUTTONS ================= */

  btnRow: {

    display: "flex",

    flexDirection:
      window.innerWidth < 480
        ? "column"
        : "row",

    gap: "15px",
  },

  cartBtn: {

    flex: 1,

    border: "none",

    padding:
      window.innerWidth < 480
        ? "13px"
        : "14px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#f59e0b,#f97316)",

    color: "white",

    fontSize:
      window.innerWidth < 480
        ? "14px"
        : "16px",

    fontWeight: "700",

    cursor: "pointer",
  },

  buyBtn: {

    flex: 1,

    border: "none",

    padding:
      window.innerWidth < 480
        ? "13px"
        : "14px",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#2563eb,#22c55e)",

    color: "white",

    fontSize:
      window.innerWidth < 480
        ? "14px"
        : "16px",

    fontWeight: "700",

    cursor: "pointer",
  },
};
