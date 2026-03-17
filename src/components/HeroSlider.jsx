
import React, { useEffect, useState } from "react";
import "./HeroSlider.css";
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    title: "Premium Fashion Collection",
    desc: "Style that speaks quality & confidence",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    title: "Modern Lifestyle Wear",
    desc: "Designed for comfort, crafted for style",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    title: "Visit Our Store",
    desc: "Experience fashion beyond online shopping",
  },
];


export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
                                           
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.image} alt="fashion-banner" />
            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <button>{slide.btn}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={current === i ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
