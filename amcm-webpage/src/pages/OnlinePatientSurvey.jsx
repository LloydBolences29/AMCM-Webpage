import React from 'react'
import UnderConstruction from '../components/UnderConstruction';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const OnlinePatientSurvey = () => {
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
          <UnderConstruction page={"Online Patient Survey"} />
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

export default OnlinePatientSurvey
