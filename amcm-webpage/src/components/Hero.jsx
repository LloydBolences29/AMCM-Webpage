import { useEffect } from "react";
import "../styles/Hero.css"; // Importing the CSS file for styling
const Hero = () => {
  useEffect(() => {
    const hero = document.querySelector(".hero-container");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hero.classList.add("lazy-loaded");
          observer.unobserve(hero);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-title">
            <h1>The Center of Excellence in Faith-based Education, Healthcare and Lifestyle</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
