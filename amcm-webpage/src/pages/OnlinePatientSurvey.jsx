import React from 'react'
import UnderConstruction from '../components/UnderConstruction';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import MainLayout from "../components/MainLayout";


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
    <MainLayout>
      <UnderConstruction page={"Online Patient Survey"} />
    </MainLayout>
  );
};


export default OnlinePatientSurvey;
