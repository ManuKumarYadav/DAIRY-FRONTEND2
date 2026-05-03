import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [products, setProducts] = useState([]);

  const [farmerForm, setFarmerForm] = useState({ name: "", village: "" });
  const [staffForm, setStaffForm] = useState({ name: "", email: "", password: "" });

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
          headers: { Authorization: "Bearer " + token }
        }),
        fetch("https://dairy-backend4.onrender.com/api/users/staff", {
          headers: { Authorization: "Bearer " + token }
        }),
        fetch("https://dairy-backend4.onrender.com/api/products")
      ]);

      setFarmers(await fRes.json());
      setStaff(await sRes.json());

const productData = await pRes.json();

console.log("Products API:", productData);

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
//formData.append("stock", productForm.stock);
formData.append("image", productForm.image);

    await fetch("https://dairy-backend4.onrender.com/api/products", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData
    });
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

    await fetch("https://dairy-backend4.onrender.com/api/users/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(staffForm)
    });

    setStaffForm({ name: "", email: "", password: "" });
    fetchAll();
  };

  const addFarmer = async (e) => {
    e.preventDefault();

    await fetch("https://dairy-backend4.onrender.com/api/farmers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(farmerForm)
    });

    setFarmerForm({ name: "", village: "" });
    fetchAll();
  };

  const deleteProduct = async (id) => {
    await fetch(`https://dairy-backend4.onrender.com/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });
    fetchAll();
  };

  const deleteFarmer = async (id) => {
    await fetch(`https://dairy-backend4.onrender.com/api/farmers/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });
    fetchAll();
  };

  const deleteStaff = async (id) => {
    await fetch(`https://dairy-backend4.onrender.com/api/users/staff/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });
    fetchAll();
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button style={styles.orderBtn} onClick={() => navigate("/admin/orders")}>
          Orders
        </button>
      </div>

      <div style={styles.grid}>

        <form onSubmit={addProduct} style={styles.card}>
          <h4>Add Product</h4>

          <input style={styles.input} placeholder="Name"
            value={productForm.name}
            onChange={(e)=>setProductForm({...productForm,name:e.target.value})}/>

          <input style={styles.input} placeholder="Price"
            value={productForm.price}
            onChange={(e)=>setProductForm({...productForm,price:e.target.value})}/>

          <input style={styles.input} placeholder="Original Price"
            value={productForm.originalPrice}
            onChange={(e)=>setProductForm({...productForm,originalPrice:e.target.value})}/>

          <input style={styles.input} placeholder="Discount"
            value={productForm.discount}
            onChange={(e)=>setProductForm({...productForm,discount:e.target.value})}/>

            {/* <input
  style={styles.input}
  placeholder="Stock"
  value={productForm.stock}
  onChange={(e)=>
    setProductForm({...productForm, stock: e.target.value})
  }
/> */}

          <input type="file" style={styles.input}
            onChange={(e)=>setProductForm({...productForm,image:e.target.files[0]})}/>

          <button style={styles.greenBtn}>Add</button>
        </form>

        <form onSubmit={addStaff} style={styles.card}>
          <h4>Add Staff</h4>

          <input style={styles.input} placeholder="Name"
            value={staffForm.name}
            onChange={(e)=>setStaffForm({...staffForm,name:e.target.value})}/>

          <input style={styles.input} placeholder="Email"
            value={staffForm.email}
            onChange={(e)=>setStaffForm({...staffForm,email:e.target.value})}/>

          <input style={styles.input} type="password" placeholder="Password"
            value={staffForm.password}
            onChange={(e)=>setStaffForm({...staffForm,password:e.target.value})}/>

          <button style={styles.yellowBtn}>Add</button>
        </form>

        <form onSubmit={addFarmer} style={styles.card}>
          <h4>Add Farmer</h4>

          <input style={styles.input} placeholder="Name"
            value={farmerForm.name}
            onChange={(e)=>setFarmerForm({...farmerForm,name:e.target.value})}/>

          <input style={styles.input} placeholder="Village"
            value={farmerForm.village}
            onChange={(e)=>setFarmerForm({...farmerForm,village:e.target.value})}/>

          <button style={styles.blueBtn}>Add</button>
        </form>
      </div>

      <h4 style={styles.section}>Products</h4>
      <div style={styles.productGrid}>
        {products.map(p => (
          <div key={p._id} style={styles.productCard}>

            {p.image && (
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
                style={styles.image}
                onError={(e)=>{
                  e.target.src="https://via.placeholder.com/150";
                }}
              />
            )}

            <h6>{p.name}</h6>
            <p>₹{p.price}</p>
            <p style={{color:"green"}}>Stock: {p.stock}</p>

            <button style={styles.deleteBtn}
              onClick={()=>deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <h4 style={styles.section}>Farmers</h4>
      {farmers.map(f => (
        <div key={f._id} style={styles.list}>
          <span>{f.name} - {f.village}</span>
          <button style={styles.deleteSmall}
            onClick={()=>deleteFarmer(f._id)}>Delete</button>
        </div>
      ))}

      <h4 style={styles.section}>Staff</h4>
      {staff.map(s => (
        <div key={s._id} style={styles.list}>
          <span>{s.name} - {s.email}</span>
          <button style={styles.deleteSmall}
            onClick={()=>deleteStaff(s._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
};

export default AdminDashboard;

const styles = {
  page: {
    background: "#f1f3f6",
    minHeight: "100vh",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  orderBtn: {
    background: "#2874f0",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    outline: "none",
  },

  greenBtn: {
    background: "#388e3c",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
  },

  yellowBtn: {
    background: "#fb8c00",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
  },

  blueBtn: {
    background: "#2874f0",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    width: "100%",
    cursor: "pointer",
  },

  section: {
    marginTop: "30px",
    marginBottom: "10px",
    fontWeight: "600",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: "20px",
  },

  productCard: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  deleteBtn: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "5px",
  },

  list: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    background: "#ffffff",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  deleteSmall: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "5px 8px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
