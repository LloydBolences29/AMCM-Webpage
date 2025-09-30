import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAuth } from "../utils/AuthContext";
import "../styles/NewsAndUpdate.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "@mui/material/Container";

const NewsAndUpdate = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];

  const initialStateValue = {
    title: "",
    issued_date: "",
    news_description: "",
  };

  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [payload, setPayload] = useState(initialStateValue);
  const [year, setYear] = useState("All");
  const [fetchedNews, setFetchedNews] = useState([]);
  const [fetchedYears, setFetchedYears] = useState([]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("issued_date", payload.issued_date);
      formData.append("news_description", payload.news_description);

      // Get the file inputs directly and append the files
      const thumbnailInput = document.getElementById("news-thumbnail");
      const pdfFileInput = document.getElementById("news-file");

      if (thumbnailInput.files.length > 0) {
        formData.append("news-thumbnail", thumbnailInput.files[0]);
      }
      if (pdfFileInput.files.length > 0) {
        formData.append("news-file", pdfFileInput.files[0]);
      }

      const response = await fetch(`${VITE_API_URL}/page/upload-image`, {
        method: "POST",
        body: formData, // Send the FormData object directly
        credentials: "include", // Include cookies if needed
      });

      console.log("data being sent", formData);

      if (response.ok) {
        const data = await response.json();
        console.log("News submitted successfully:", data);
        setPayload(initialStateValue);
        setShowModal(false);
        fetchNewsAndUpdates(); // Refresh the news list
        fetchYears(); // Refresh the years list
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        // Handle the error gracefully, e.g., show an error message
      }
    } catch (error) {
      console.error("Error submitting news:", error);
    }
  };

  const handleOnChange = async (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);

    try {
      const url =
        selectedYear === "All"
          ? `${VITE_API_URL}/page/get-news`
          : `${VITE_API_URL}/page/filter-date?year=${selectedYear}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setFetchedNews(data.rows);
      }
    } catch (error) {
      console.error("Error filtering news by date:", error);
    }
  }

  //fetch the updated news and updates
  const fetchNewsAndUpdates = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/page/get-news`);
      if (response.ok) {
        const data = await response.json();
        setFetchedNews(data.rows);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };


  //fetch years for the filtering functionality
  const fetchYears = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/page/get-news-year`);
      if (response.ok) {
        const data = await response.json();
        setFetchedYears(data.rows);
      }
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  useEffect(() => {
    fetchNewsAndUpdates();
    fetchYears();
  }, []);
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
                  sx={{ color: "#ffffffff" }}
                >
                  News and Update
                </Typography>
              </CardContent>
            </Card>
          </Container>

          {/* for the main content */}
          <div id="news-and-update-container">
            <div id="news-and-update-wrapper">
              <div id="date-filter-sections">
                <div id="filter-options">
                  <div id="label-filter">
                    <label htmlFor="">Filter by year: </label>
                  </div>

                  <div id="options-filter">
                    {/* filter by year */}
                    <div className="filter-option">
                      <select name="year" id="year" value={year} onChange={handleOnChange}>
                        <option value="All" defaultValue>All</option>
                        {fetchedYears.map((year) => (
                          <option key={year.id} value={`${year.issued_year}`} >
                            {year.issued_year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {auth.isAuthenticated && (auth.user.role === "editor" || auth.user.role === "admin") && (
                  <>
                    <div id="add-news-button-wrapper">
                      <button id="add-news-button" onClick={handleShow}>
                        Add News
                      </button>
                    </div>

                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={showModal}
                      onHide={handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Add News and Update
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form action="" method="post">
                          <div className="form-group">
                            <label htmlFor="news-title">Title:</label>
                            <input
                              type="text"
                              id="news-title"
                              name="news-title"
                              className="form-control"
                              onChange={(e) =>
                                setPayload({
                                  ...payload,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="news-content">Description:</label>
                            <textarea
                              id="news-content"
                              name="news-content"
                              className="form-control"
                              rows="5"
                              onChange={(e) =>
                                setPayload({
                                  ...payload,
                                  news_description: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>

                          <div className="form-group">
                            <label htmlFor="news-date">Issued Date:</label>
                            <input
                              type="date"
                              id="news-date"
                              name="news-date"
                              className="form-control"
                              onChange={(e) =>
                                setPayload({
                                  ...payload,
                                  issued_date: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="news-thumbnail">Thumbnail:</label>
                            <input
                              type="file"
                              id="news-thumbnail"
                              name="news-thumbnail"
                              className="form-control"
                              onChange={(e) =>
                                setPayload({
                                  ...payload,
                                  thumbnail: e.target.files[0].name,
                                  pdfFile_originalName: e.target.files[0].name,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="news-thumbnail">PDF File:</label>
                            <input
                              type="file"
                              id="news-file"
                              name="news-file"
                              className="form-control"
                              onChange={(e) =>
                                setPayload({
                                  ...payload,
                                  pdfFile_originalName: e.target.files[0].name,
                                })
                              }
                            />
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <Button variant="danger" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                )}
              </div>
              {/* news and update cards here */}
              {/* thumbnail for the card */}
              <div id="news-and-update-cards-container">

                {fetchedNews.map((newsItem) => (
                  <div
                    className={`news-and-update-card`}
                    id="news-and-update-card"
                    key={newsItem.id}
                  >
                    <div id="news-and-update-card-wrapper">

                      <img
                        id="thumbnail-images"
                        src={`${VITE_API_URL}/uploads/thumbnail/${newsItem.thumbnail}`}
                        loading="lazy"
                        alt="News Thumbnail"
                        className="news-thumbnail"
                      />

                      <div id="news-and-update-card-details">
                        <div id="news-and-update-card-title">
                          <h3>{newsItem.title}</h3>
                        </div>
                        <div id="news-and-update-card-content">
                          <p>{newsItem.news_description}</p>
                          <p>Issued Date: {newsItem.issued_date}</p>
                        </div>
                        <div id="read-more-button-wrapper">
                          <a
                            href={`${VITE_API_URL}/uploads/pdfFile/${newsItem.unique_filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

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

export default NewsAndUpdate;


// to do: Protect the backend API endpoints by
// implementing a middleware that will check the user role