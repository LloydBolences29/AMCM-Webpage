import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "../styles/Services.css";
import Button from "react-bootstrap/Button";
import EKGSpinner from "../components/EKGSpinner";

import { lazy, Suspense, useState } from "react";

const PatientServices = lazy(() => import("../components/PatientServices"));
const NonPatientServices = lazy(() =>
  import("../components/NonPatientServices")
);
const GovernmentCollabServices = lazy(() =>
  import("../components/GovernmentCollabServices")
);

const EducationServices = lazy(() => import("../components/Education"));

const Services = () => {
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];
  const [activeComponent, setActiveComponent] = useState("one");

  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <div id="services-wrapper">
            <Container>
              <Card
                sx={{
                  mb: 1,
                  textAlign: "center",
                  marginTop: "2em",
                  backgroundColor: "#163235ff",
                  borderRadius: "10px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    component="h1"
                    className="page-title fw-bold"
                    sx={{ color: "#ffffffff" }}
                  >
                    Our Services
                  </Typography>
                </CardContent>
              </Card>
            </Container>

            <div id="services-container">
              <div id="anchor-wrapper">
                <Button
                  variant="outline-primary"
                  className={`anchor-button ${
                    activeComponent === "one" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("one")}
                >
                  Patient Services
                </Button>
                <Button
                  variant="outline-primary"
                  className={`anchor-button ${
                    activeComponent === "two" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("two")}
                >
                  Non-Patient Services
                </Button>
                {/* <Button
                  variant="outline-primary"
                  className={`anchor-button ${
                    activeComponent === "three" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("three")}
                >
                  Government Collaboration Services
                </Button> */}
                <Button
                  variant="outline-primary"
                  className={`anchor-button ${
                    activeComponent === "four" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("four")}
                >
                  Medical Education and Others
                </Button>
              </div>
              <div id="services-card-wrapper">
                {activeComponent === "one" && (
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
                    <PatientServices />
                  </Suspense>
                )}

                {activeComponent === "two" && (
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
                    <NonPatientServices />
                  </Suspense>
                )}

                {activeComponent === "three" && (
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
                    <GovernmentCollabServices />
                  </Suspense>
                )}
                {activeComponent === "four" && (
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
                    <EducationServices />
                  </Suspense>
                )}
                <br />
              </div>
            </div>
          </div>
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

export default Services;
