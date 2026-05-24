import React, {
  useState,
  useEffect,
} from "react";

const StaffDashboard = () => {

  const token =
    localStorage.getItem("token");

  const [products, setProducts] =
    useState([]);

  const [milk, setMilk] =
    useState("");

  const [milkList, setMilkList] =
    useState([]);

  const [
    productionList,
    setProductionList,
  ] = useState([]);

  const [form, setForm] =
    useState({
      productId: "",
      quantity: "",
      milkUsed: "",
    });

  const fetchProducts = async () => {

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/products`
    );

    const data = await res.json();

    setProducts(data);
  };

  const fetchMilk = async () => {

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/staff/milk`,
      {
        headers: {
          Authorization:
            "Bearer " + token,
        },
      }
    );

    const data = await res.json();

    setMilkList(data);
  };

  const fetchProduction = async () => {

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/staff/production`,
      {
        headers: {
          Authorization:
            "Bearer " + token,
        },
      }
    );

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

    await fetch(
      `${process.env.REACT_APP_API_URL}/api/staff/milk`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            "Bearer " + token,
        },

        body: JSON.stringify({
          quantity: milk,
        }),
      }
    );

    setMilk("");

    fetchMilk();
  };

  const handleProduction =
    async (e) => {

      e.preventDefault();

      if (!form.productId) {

        alert(
          "Select product first"
        );

        return;
      }

      await fetch(
        `${process.env.REACT_APP_API_URL}/api/staff/production`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              "Bearer " + token,
          },

          body: JSON.stringify({
            productId:
              form.productId,

            quantity:
              form.quantity,

            milkUsed:
              form.milkUsed,
          }),
        }
      );

      setForm({
        productId: "",
        quantity: "",
        milkUsed: "",
      });

      fetchProduction();
      fetchProducts();
    };

  return (

    <div className="staff-page">

      <div className="bg one"></div>
      <div className="bg two"></div>

      <div className="staff-container">

        {/* HEADER */}

        <div className="header">

          <span className="badge">
            🧑‍🏭 DairyNest Staff Panel
          </span>

          <h1>
            Production
            <span> Dashboard</span>
          </h1>

          <p>
            Manage milk inventory and
            production operations in
            real-time.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card glass">

            <h2>
              {milkList.length}
            </h2>

            <p>
              Milk Entries
            </p>

          </div>

          <div className="stat-card glass">

            <h2>
              {productionList.length}
            </h2>

            <p>
              Productions
            </p>

          </div>

          <div className="stat-card glass">

            <h2>
              {products.length}
            </h2>

            <p>
              Products
            </p>

          </div>

        </div>

        <div className="main-grid">

          <div className="glass panel">

            <div className="top">

              <h2>
               Add Milk
              </h2>

            </div>

            <form
              onSubmit={handleMilk}
            >

              <input
                type="number"
                placeholder="Milk in Liters"
                value={milk}
                onChange={(e) =>
                  setMilk(
                    e.target.value
                  )
                }
                className="input"
              />

              <button
                className="blue-btn"
              >
                Add Milk
              </button>

            </form>

            <div className="history">

              <h3>
                Milk History
              </h3>

              {
                milkList.map((m) => (

                  <div
                    key={m._id}
                    className="history-card"
                  >

                    <div>

                      <h4>
                        {m.quantity}
                        {" "}
                        Liters
                      </h4>

                      <span>
                        Fresh Milk Entry
                      </span>

                    </div>

                    <small>
                      {
                        new Date(
                          m.date
                        ).toLocaleString()
                      }
                    </small>

                  </div>
                ))
              }

            </div>

          </div>

          {/* PRODUCTION */}

          <div className="glass panel">

            <div className="top">

              <h2>
                🏭 Add Production
              </h2>

            </div>

            <form
              onSubmit={
                handleProduction
              }
            >

              <select
                className="input"
                value={form.productId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    productId:
                      e.target.value,
                  })
                }
              >

                <option value="">
                  Select Product
                </option>

                {
                  products.map((p) => (

                    <option
                      key={p._id}
                      value={p._id}
                    >
                      {p.name}
                    </option>
                  ))
                }

              </select>

              <input
                className="input"
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity:
                      e.target.value,
                  })
                }
              />

              <input
                className="input"
                type="number"
                placeholder="Milk Used"
                value={form.milkUsed}
                onChange={(e) =>
                  setForm({
                    ...form,
                    milkUsed:
                      e.target.value,
                  })
                }
              />

              <button
                className="green-btn"
              >
                Add Production
              </button>

            </form>

            <div className="history">

              <h3>
                Production History
              </h3>

              {
                productionList.map(
                  (p) => (

                    <div
                      key={p._id}
                      className="history-card"
                    >

                      <div>

                        <h4>
                          {p.productName}
                        </h4>

                        <span>
                          Qty:
                          {" "}
                          {p.quantity}
                          {" "}
                          |
                          {" "}
                          Milk:
                          {" "}
                          {p.milkUsed}
                        </span>

                      </div>

                      <small>
                        {
                          new Date(
                            p.date
                          ).toLocaleString()
                        }
                      </small>

                    </div>
                  )
                )
              }

            </div>

          </div>

        </div>

      </div>

      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      .staff-page{

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

      .staff-container{

        position:relative;
        z-index:2;

        max-width:1450px;

        margin:auto;
      }

      .badge{

        display:inline-block;

        padding:12px 22px;

        border-radius:40px;

        background:
        rgba(37,99,235,0.15);

        border:
        1px solid rgba(255,255,255,0.08);

        color:#60a5fa;

        font-weight:700;

        margin-bottom:24px;
      }

      .header h1{

        font-size:76px;

        line-height:1;

        margin-bottom:20px;

        font-weight:900;
      }

      .header h1 span{

        background:
        linear-gradient(
          135deg,
          #60a5fa,
          #22c55e
        );

        -webkit-background-clip:text;

        -webkit-text-fill-color:transparent;
      }

      .header p{

        color:#cbd5e1;

        font-size:22px;

        line-height:1.8;

        margin-bottom:45px;
      }

      /* STATS */

      .stats-grid{

        display:grid;

        grid-template-columns:
        repeat(auto-fit,minmax(220px,1fr));

        gap:22px;

        margin-bottom:35px;
      }

      .stat-card{

        padding:30px;

        border-radius:28px;

        text-align:center;
      }

      .stat-card h2{

        font-size:52px;

        margin-bottom:10px;

        color:#22c55e;
      }

      .stat-card p{

        color:#cbd5e1;

        font-size:18px;
      }

      /* GLASS */

      .glass{

        background:
        rgba(15,23,42,0.72);

        border:
        1px solid rgba(255,255,255,0.08);

        backdrop-filter:blur(20px);

        box-shadow:
        0 25px 60px rgba(0,0,0,0.45);
      }

      /* GRID */

      .main-grid{

        display:grid;

        grid-template-columns:1fr 1fr;

        gap:30px;
      }

      .panel{

        padding:32px;

        border-radius:30px;
      }

      .top{

        margin-bottom:24px;
      }

      .top h2{

        font-size:38px;

        font-weight:900;
      }

      /* INPUTS */

      .input{

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

        font-size:16px;

        transition:0.3s;
      }

      .input:focus{

        border:
        1px solid #22c55e;

        box-shadow:
        0 0 0 4px rgba(34,197,94,0.15);
      }

      .input::placeholder{

        color:#94a3b8;
      }

      option{
        color:black;
      }

      /* BUTTONS */

      .blue-btn,
      .green-btn{

        width:100%;

        padding:18px;

        border:none;

        border-radius:18px;

        color:white;

        font-size:18px;

        font-weight:800;

        cursor:pointer;

        transition:0.35s;
      }

      .blue-btn{

        background:
        linear-gradient(
          135deg,
          #2563eb,
          #1d4ed8
        );
      }

      .green-btn{

        background:
        linear-gradient(
          135deg,
          #22c55e,
          #16a34a
        );
      }

      .blue-btn:hover,
      .green-btn:hover{

        transform:
        translateY(-4px);

        box-shadow:
        0 20px 40px rgba(37,99,235,0.35);
      }

      /* HISTORY */

      .history{

        margin-top:35px;
      }

      .history h3{

        font-size:28px;

        margin-bottom:20px;
      }

      .history-card{

        padding:18px;

        border-radius:20px;

        background:
        rgba(255,255,255,0.05);

        border:
        1px solid rgba(255,255,255,0.05);

        margin-bottom:16px;

        display:flex;

        justify-content:space-between;

        gap:15px;

        transition:0.3s;
      }

      .history-card:hover{

        transform:
        translateY(-4px);
      }

      .history-card h4{

        font-size:22px;

        margin-bottom:8px;
      }

      .history-card span{

        color:#94a3b8;
      }

      .history-card small{

        color:#22c55e;

        font-size:12px;

        text-align:right;
      }

      /* MOBILE */

      @media(max-width:1000px){

        .main-grid{

          grid-template-columns:1fr;
        }
      }

      @media(max-width:768px){

        .staff-page{

          padding-left:18px;
          padding-right:18px;
        }

        .header h1{

          font-size:48px;
        }

        .header p{

          font-size:18px;
        }

        .top h2{

          font-size:30px;
        }

        .history-card{

          flex-direction:column;
        }

        .history-card small{

          text-align:left;
        }
      }

      `}</style>

    </div>
  );
};

export default StaffDashboard;