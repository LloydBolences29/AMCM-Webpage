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
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchValue , setSearchValue] = useState("");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showResult, setShowResult] = useState(false);

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



  const handleSearch = () =>{
    setSearchValue(searchInput);
    setShowResult(true);
  }

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
              {/* {departments.map((department, index) => (
                <div key={index} id="department-card">
                  <Button
                    variant={
                      activeDepartment === department.Name
                        ? "primary active"
                        : "outline-primary"
                    }
                    onClick={() => setActiveDepartment(department.Name)}
                  >
                    {department.Name}
                  </Button>
                </div>
              ))} */}
              {/* <FormControl sx={{ m: 1, minWidth: 300, maxWidth: "100%" }}>
                <InputLabel
                  id="department-select-label"
                  sx={{ color: "#142C2E" }}
                >
                  Departments
                </InputLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  value={activeDepartment}
                  onChange={(e) => setActiveDepartment(e.target.value)}
                  label="Departments"
                  sx={{
                    backgroundColor: "#fff", // or use a light version like "#f5f5f5"
                    color: "#142C2E", // Text color
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D3D3D3", // Border color (default)
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#142C2E", // Border color (focused)
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#142C2E", // Border on hover
                    },
                    "& .MuiSelect-icon": {
                      color: "#142C2E", // Down arrow color
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        width: "100%", // Let the dropdown match the input width
                        maxWidth: "90%", // Ensure it doesn't exceed the input width
                        maxHeight: 300,
                        overflowX: "hidden", // Avoid horizontal scroll
                        color: "#142C2E", // Text color in dropdown
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {departments.map((department) => (
                    <MenuItem
                      key={department.Name}
                      value={department.Name}
                      sx={{
                        color: "#142C2E",
                        whiteSpace: "normal", // Allow text wrapping
                        wordBreak: "break-word", // Handle long department names
                      }}
                    >
                      {department.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <div id="search-bar-container">
                <FormControl id="search-form">
                  <InputLabel htmlFor="search-input">Search</InputLabel>
                  <Input
                    id="search-input"
                    type="text"
                    placeholder="Search for doctors or department"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <FormHelperText id="search-helper-text">
                    Enter keywords to find relevant doctors or department.
                  </FormHelperText>
                </FormControl>
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
