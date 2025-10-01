import { useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import UnderConstruction from "../components/UnderConstruction";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import EKGSpinner from "../components/EKGSpinner.jsx";

import Link from "@mui/material/Link";


//importing of the contents in every cards
//from information folder
const components = {
  dental: lazy(() => import("../information/Dental.jsx")),
  "diagnostic-imaging-service": lazy(() =>
    import("../information/DiagnosticImaging.jsx")
  ),
  "admission-service": lazy(() => import("../information/AdmissionServiceRenderer.jsx")), 


};

const serviceNames = {
  dental: "Dental",
  "diagnostic-imaging-service": "Diagnostic Imaging Services",
  "admission-service": "Admission Services",
  "emergency-room": "Emergency Room",
  "medical-service": "Medical Services",
  "opd-service": "Outpatient Services",
  "patient-business-services": "Patient Business Services",
  "pathology-laboratory-service": "Pathology and Laboratory Services",
  "pastoral-care-service": "Pastoral Care Services",
  "physical-medicine-rehabilitation-service":
  "Physical Medicine and Rehabilitation Services",
  "pharmacy-service": "Pharmacy Services",
  "medical-records-service": "Medical Records Services",
  "renal-service": "Renal Services",
  "auto-mo-wash-ko": "Auto Mo, Wash Ko",
  "healthy-bites": "Healthy Bites",
  "guest-rooms": "Guest Rooms",
  gymnasium: "Gymnasium",
  parking: "Parking",
  lifestyle: "Lifestyle Is Medicine",
  mac: "Manila Adventist College",
  "clinical-pastoral-education": "Clinical Pastoral Education",
  internship: "Internship",
  residency: "Residency Program",
};
const ServiceDetailRenderer = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];
  const { id } = useParams();
  const ActiveComponent = components[id];

  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <div
            id="breadcrumbs-container"
            className="d-flex flex-row gap-3 mx-3"
          >
            <div id="back-icon">
              <Link href="/services">
                <KeyboardBackspaceSharpIcon color="action" />
              </Link>
            </div>
            <div id="breadcrumbs-list">
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link href="/" color="inherit">
                  Home
                </Link>
                <Link href="/services" color="inherit">
                  Our Services
                </Link>
                <Typography color="text.primary">{serviceNames[id]}</Typography>
              </Breadcrumbs>
            </div>
          </div>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                  height: "100vh",
                  width: "100vw",
                }}
              >
                <EKGSpinner />
              </div>
            }
          >
            {ActiveComponent ? (
              <ActiveComponent />
            ) : (
              <UnderConstruction page={"page"} />
            )}
          </Suspense>
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

export default ServiceDetailRenderer;
