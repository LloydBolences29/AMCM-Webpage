import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";

import "../styles/FIndDoctors.css"

const FindDoctors = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Business", path: "/patient-business" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];
const [activeDepartment, setActiveDepartment] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const fetchAllDepartments = async () => {
    try {

        const response = await fetch (`${VITE_API_URL}/department/get-all-departments`, {
            method: "GET",
            credentials: "include",
        });

        const res = await response.json();
        setDepartments(res);

    } catch (error) {
        console.error("Error fetching departments:", error);
    }
  }

  useEffect(() => {
    fetchAllDepartments()
  },[])

  console.log("Data fetched:", departments);
  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <div id="find-doctors-wrapper">
            <div id="department-wrapper">

                {departments.map((department, index) => (
                  <div key={index} id="department-card">
                    <Button variant={activeDepartment === department.Name ? "primary" : "outline-primary"} onClick={() => setActiveDepartment(department.Name)}>
                      {department.Name}
                    </Button>
                  </div>
                ))}
            </div>
            <div id="doctor-card-wrapper"></div>
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
