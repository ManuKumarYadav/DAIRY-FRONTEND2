import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("address");

    if (saved && saved !== "undefined") {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) setForm(parsed);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    localStorage.setItem("address", JSON.stringify(form));
    navigate("/payment");
  };

  return (
    <div className="page">
      <div className="container">

        <div className="card glass">
          <h2 className="heading"><b>Delivery Address</b></h2>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="address"
            placeholder="Street / Area"
            value={form.address}
            onChange={handleChange}
            className="textarea"
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="inputHalf"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="inputHalf"
            />
          </div>

          <button className="btn" onClick={handleContinue}>
            Continue to Payment →
          </button>
        </div>

        <div className="preview glass">
          <h3><b>Delivery Preview</b></h3>

          <div className="previewCard">
            <p className="name">{form.name || "Your Name"}</p>
            <p>{form.address || "Street / Area"}</p>
            <p>
              {form.city || "City"} - {form.pincode || "000000"}
            </p>
            <p className="phone">
              Phone No: {form.phone || "Phone Number"}
            </p>
          </div>
        </div>

      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;

          background: linear-gradient(135deg, #020617, #0f172a);
          color: #fff;
        }

        .container {
          display: flex;
          gap: 30px;
          width: 100%;
          max-width: 1000px;
        }

        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .card {
          flex: 1;
          padding: 25px;
          border-radius: 16px;
        }

        .heading {
          margin-bottom: 20px;
          color: #22c55e;
        }

        .input,
        .textarea,
        .inputHalf {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 10px;
          border: none;
          outline: none;

          background: rgba(255,255,255,0.1);
          color: #fff;

          transition: 0.3s;
        }

        .input::placeholder,
        .textarea::placeholder {
          color: rgba(255,255,255,0.6);
        }

        .input:focus,
        .textarea:focus {
          box-shadow: 0 0 0 2px #22c55e;
        }

        .textarea {
          height: 80px;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .inputHalf {
          flex: 1;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          margin-top: 10px;

          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          font-weight: 600;

          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(34,197,94,0.4);
        }

        .preview {
          width: 300px;
          padding: 20px;
          border-radius: 16px;
        }

        .previewCard {
          margin-top: 10px;
          background: rgba(255,255,255,0.08);
          padding: 15px;
          border-radius: 12px;
          line-height: 1.6;
        }

        .name {
          font-weight: bold;
          font-size: 16px;
        }

        .phone {
          margin-top: 10px;
          color: #22c55e;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .preview {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddressPage;