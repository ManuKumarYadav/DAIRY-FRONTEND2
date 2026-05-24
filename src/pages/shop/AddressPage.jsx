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

    const saved =
      localStorage.getItem("address");

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

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

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

    localStorage.setItem(
      "address",
      JSON.stringify(form)
    );

    navigate("/payment");
  };

  return (

    <div className="address-page">

      <div className="bg-glow one"></div>
      <div className="bg-glow two"></div>

      <div className="address-container">

        {/* LEFT */}

        <div className="address-card glass">

          <span className="badge">
            📍 Delivery Details
          </span>

          <h1>
            Shipping
            <span> Address</span>
          </h1>

          <p className="subtext">
            Enter your delivery details for
            seamless premium dairy delivery.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
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
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="input half"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="input half"
            />

          </div>

          <button
            className="continue-btn"
            onClick={handleContinue}
          >
            Continue To Payment →
          </button>

        </div>

        {/* RIGHT */}

        <div className="preview glass">

          <div className="preview-top">

            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>

          </div>

          <h2>Address Preview</h2>

          <div className="preview-card">

            <h3>
              {form.name || "Your Name"}
            </h3>

            <p>
              {form.address ||
                "Street / Area"}
            </p>

            <p>
              {form.city || "City"} -
              {" "}
              {form.pincode || "000000"}
            </p>

            <span>
              📞{" "}
              {form.phone ||
                "Phone Number"}
            </span>

          </div>

          <div className="delivery-box">

            <h4>🚚 Fast Delivery</h4>

            <p>
              Fresh dairy products delivered
              within 30 minutes.
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

body{
  overflow-x:hidden;
}

/* ================= PAGE ================= */

.address-page{

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

/* ================= GLOW ================= */

.bg-glow{

  position:absolute;

  border-radius:50%;

  filter:blur(120px);

  opacity:0.25;

  z-index:0;
}

.bg-glow.one{

  width:350px;
  height:350px;

  background:#2563eb;

  top:-100px;
  left:-100px;
}

.bg-glow.two{

  width:400px;
  height:400px;

  background:#22c55e;

  right:-120px;
  bottom:-120px;
}

/* ================= CONTAINER ================= */

.address-container{

  position:relative;
  z-index:2;

  max-width:1400px;

  margin:auto;

  display:grid;

  grid-template-columns:1.5fr 1fr;

  gap:35px;

  align-items:start;
}

/* ================= GLASS ================= */

.glass{

  background:
  rgba(15,23,42,0.72);

  border:
  1px solid rgba(255,255,255,0.08);

  backdrop-filter:blur(20px);

  box-shadow:
  0 25px 60px rgba(0,0,0,0.45);
}

/* ================= ADDRESS CARD ================= */

.address-card{

  padding:45px;

  border-radius:32px;
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

  font-weight:600;

  margin-bottom:28px;

  font-size:15px;
}

.address-card h1{

  font-size:64px;

  line-height:1.05;

  margin-bottom:20px;

  font-weight:900;
}

.address-card h1 span{

  background:
  linear-gradient(
    135deg,
    #60a5fa,
    #22c55e
  );

  -webkit-background-clip:text;

  -webkit-text-fill-color:transparent;
}

.subtext{

  color:#cbd5e1;

  font-size:20px;

  line-height:1.8;

  margin-bottom:35px;

  max-width:700px;
}

/* ================= FORM ================= */

.row{

  display:flex;

  gap:18px;

  width:100%;
}

.half{

  flex:1;
}

.input,
.textarea{

  width:100%;

  padding:18px 20px;

  border:none;

  outline:none;

  border-radius:18px;

  margin-bottom:18px;

  background:
  rgba(255,255,255,0.08);

  border:
  1px solid rgba(255,255,255,0.05);

  color:white;

  font-size:17px;

  transition:0.3s;
}

.input:focus,
.textarea:focus{

  border:
  1px solid #22c55e;

  box-shadow:
  0 0 0 4px rgba(34,197,94,0.15);
}

.input::placeholder,
.textarea::placeholder{

  color:#94a3b8;
}

.textarea{

  height:130px;

  resize:none;
}

/* ================= BUTTON ================= */

.continue-btn{

  width:100%;

  padding:20px;

  border:none;

  border-radius:20px;

  margin-top:10px;

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

.continue-btn:hover{

  transform:
  translateY(-4px);

  box-shadow:
  0 20px 40px rgba(37,99,235,0.35);
}

/* ================= PREVIEW ================= */

.preview{

  padding:35px;

  border-radius:32px;

  height:fit-content;

  position:sticky;

  top:110px;
}

.preview-top{

  display:flex;

  gap:10px;

  margin-bottom:25px;
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

.preview h2{

  font-size:42px;

  margin-bottom:25px;

  font-weight:900;

  line-height:1.1;
}

/* ================= PREVIEW CARD ================= */

.preview-card{

  padding:28px;

  border-radius:24px;

  background:
  rgba(255,255,255,0.05);

  border:
  1px solid rgba(255,255,255,0.06);

  line-height:1.8;

  margin-bottom:28px;
}

.preview-card h3{

  font-size:26px;

  margin-bottom:12px;
}

.preview-card p{

  color:#cbd5e1;

  word-break:break-word;
}

.preview-card span{

  display:block;

  margin-top:16px;

  color:#22c55e;

  font-weight:700;
}

/* ================= DELIVERY BOX ================= */

.delivery-box{

  padding:24px;

  border-radius:22px;

  background:
  linear-gradient(
    135deg,
    rgba(37,99,235,0.14),
    rgba(34,197,94,0.12)
  );
}

.delivery-box h4{

  font-size:24px;

  margin-bottom:12px;
}

.delivery-box p{

  color:#cbd5e1;

  line-height:1.7;
}

/* ========================================================= */
/* ===================== TABLET ============================ */
/* ========================================================= */

@media(max-width:1100px){

  .address-container{

    grid-template-columns:1fr;

    gap:28px;
  }

  .preview{

    position:static;
  }

  .address-card h1{

    font-size:52px;
  }
}

/* ========================================================= */
/* ===================== MOBILE ============================ */
/* ========================================================= */

@media(max-width:768px){

  .address-page{

    padding-top:105px;

    padding-left:16px;

    padding-right:16px;

    padding-bottom:30px;
  }

  .address-card{

    padding:24px;

    border-radius:26px;
  }

  .preview{

    padding:24px;

    border-radius:26px;
  }

  .address-card h1{

    font-size:42px;

    line-height:1.1;
  }

  .subtext{

    font-size:16px;

    line-height:1.7;
  }

  .preview h2{

    font-size:34px;
  }

  .row{

    flex-direction:column;

    gap:0;
  }

  .input,
  .textarea{

    padding:16px;

    font-size:15px;

    border-radius:16px;
  }

  .continue-btn{

    padding:18px;

    font-size:17px;

    border-radius:18px;
  }

  .preview-card{

    padding:22px;
  }

  .preview-card h3{

    font-size:22px;
  }

  .delivery-box{

    padding:20px;
  }

  .delivery-box h4{

    font-size:20px;
  }
}

/* ========================================================= */
/* ===================== SMALL MOBILE ====================== */
/* ========================================================= */

@media(max-width:480px){

  .address-card h1{

    font-size:34px;
  }

  .preview h2{

    font-size:28px;
  }

  .badge{

    width:100%;

    text-align:center;

    font-size:14px;
  }

  .subtext{

    font-size:15px;
  }

  .preview-card h3{

    font-size:20px;
  }

  .delivery-box h4{

    font-size:18px;
  }
}

`}</style>

    </div>
  );
};

export default AddressPage;