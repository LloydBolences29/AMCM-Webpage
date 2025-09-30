import { useEffect, useState, lazy, Suspense } from "react";
import "../styles/Hero.css"; // Importing the CSS file for styling
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";



const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
const navigate = useNavigate();



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

  const handleSearchOnClick = () => {
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  
  return (
    <>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-title">
            <h1>
              The Center of Excellence in Faith-based Healthcare, Education, and
              Lifestyle
            </h1>

            <div id="search-section">
              <div id="text-container">
                <TypeAnimation
                  sequence={[
                    "Looking for care that goes beyond medicine?",
                    2000,
                    "We connect you with doctors who believe in healing with heart.",
                    2000,
                    "Find help for your sickness, guided by faith and compassion.",
                    2000,
                    "See who’s ready to walk with you on your healing journey.",
                    2000,
                    "Sharing Jesus’ healing love, one appointment at a time.",
                    2000,
                  ]}
                  wrapper="span"
                  speed={15}
                  className="hero-typing-animation"
                  repeat={Infinity}
                />
              </div>

              <div
                id="search-bar"

              >
                <input
                  type="text"
                  id="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for doctors, or illnesses..."
                />
                <button
                  type="submit"
                  id="search-button"
                  onClick={handleSearchOnClick}

                >
                  Search
                </button>
              </div>
            </div>

      
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
