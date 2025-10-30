import { lazy, Suspense, useEffect, useState } from "react";
import EKGSpinner from "../components/EKGSpinner";
import { Button } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MainLayout from "../components/MainLayout";
import { FaUserDoctor } from "react-icons/fa6";

import "../styles/FIndDoctors.css";

const DoctorByDepartment = lazy(() =>
  import("../components/FetchDoctorByDepartment")
);
const FindDoctors = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    setSearchValue(searchInput);
    setShowResult(true);
  };

  return (
    <MainLayout>
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
          <div id="search-bar-container">
            <input
              type="text"
              id="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for doctor or department"
            />
          </div>

          <div id="search-button-container">
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        <div id="doctor-card-wrapper">
          {showResult ? (
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <EKGSpinner />
                </div>
              }
            >
              {searchValue && <DoctorByDepartment searchValue={searchValue} />}
            </Suspense>
          ) : (
            <div
              id="no-search-placeholder"
              className="d-flex flex-column justify-content-center align-items-center text-center p-5"
            >
              <FaUserDoctor size={150} color="#163235a2" className="mb-3" />
              <p
                style={{
                  fontSize: "1.5rem",
                  maxWidth: "800px",
                  lineHeight: "1.6",
                }}
              >
                Looking for your doctor? <br /> See when they’re available and
                where to find them.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FindDoctors;
