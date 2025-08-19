import React from "react";
import { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
import Skeleton from "react-loading-skeleton";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import SeventhGrid from "../../../../amcm-website/src/components/SeventhGrid";
import { Row, Col, Button } from "react-bootstrap";

const AddDepartment = lazy(() => import("../components/AddDepartment"));
const AddDoctor = lazy(() => import("../components/AddDoctor"));
const AddKeyword = lazy(() => import("../components/AddKeyword"));

const Editor = () => {
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];
  const [active, setActive] = useState("department");

  const handleClick = (name) => {
    setActive(name);
  };

  const renderPage = () => {
    switch (active) {
      case "doctor":
        return <AddDoctor />;
      case "keyword":
        return <AddKeyword />;
      default:
        return <AddDepartment />;
    }
  };

  return (
    <div className="home-body">
      <div className="home-content">
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
                  sx={{ color: "#ffffffff" }}
                >
                  Editor's Page
                </Typography>
              </CardContent>
            </Card>
          </Container>

          {/* Buttons for selection */}
          <div id="button-selection">
            <div
              id="button-selection-wrapper"
              className="g-1 d-flex justify-content-center"
            >
              <Row md={3} className="g-3" style={{ width: "100%" }}>
                <Col>
                  <Button
                    variant={
                      active === "department" ? "warning" : "outline-warning"
                    }
                    className="w-100"
                    onClick={() => handleClick("department")}
                  >
                    Add Department
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant={
                      active === "doctor" ? "warning" : "outline-warning"
                    }
                    className="w-100"
                    onClick={() => handleClick("doctor")}
                  >
                    Add Doctor
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant={
                      active === "keyword" ? "warning" : "outline-warning"
                    }
                    className="w-100"
                    onClick={() => handleClick("keyword")}
                  >
                    Add Keyword
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

          {/* Rendering each component */}

          <Suspense fallback={<Skeleton height={50} count={4} />}>
            {renderPage()}
          </Suspense>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <div className="seventh-grid">
        <SeventhGrid />
      </div>

      
    </div>
  );
};

export default Editor;
