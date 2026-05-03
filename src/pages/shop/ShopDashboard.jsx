import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopDashboard = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch Error:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

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

    localStorage.setItem("cart", JSON.stringify(cart));
    if (setCart) setCart(cart);

    alert(product.name + " added to Cart");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}> <b>Shop Products</b></h2>
      <hr/>

      <div style={styles.grid}>
        {products.length === 0 ? (
          <h4>No products Available</h4>
        ) : (
          products.map((p) => (
            <div key={p._id} style={styles.card}>

              <div style={styles.imgWrapper}>
                <img
                  src={p.image || "https://via.placeholder.com/200"}
                      alt={p.name}
                       style={styles.image}
                     />

                {p.discount > 0 && (
                  <span style={styles.badge}>
                    {p.discount}% OFF
                  </span>
                )}
              </div>

              <div style={styles.details}>
                <h6 style={styles.name}>{p.name}</h6>

                <div style={styles.priceRow}>
                  <span style={styles.price}>₹{p.price}</span>
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

                <div style={styles.btnRow}>
                  <button
                    style={{
                      ...styles.cartBtn,
                      background: p.stock === 0 ? "#ccc" : "#ff9f00",
                      cursor: p.stock === 0 ? "not-allowed" : "pointer",
                    }}
                    disabled={p.stock === 0}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>

                  <button
                    style={styles.goBtn}
                    onClick={() => navigate("/cart")}
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
}
export default ShopDashboard;

const styles = {
  page: {
    background: "#f1f3f6",
    minHeight: "100vh",
    padding: "20px",
  },

  heading: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "0.3s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  imgWrapper: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.3s",
  },

  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#388e3c",
    color: "#fff",
    padding: "4px 8px",
    fontSize: "12px",
    borderRadius: "4px",
  },

  details: {
    padding: "10px",
  },

  name: {
    fontWeight: "bold",
    marginBottom: "5px",
  },

  priceRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  price: {
    fontSize: "16px",
    fontWeight: "bold",
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#888",
    fontSize: "14px",
  },

  stock: {
    fontSize: "13px",
    color: "#555",
    margin: "5px 0",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  cartBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    color: "#fff",
    borderRadius: "5px",
    fontWeight: "bold",
  },

  goBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    background: "#2874f0",
    color: "#fff",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};
