import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Best dairy service! Fresh milk everyday at my doorstep.",
      author: "Priya S."
    },
    {
      quote: "Love the quality of paneer and curd. Fast delivery!",
      author: "Rahul K."
    },
    {
      quote: "From farm to table freshness. Highly recommend!",
      author: "Anita M."
    }
  ];

  const products = [
    {
      name: "Fresh Cow Milk",
      price: "₹55/L",
      image: "https://dairy-backend4.onrender.com/uploads/1774959584018-milk.webp"
    },
    {
      name: "Paneer 500g",
      price: "₹250",
      image: "https://dairy-backend4.onrender.com/uploads/1775668729554-Paneer_500g.webp"
    },
    {
      name: "Curd 500g",
      price: "₹60",
      image: "https://dairy-backend4.onrender.com/uploads/1774877088289-Curd-cup.png.webp"
    },
    {
      name: "Desi Ghee 500g",
      price: "₹650",
      image: "https://dairy-backend4.onrender.com/uploads/1775668317441-image4.webp"
    }
  ];

  const stats = [
    { number: "50+", label: "Happy Farms" },
    { number: "1000+", label: "Orders Daily" },
    { number: "5★", label: "Rating" },
    { number: "24/7", label: "Support" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <h1>Fresh Dairy Straight from Farm</h1>
          <p>
            Experience pure, farm-fresh milk, paneer, curd & more delivered daily.
          </p>

          <div className="buttons">
            <button className="btn-blue" onClick={() => navigate("/login")}>
              Shop Now
            </button>
            <button className="btn-yellow" onClick={() => navigate("/register")}>
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-image"></div>
      </section>

      <section className="features">
        <h2>Why Choose DairyNest?</h2>

        <div className="cards">
          <div className="card"><h3>Fresh</h3></div>
          <div className="card"><h3>Fast</h3></div>
          <div className="card"><h3>Quality</h3></div>
          <div className="card"><h3>Eco</h3></div>
        </div>
      </section>

      <section className="stats">
        {stats.map((item, i) => (
          <div key={i}>
            <h3>{item.number}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      <section className="products">
        <h2>Popular Products</h2>

        <div className="product-grid">
          {products.map((item, i) => (
            <div key={i} className="product-card">
              <img src={item.image} alt="" />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>

        <button className="view-btn" onClick={() => navigate("/shop")}>
          View All →
        </button>
      </section>

      <section className="testimonial">
        <h2>What Our Customers Say</h2>
        <p>"{testimonials[currentTestimonial].quote}"</p>
        <h4>- {testimonials[currentTestimonial].author}</h4>
      </section>
      
      <footer className="footer">
        <h3>DairyNest</h3>
        <p>© 2026 DairyNest</p>
      </footer>

    </div>
  );
};

export default Home;