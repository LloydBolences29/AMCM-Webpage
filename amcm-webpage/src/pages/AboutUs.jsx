import React from 'react'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import UnderConstruction from "../components/UnderConstruction";
import "../styles/Home.css"; // ✅ ADD THIS


const AboutUs = () => {
      
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];
  return (
 <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          {/* Hero Section */}
          <UnderConstruction page={"About Us"}/>
        </div>

        {/* Footer section */}
        <Footer />
      </div>

      <div className="seventh-grid">
        <div id="seventh-grid-body">
          <img
            id="symbol"
            src="/adventist-symbol--white.png"
            alt="Seventh Grid"
          />
        </div>
      </div>
    </div>
  )
}

export default AboutUs
