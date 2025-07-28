import { useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import Typography from "@mui/material/Typography";

import CardContent from "@mui/material/CardContent";

import Footer from "../components/Footer";
import SeventhGrid from "../components/SeventhGrid";
import {
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
  Form,
  Container,
} from "react-bootstrap";
import PatientDetails from "./PatientDetails";

const AppointmentScheduling = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/doctors" },
    { label: "Billing and Admition", path: "/billing-admition" },
    { label: "Patient Business", path: "/patient-business" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];


  const [serverResponse, setServerResponse] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    patientType: "",
    date: "",
    time: "",
    doctor: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //validate the step1
  const validateStep1 = (e) => {
    setActiveStep(1);
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  const getStep = () => {
    switch (activeStep) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  const onNext = (e) => {
    e.preventDefault();

    const { firstname, lastname, email, phone } = payload;

    if (!firstname || !lastname || !email || !phone) {
      setError("Please fill in all fields.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    // Email format validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setError(null);
    setActiveStep((prev) => prev + 1);
    console.log("current step:", activeStep);
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
    console.log("current step:", activeStep);
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    alert("Appointment scheduled successfully!");
    setActiveStep(0); // reset to first step
  };

  const handleOnChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
    setError("");
  };
  return (
    <div className="home-body">
      <div className="home-content">
        <Navigation menuLinks={menuLinks} />
        <div className="main container">
          <Container>
            <Card
              className="content-column analytics-card shadow-sm p-3 mb-5 rounded text-center"
              style={{ backgroundColor: "#142C2E" }}
            >
              <div className="page-content">
                <h1
                  className="page-title fw-bold"
                  style={{ color: "#ffffffff" }}
                >
                  Scheduling of Appointment
                </h1>
              </div>
            </Card>
          </Container>

          <ProgressBar
            now={getStep()}
            label={`${getStep()}%`}
            className="mb-4"
            style={{ height: "20px", borderRadius: "10px" }}
          />

          {activeStep === 0 && (
            <>
              <Card className="content-column analytics-card shadow-sm p-1 bg-white rounded text-center border-0">
                <h4>Please enter your full details</h4>
              </Card>

              <Form className="patient-details-form mt-5">
                <Row className="justify-content-center">
                  <Col md={4}>
                    <Form.Group controlId="formFirstName">
                      <Form.Control
                        type="text"
                        value={payload.firstname}
                        name="firstname"
                        placeholder="Enter your first name"
                        onChange={handleOnChange}
                        required
                        isInvalid={
                          !!error && error.toLowerCase().includes("firstname")
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formLastName">
                      <Form.Control
                        type="text"
                        value={payload.lastname}
                        name="lastname"
                        placeholder="Enter your last name"
                        onChange={handleOnChange}
                        required
                        isInvalid={
                          !!error && error.toLowerCase().includes("lastname")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                  <Col md={4}>
                    <Form.Group controlId="formEmail">
                      <Form.Control
                        type="email"
                        value={payload.email}
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                        required
                        isInvalid={
                          !!error && error.toLowerCase().includes("email")
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formPhone">
                      <Form.Control
                        type="number"
                        value={payload.phone}
                        name="phone"
                        placeholder="Enter your phone number"
                        onChange={handleOnChange}
                        required
                        isInvalid={
                          !!error && error.toLowerCase().includes("phone")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                  <Col md={8}>
                    <Form.Group controlId="formAddress">
                      <Form.Control
                        type="text"
                        value={payload.address}
                        name="address"
                        placeholder="Enter your address"
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </>
          )}

          {activeStep === 1 && (
            <Container>
              <Form className="mt-4">
                <Row className="justify-content-center">
                  <Col md={8}></Col>

                  <Form.Group controlId="formPatientType">
                    <Form.Label>Patient Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="patientType"
                      value={payload.patientType}
                      onChange={handleOnChange}
                    >
                      <option value="">Select Patient Type</option>
                      <option value="new">New Patient</option>
                      <option value="returning">Returning Patient</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Form>
            </Container>
          )}

          {activeStep === 4 ? (
            <Container className="text-center mt-4">
              <Button variant="outline-primary" onClick={onSubmit}>
                Submit
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={onBack}
              >
                Back
              </Button>
            </Container>
          ) : (
            <Container className="text-center mt-4">
              {error && (
                <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
              )}
              <Button variant="outline-primary" onClick={onNext}>
                Next
              </Button>
              {activeStep > 0 && (
                <Button
                  variant="outline-secondary"
                  className="ms-2"
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
            </Container>
          )}
        </div>
        <Footer />
      </div>
      <div className="seventh-grid">
        <SeventhGrid />
      </div>
    </div>
  );
};

export default AppointmentScheduling;
