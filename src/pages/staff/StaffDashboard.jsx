import React, { useState, useEffect } from "react";

const StaffDashboard = () => {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [milk, setMilk] = useState("");
  const [milkList, setMilkList] = useState([]);
  const [productionList, setProductionList] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    milkUsed: ""
  });

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchMilk = async () => {
    const res = await fetch("http://localhost:5000/api/staff/milk", {
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    setMilkList(data);
  };

  const fetchProduction = async () => {
    const res = await fetch("http://localhost:5000/api/staff/production", {
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    setProductionList(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchMilk();
    fetchProduction();
  }, []);

  const handleMilk = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/staff/milk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ quantity: milk })
    });

    setMilk("");
    fetchMilk();
  };

  const handleProduction = async (e) => {
    e.preventDefault();

    if (!form.productId) {
      alert("Select product first");
      return;
    }

    await fetch("http://localhost:5000/api/staff/production", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        productId: form.productId,
        quantity: form.quantity,
        milkUsed: form.milkUsed
      })
    });

    setForm({
      productId: "",
      quantity: "",
      milkUsed: ""
    });

    fetchProduction();
    fetchProducts();
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}><b>Staff Dashboard</b></h2>
      <hr />

      <div style={styles.grid}>

        <div style={styles.card}>
          <h4 style={styles.blue}><b>Add Milk</b></h4>

          <form onSubmit={handleMilk}>
            <input
              style={styles.input}
              placeholder="Milk in Liters"
              type="number"
              value={milk}
              onChange={(e) => setMilk(e.target.value)}
            />

            <button style={styles.btnBlue}>Add Milk</button>
          </form>

          <div style={styles.history}>
            <h6>Milk History</h6>

            {milkList.map((m) => (
              <div key={m._id} style={styles.item}>
                <b>{m.quantity} Liters</b>
                <br />
                <small>{new Date(m.date).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.card}>
          <h4 style={styles.green}><b>Add Production</b></h4>

          <form onSubmit={handleProduction}>

            <select
              style={styles.input}
              value={form.productId}
              onChange={(e) =>
                setForm({ ...form, productId: e.target.value })
              }
            >
              <option value="">Select Product</option>

              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              style={styles.input}
              placeholder="Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Milk Used"
              type="number"
              value={form.milkUsed}
              onChange={(e) =>
                setForm({ ...form, milkUsed: e.target.value })
              }
            />

            <button style={styles.btnGreen}>Add Production</button>
          </form>

          <div style={styles.history}>
            <h6>Production History</h6>

            {productionList.map((p) => (
              <div key={p._id} style={styles.item}>
                <b>{p.productName}</b>
                <br />
                Qty: {p.quantity} | Milk: {p.milkUsed}
                <br />
                <small>{new Date(p.date).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffDashboard;

const styles = {
  page: {
    background: "#f1f3f6",
    minHeight: "100vh",
    padding: "30px",
  },

  heading: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  btnBlue: {
    width: "100%",
    padding: "10px",
    background: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

  btnGreen: {
    width: "100%",
    padding: "10px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

  history: {
    marginTop: "15px",
    maxHeight: "200px",
    overflowY: "auto",
  },

  item: {
    background: "#fafafa",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "8px",
  },

  blue: { color: "#2874f0" },
  green: { color: "#2e7d32" },
};