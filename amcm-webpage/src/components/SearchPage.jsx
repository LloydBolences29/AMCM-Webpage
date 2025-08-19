import React, { useEffect, useState } from "react"; // ✅ You forgot useState
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import "../styles/SearchPage.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [searchInput, setSearchInput] = useState(query.get("term") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];

  const fetchSearchTerm = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/keyword/get-keywords/${searchInput}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setError(null); // Clear any previous errors
      } else {
        const errorMsg = await response.json();
        setError(errorMsg.message || "Failed to fetch search results.");
        console.error("Failed to fetch search results.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching search term:", error);
      setError("An error occurred while fetching search results.");
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOnClick = () => {
    if (searchInput) {
      fetchSearchTerm();
    } else {
      setSearchResults([]); // Clear results if no search term
    }
  };

  useEffect(() => {
    if (searchInput.trim()) {
      setLoading(true);
    }

    const handler = setTimeout(() => {
      if (searchInput.trim()) {
        fetchSearchTerm();
        console.log("Fetching search results for:", searchResults);
      } else {
        setSearchResults([]);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  return (
    <div className="home-body">
      <div className="home-content">
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <div id="search-page-containers">
            <div id="search-section">
              {/* <FormControl id="search-form" >
                <InputLabel htmlFor="search-input">Search</InputLabel>
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Search for illness or doctor"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <FormHelperText id="search-helper-text">
                  Enter keywords to find relevant services or doctors.
                </FormHelperText>
              </FormControl> */}

              <input
                id="search-input"
                type="text"
                placeholder="Search for illness or doctor"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <div id="search-results" className="g-2">
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Card key={result.ID} className="search-result-card">
                      <div id
                        style={{
                          backgroundColor: "#007682",
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1em",
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#142C2E",
                              width: 56,
                              height: 56,
                              border: "2px solid white",
                              fontSize: "1.5rem",
                              fontWeight: 500,
                            }}
                          >
                            {result.Name.split(" ")[0][0]}
                          </Avatar>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              fontWeight: 600,
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "1.2rem"
                            }}
                          >
                            Dr. {result.Name}
                          </Typography>
                        </div>
                      </div>
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            variant="body1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              color: "#142C2E",
                            }}
                          >
                            <i
                              className="fas fa-door-open"
                              style={{ marginRight: "8px", color: "#007682" }}
                            >
                              Deparment: {result["Department"]}
                            </i>
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              color: "#142C2E",
                            }}
                          >
                            <i
                              className="fas fa-door-open"
                              style={{ marginRight: "8px", color: "#007682" }}
                            >
                              Room Number: {result["Room"]}
                            </i>
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "#142C2E",
                            }}
                          >
                            <i
                              className="fas fa-phone"
                              style={{ marginRight: "8px", color: "#007682" }}
                            >
                              Local Phone: {result["Local"]}
                            </i>
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "#142C2E",
                              wordWrap: "break-word",
                              overflowWrap: "break-word",
                            }}
                          >
                            <i
                              className="fas fa-phone"
                              style={{ marginRight: "8px", color: "#007682" }}
                            >
                              Schedule: {result["Schedule"]}
                            </i>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

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

export default SearchPage;
