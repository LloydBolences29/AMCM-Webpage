import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import "../styles/Services.css";
import { Anchor } from "antd";
import Skeleton from "react-loading-skeleton";

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
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Business", path: "/patient-business" },
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
                <Anchor
                  affix={false}
                  onClick={(e, link) => {
                    switch (link.href) {
                      case "#patient-services-wrapper":
                        setActiveComponent("one");
                        break;
                      case "#non-patient-services":
                        setActiveComponent("two");
                        break;
                      case "#government-collaborative-services":
                        setActiveComponent("three");
                        break;
                      case "#education-services":
                        setActiveComponent("four");
                        break;
                    }
                  }}
                  items={[
                    {
                      key: "1",
                      href: "#patient-services-wrapper",
                      title: "Patient Services",
                    },
                    {
                      key: "2",
                      href: "#non-patient-services",
                      title: "Non-patient Services",
                    },
                    {
                      key: "3",
                      href: "#government-collaborative-services",
                      title: "Government Collaborative Services",
                    },
                    {
                      key: "4",
                      href: "#education-services",
                      title: "Education",
                    },
                  ]}
                />
              </div>
              <div id="services-card-wrapper">
                <br />
                {activeComponent === "one" && (
                  <Suspense fallback={<Skeleton height={200} />}>
                    <PatientServices />
                  </Suspense>
                )}
                <br />

                {activeComponent === "two" && (
                  <Suspense fallback={<Skeleton height={200} />}>
                    <NonPatientServices />
                  </Suspense>
                )}
                <br />

                {activeComponent === "three" && (
                  <Suspense fallback={<Skeleton height={200} />}>
                    <GovernmentCollabServices />
                  </Suspense>
                )}
                {activeComponent === "four" && (
                  <Suspense fallback={<Skeleton height={200} />}>
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
