import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [products, setProducts] = useState([]);

  const [farmerForm, setFarmerForm] = useState({
    name: "",
    village: ""
  });

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    image: null
  });

  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    try {
      const [fRes, sRes, pRes] = await Promise.all([
        fetch("https://dairy-backend4.onrender.com/api/farmers", {
          headers: {
            Authorization: "Bearer " + token
          }
        }),

        fetch("https://dairy-backend4.onrender.com/api/users/staff", {
          headers: {
            Authorization: "Bearer " + token
          }
        }),

        fetch("https://dairy-backend4.onrender.com/api/products")
      ]);

      setFarmers(await fRes.json());
      setStaff(await sRes.json());

      const productData = await pRes.json();

      setProducts(
        Array.isArray(productData)
          ? productData
          : productData.products || []
      );

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", productForm.name);
    formData.append("price", productForm.price);
    formData.append("originalPrice", productForm.originalPrice);
    formData.append("discount", productForm.discount);
    formData.append("image", productForm.image);

    await fetch(
      "https://dairy-backend4.onrender.com/api/products",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        },
        body: formData
      }
    );

    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      discount: "",
      image: null
    });

    fetchAll();
  };

  const addStaff = async (e) => {
    e.preventDefault();

    await fetch(
      "https://dairy-backend4.onrender.com/api/users/staff",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },

        body: JSON.stringify(staffForm)
      }
    );

    setStaffForm({
      name: "",
      email: "",
      password: ""
    });

    fetchAll();
  };

  const addFarmer = async (e) => {
    e.preventDefault();

    await fetch(
      "https://dairy-backend4.onrender.com/api/farmers",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },

        body: JSON.stringify(farmerForm)
      }
    );

    setFarmerForm({
      name: "",
      village: ""
    });

    fetchAll();
  };

  const deleteProduct = async (id) => {
    await fetch(
      `https://dairy-backend4.onrender.com/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchAll();
  };

  const deleteFarmer = async (id) => {
    await fetch(
      `https://dairy-backend4.onrender.com/api/farmers/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchAll();
  };

  const deleteStaff = async (id) => {
    await fetch(
      `https://dairy-backend4.onrender.com/api/users/staff/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchAll();
  };

  return (
    <div style={styles.page}>

      <div style={styles.overlay}></div>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            DairyNest Admin
          </h1>

          <p style={styles.subtitle}>
            Manage products, staff and farmers
          </p>
        </div>

        <button
          style={styles.orderBtn}
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          View Orders
        </button>
      </div>

      {/* FORMS */}

      <div style={styles.grid}>

        {/* PRODUCT */}

        <form
          onSubmit={addProduct}
          style={styles.card}
        >
          <h2 style={styles.cardTitle}>
            Add Product
          </h2>

          <input
            style={styles.input}
            placeholder="Product Name"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                name: e.target.value
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Price"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                price: e.target.value
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Original Price"
            value={productForm.originalPrice}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                originalPrice: e.target.value
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Discount"
            value={productForm.discount}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                discount: e.target.value
              })
            }
          />

          <input
            type="file"
            style={styles.input}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                image: e.target.files[0]
              })
            }
          />

          <button style={styles.greenBtn}>
            Add Product
          </button>
        </form>

        {/* STAFF */}

        <form
          onSubmit={addStaff}
          style={styles.card}
        >
          <h2 style={styles.cardTitle}>
            Add Staff
          </h2>

          <input
            style={styles.input}
            placeholder="Staff Name"
            value={staffForm.name}
            onChange={(e) =>
              setStaffForm({
                ...staffForm,
                name: e.target.value
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Email"
            value={staffForm.email}
            onChange={(e) =>
              setStaffForm({
                ...staffForm,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            value={staffForm.password}
            onChange={(e) =>
              setStaffForm({
                ...staffForm,
                password: e.target.value
              })
            }
          />

          <button style={styles.yellowBtn}>
            Add Staff
          </button>
        </form>

        {/* FARMER */}

        <form
          onSubmit={addFarmer}
          style={styles.card}
        >
          <h2 style={styles.cardTitle}>
            Add Farmer
          </h2>

          <input
            style={styles.input}
            placeholder="Farmer Name"
            value={farmerForm.name}
            onChange={(e) =>
              setFarmerForm({
                ...farmerForm,
                name: e.target.value
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Village"
            value={farmerForm.village}
            onChange={(e) =>
              setFarmerForm({
                ...farmerForm,
                village: e.target.value
              })
            }
          />

          <button style={styles.blueBtn}>
            Add Farmer
          </button>
        </form>

      </div>

      {/* PRODUCTS */}

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>
          Dairy Products
        </h2>

        <p style={styles.sectionSubtitle}>
          Manage all available dairy products
        </p>
      </div>

      <div style={styles.productGrid}>

        {products.map((p) => (

          <div
            key={p._id}
            style={styles.productCard}
          >

            <div style={styles.imageBox}>

              <img
                src={
                  p.image ||
                  "https://via.placeholder.com/150"
                }
                alt={p.name}
                style={styles.image}
              />

              <div style={styles.discountBadge}>
                {p.discount || 0}% OFF
              </div>

            </div>

            <h3 style={styles.productName}>
              {p.name}
            </h3>

            <div style={styles.priceRow}>
              <span style={styles.price}>
                ₹{p.price}
              </span>

              <span style={styles.oldPrice}>
                ₹{p.originalPrice}
              </span>
            </div>

            <p style={styles.stock}>
              Stock: {p.stock || 0}
            </p>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                deleteProduct(p._id)
              }
            >
              Delete Product
            </button>

          </div>
        ))}

      </div>

      {/* FARMERS */}

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>
          Farmers
        </h2>

        <p style={styles.sectionSubtitle}>
          Trusted farm partners
        </p>
      </div>

      <div style={styles.peopleGrid}>

        {farmers.map((f) => (

          <div
            key={f._id}
            style={styles.peopleCard}
          >

            <div style={styles.avatarGreen}>
              {f.name?.charAt(0)}
            </div>

            <div>

              <h3 style={styles.peopleName}>
                {f.name}
              </h3>

              <p style={styles.peopleInfo}>
                📍 {f.village}
              </p>

            </div>

            <button
              style={styles.deleteSmall}
              onClick={() =>
                deleteFarmer(f._id)
              }
            >
              Delete
            </button>

          </div>
        ))}

      </div>

      {/* STAFF */}

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>
          Staff Members
        </h2>

        <p style={styles.sectionSubtitle}>
          DairyNest management team
        </p>
      </div>

      <div style={styles.peopleGrid}>

        {staff.map((s) => (

          <div
            key={s._id}
            style={styles.peopleCard}
          >

            <div style={styles.avatarBlue}>
              {s.name?.charAt(0)}
            </div>

            <div>

              <h3 style={styles.peopleName}>
                {s.name}
              </h3>

              <p style={styles.peopleInfo}>
                ✉ {s.email}
              </p>

            </div>

            <button
              style={styles.deleteSmall}
              onClick={() =>
                deleteStaff(s._id)
              }
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminDashboard;

const styles = {

  /* ================= PAGE ================= */

  page: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg,#020617,#081229,#020617)",

    paddingTop: "120px",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "40px",

    position: "relative",

    overflowX: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,

    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(34,197,94,0.18), transparent 35%)",
  },

  /* ================= HEADER ================= */

  header: {
    position: "relative",
    zIndex: 2,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    flexWrap: "wrap",

    gap: "20px",

    marginBottom: "40px",
  },

  title: {
    fontSize: "clamp(34px, 6vw, 58px)",

    color: "#fff",

    fontWeight: "900",

    lineHeight: "1.1",
  },

  subtitle: {
    color: "#94a3b8",

    fontSize: "clamp(15px,2vw,18px)",

    marginTop: "10px",

    maxWidth: "650px",

    lineHeight: "1.6",
  },

  orderBtn: {
    border: "none",

    padding: "15px 28px",

    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#2563eb,#22c55e)",

    color: "#fff",

    fontSize: "17px",
    fontWeight: "700",

    cursor: "pointer",

    whiteSpace: "nowrap",

    boxShadow:
      "0 10px 30px rgba(37,99,235,0.35)",
  },

  /* ================= GRID ================= */

  grid: {
    position: "relative",
    zIndex: 2,

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",

    gap: "25px",
  },

  /* ================= CARD ================= */

  card: {
    background:
      "rgba(15,23,42,0.82)",

    padding: "28px",

    borderRadius: "28px",

    border:
      "1px solid rgba(255,255,255,0.06)",

    backdropFilter: "blur(20px)",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.35)",
  },

  cardTitle: {
    color: "#fff",

    marginBottom: "22px",

    fontSize: "28px",

    fontWeight: "800",
  },

  input: {
    width: "100%",

    padding: "16px",

    marginBottom: "16px",

    borderRadius: "14px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.05)",

    color: "#fff",

    outline: "none",

    fontSize: "16px",

    boxSizing: "border-box",
  },

  /* ================= BUTTONS ================= */

  greenBtn: {
    width: "100%",

    padding: "16px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "#fff",

    fontSize: "17px",

    fontWeight: "700",

    cursor: "pointer",
  },

  yellowBtn: {
    width: "100%",

    padding: "16px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#f59e0b,#ea580c)",

    color: "#fff",

    fontSize: "17px",

    fontWeight: "700",

    cursor: "pointer",
  },

  blueBtn: {
    width: "100%",

    padding: "16px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",

    color: "#fff",

    fontSize: "17px",

    fontWeight: "700",

    cursor: "pointer",
  },

  /* ================= SECTION ================= */

  sectionHeader: {
    position: "relative",
    zIndex: 2,

    marginTop: "70px",

    marginBottom: "25px",
  },

  sectionTitle: {
    color: "#fff",

    fontSize: "clamp(32px,5vw,48px)",

    fontWeight: "900",

    marginBottom: "10px",
  },

  sectionSubtitle: {
    color: "#94a3b8",

    fontSize: "17px",
  },

  /* ================= PRODUCTS ================= */

  productGrid: {
    position: "relative",
    zIndex: 2,

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",

    gap: "24px",
  },

  productCard: {
    background:
      "rgba(15,23,42,0.82)",

    borderRadius: "28px",

    overflow: "hidden",

    border:
      "1px solid rgba(255,255,255,0.06)",

    backdropFilter: "blur(18px)",

    boxShadow:
      "0 15px 35px rgba(0,0,0,0.35)",

    transition: "0.3s",
  },

  imageBox: {
    position: "relative",

    height: "240px",

    background: "#fff",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  discountBadge: {
    position: "absolute",

    top: "15px",
    left: "15px",

    padding: "8px 14px",

    borderRadius: "12px",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "#fff",

    fontWeight: "700",

    fontSize: "14px",
  },

  productName: {
    color: "#fff",

    fontSize: "30px",

    fontWeight: "800",

    padding: "20px 20px 10px",
  },

  priceRow: {
    display: "flex",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "12px",

    padding: "0 20px",
  },

  price: {
    color: "#22c55e",

    fontSize: "36px",

    fontWeight: "900",
  },

  oldPrice: {
    color: "#94a3b8",

    textDecoration: "line-through",

    fontSize: "20px",
  },

  stock: {
    color: "#cbd5e1",

    padding: "12px 20px",

    fontSize: "17px",
  },

  deleteBtn: {
    margin: "20px",

    width: "calc(100% - 40px)",

    padding: "15px",

    border: "none",

    borderRadius: "16px",

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "#fff",

    fontSize: "16px",

    fontWeight: "700",

    cursor: "pointer",
  },

  /* ================= PEOPLE ================= */

  peopleGrid: {
    position: "relative",
    zIndex: 2,

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",

    gap: "24px",
  },

  peopleCard: {
    display: "flex",

    alignItems: "center",

    justifyContent: "space-between",

    flexWrap: "wrap",

    gap: "18px",

    padding: "24px",

    borderRadius: "24px",

    background:
      "rgba(15,23,42,0.82)",

    border:
      "1px solid rgba(255,255,255,0.06)",

    backdropFilter: "blur(18px)",

    boxShadow:
      "0 12px 30px rgba(0,0,0,0.35)",
  },

  avatarGreen: {
    width: "70px",
    height: "70px",

    borderRadius: "50%",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "28px",

    fontWeight: "900",

    color: "#fff",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
  },

  avatarBlue: {
    width: "70px",
    height: "70px",

    borderRadius: "50%",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "28px",

    fontWeight: "900",

    color: "#fff",

    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",
  },

  peopleName: {
    color: "#fff",

    fontSize: "24px",

    fontWeight: "800",

    marginBottom: "8px",
  },

  peopleInfo: {
    color: "#94a3b8",

    fontSize: "15px",

    lineHeight: "1.6",
  },

  deleteSmall: {
    border: "none",

    padding: "12px 18px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: "700",

    color: "#fff",

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",
  },
};
