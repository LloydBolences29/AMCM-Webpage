import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../styles/Home.css"; // Importing the CSS file for styling
import Hero from "../components/Hero";
import Information from "../components/Information";

const Home = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/doctors" },
    { label: "Billing and Admition", path: "/billing-admition" },
    { label: "Patient Business", path: "/patient-business" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];

  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          {/* Hero Section */}
          <Hero />

          {/* Information Section */}
          <Information />
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
  );
};

export default Home;
