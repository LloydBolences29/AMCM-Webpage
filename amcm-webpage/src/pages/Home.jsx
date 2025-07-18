import React from "react";
import Navigation from "../components/Navigation";
import SeventhGrid from "../components/SeventhGrid";
import Footer from "../components/Footer";
import "../styles/Home.css"; // Importing the CSS file for styling
import Hero from "../components/Hero";
import Information from "../components/Information";

const Home = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment" },
    { label: "Find Doctors", path: "/doctors" },
    { label: "Patient Guide", path: "/guide" },
  ];
  return (
   
      <div className="home-body">
        <div className="home-content">
            {/* navigation  */}
          <Navigation menuLinks={menuLinks} />

          {/* Hero Section */}
          <Hero />

          {/* Information Section */}
          <Information />

          {/* Footer section */}
          <Footer />

        </div>

        <div className="seventh-grid">
          <SeventhGrid />
        </div>
      </div>
  
  );
};

export default Home;
