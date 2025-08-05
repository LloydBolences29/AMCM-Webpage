import React, { useEffect, useState } from 'react'; // ✅ You forgot useState
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]); 
  const location = useLocation();
  const query = new URLSearchParams(location.search);
const [searchInput, setSearchInput] = useState(query.get("term") || "");

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
      } else {
        console.error("Failed to fetch search results.");
      }
    } catch (error) {
      console.error("Error fetching search term:", error);
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
if(searchInput) {
      fetchSearchTerm();
    }
  }, [searchInput]);

  return (
    <div className="home-body">
      <div className="home-content">
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <div id="search-page-containers">
            <div id="search-section">
              <input
                type="text"
                id="search-input"
                placeholder="Search for services, doctors, or information..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                id="search-button"
                onClick={handleSearchOnClick}
              >
                Search
              </button>

              <div id="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div key={result.ID} className="search-result-item">
                      <h3>{result.Name}</h3>
                    </div>
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
