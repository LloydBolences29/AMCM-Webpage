import { lazy, Suspense, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import "../styles/FIndDoctors.css";

const DoctorByDepartment = lazy(() =>
  import("../components/FetchDoctorByDepartment")
);
const FindDoctors = () => {
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];
  const [activeDepartment, setActiveDepartment] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const fetchAllDepartments = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/get-all-departments`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const res = await response.json();
      setDepartments(res);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  console.log("Active Department:", activeDepartment);
  console.log("Data fetched:", departments);
  console.log("Doctors fetched:", doctors);
  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <Container>
            <Card
              sx={{
                mb: 3,
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
                  sx={{
                    color: "#ffffffff",
                    fontFamily: "Advent Sans, sans-serif",
                  }}
                >
                  Find your Doctor
                </Typography>
              </CardContent>
            </Card>
          </Container>
          <div id="find-doctors-wrapper">
            <div id="department-wrapper">
              {departments.map((department, index) => (
                <div key={index} id="department-card">
                  <Button
                    variant={
                      activeDepartment === department.Name
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => setActiveDepartment(department.Name)}
                  >
                    {department.Name}
                  </Button>
                </div>
              ))}
            </div>

            <div id="doctor-card-wrapper">
              <Suspense fallback={<Skeleton count={10} height={65} />}>
                {activeDepartment && (
                  <DoctorByDepartment activeDept={activeDepartment} />
                )}
              </Suspense>
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

export default FindDoctors;
