import { lazy, Suspense, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import "../styles/FIndDoctors.css";

const DoctorByDepartment = lazy(() =>
  import("../components/FetchDoctorByDepartment")
);
const FindDoctors = () => {
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];
  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleSearch = () => {
    setSearchValue(searchInput);
    setShowResult(true);
  };


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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>

            <div id="doctor-card-wrapper">
              {showResult && (
                <Suspense fallback={<Skeleton count={10} height={65} />}>
                  {searchValue && (
                    <DoctorByDepartment searchValue={searchValue} />
                  )}
                </Suspense>
              )}
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
