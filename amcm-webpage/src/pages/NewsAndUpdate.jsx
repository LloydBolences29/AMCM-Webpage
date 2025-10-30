import { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAuth } from "../utils/AuthContext";
import "../styles/NewsAndUpdate.css";
import Modal from "react-bootstrap/Modal";
import Card from "@mui/material/Card";
import Button from "react-bootstrap/Button";
import Container from "@mui/material/Container";
import NoContent from "../components/NoContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import MainLayout from "../components/MainLayout";
import { BsFillTrashFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const NewsAndUpdate = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!payload.title.trim()) newErrors.title = "Title is required.";
    if (!payload.issued_date)
      newErrors.issued_date = "Issued Date is required.";
    if (!payload.news_description.trim())
      newErrors.news_description = "Description is required.";

    const thumbnailInput = document.getElementById("news-thumbnail");
    if (!thumbnailInput || thumbnailInput.files.length === 0)
      newErrors.thumbnail = "Thumbnail image is required.";

    const pdfFileInput = document.getElementById("news-file");
    if (!pdfFileInput || pdfFileInput.files.length === 0)
      newErrors.pdfFile = "PDF file is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const initialStateValue = {
    title: "",
    issued_date: "",
    news_description: "",
    thumbnail: "",
    pdfFile_originalName: "",
  };

  const { auth } = useAuth();
  const [pageStatus, setPageStatus] = useState("idle");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [notification, setNotification] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [payload, setPayload] = useState(initialStateValue);
  const [year, setYear] = useState("All");
  const [fetchedNews, setFetchedNews] = useState([]);
  const [fetchedYears, setFetchedYears] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFeatureCard, setSelectedFeatureCard] = useState([]);
  const [selectedEditCard, setSelectedEditCard] = useState(null);
  const [editedPayload, setEditedPayload] = useState({});
  const [openEdittingModal, setOpenEdittingModal] = useState(false);
  const closeEdittingModal = () => setOpenEdittingModal(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleFeatureClick = (id) => {
    setSelectedFeatureCard((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id]
    );
  };

const handleOpenEdittingModal = (news) => {
  setSelectedEditCard(news); // store the selected card
  setEditedPayload(news); // prefill editable data
  setOpenEdittingModal(true);
};

const handleCloseEdittingModal = () => {
  setOpenEdittingModal(false);
  setSelectedEditCard(null);
};
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
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
        body: formData,
        credentials: "include",
      });

      console.log("data being sent", formData);

      if (response.ok) {
        const data = await response.json();
        console.log("News submitted successfully:", data);
        setPageStatus("success");
        setNotification("News and Update added successfully.");
        setSuccessSnackBarState(true);
        // Reset form fields
        setPayload(initialStateValue);
        setShowModal(false);
        fetchNewsAndUpdates(); // Refresh the news list
        fetchYears(); // Refresh the years list
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setPageStatus("error");
        setNotification("Failed to add News and Update. Please try again.");
        setFailedSnackBarState(true);
        // Handle the error gracefully, e.g., show an error message
      }
    } catch (error) {
      setPageStatus("error");
      setNotification("An unexpected error occurred. Please try again.");
      setFailedSnackBarState(true);
      console.error("Error submitting news:", error);
    }
  };

  const handleSaveChanges = async (id) =>{
    // Implement the logic to save changes to the edited news item
    try{
      const formData = new FormData();
    formData.append("title", editedPayload.title);
    formData.append("news_description", editedPayload.news_description);
    formData.append("issued_date", editedPayload.issued_date);

    if (editedPayload.thumbnail instanceof File)
      formData.append("news-thumbnail", editedPayload.thumbnail);
    if (editedPayload.pdfFile instanceof File)
      formData.append("news-file", editedPayload.pdfFile);
      
      const response = await fetch(`${VITE_API_URL}/page/updated-news/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("News item updated successfully:", data);
        setPageStatus("success");
        setNotification("News item updated successfully.");
        setSuccessSnackBarState(true);
        fetchNewsAndUpdates(); // Refresh the news list
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setPageStatus("error");
        setNotification("Failed to update news item. Please try again.");
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error updating the news item", error);
    }
  }

  const handleOnChange = async (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);

    try {
      let url;

      if (selectedYear === "All") {
        url = `${VITE_API_URL}/page/get-news`;
      } else {
        // If admin/editor, fetch all (active + inactive) for that year
        url =
          auth.isAuthenticated &&
          (auth.user.role === "editor" || auth.user.role === "admin")
            ? `${VITE_API_URL}/page/filter-date?year=${selectedYear}&includeInactive=true`
            : `${VITE_API_URL}/page/filter-date?year=${selectedYear}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setFetchedNews(data.rows);
      }
    } catch (error) {
      console.error("Error filtering news by date:", error);
    }
  };

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

  const handleSaveDialog = async () => {
    const newStatus =
      selectedCard.is_Active === "active" ? "inactive" : "active";

    try {
      const response = await fetch(`${VITE_API_URL}/page/update-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedCard.id,
          is_Active: newStatus,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setNotification("Status updated successfully.");
        setPageStatus("success");
        setSuccessSnackBarState(true);
        fetchNewsAndUpdates();
        setShowDialog(false);
      }
    } catch (error) {
      console.log("Error Updating the status of the card");
      setFailedSnackBarState(true);
      setNotification("An unexpected error occurred. Please try again.");
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

  const handleToggle = (news) => {
    setSelectedCard(news);
    setShowDialog(true);
  };

  useEffect(() => {
    fetchNewsAndUpdates();
    fetchYears();
  }, []);
  //for the snackbar

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  console.log("Selected Card for editing: ", selectedEditCard);

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
          {auth.isAuthenticated &&
            (auth.user.role === "editor" || auth.user.role === "admin") && (
              <>
                <div id="add-news-button-wrapper">
                  <button id="add-news-button" onClick={handleShow}>
                    Add News
                  </button>
                </div>
                {/* Snackbar notification */}
                {pageStatus === "success" ? (
                  <Snackbar
                    open={successSnackBarState}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                  >
                    <Alert
                      onClose={handleSnackbarClose}
                      severity="success"
                      variant="filled"
                      sx={{
                        width: "100%",
                        margin: "1em",
                        fontSize: "1em",
                      }}
                    >
                      {notification}
                    </Alert>
                  </Snackbar>
                ) : (
                  <Snackbar
                    open={failedSnackBarState}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                  >
                    <Alert
                      onClose={handleSnackbarClose}
                      severity="error"
                      variant="filled"
                      sx={{
                        width: "100%",
                        margin: "1em",
                        fontSize: "1em",
                      }}
                    >
                      {notification}
                    </Alert>
                  </Snackbar>
                )}

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
                        {errors.title && (
                          <small className="text-danger">{errors.title}</small>
                        )}
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
                        {errors.news_description && (
                          <small className="text-danger">
                            {errors.news_description}
                          </small>
                        )}
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
                        {errors.issued_date && (
                          <small className="text-danger">
                            {errors.issued_date}
                          </small>
                        )}
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
                          accept="image/png, image/jpeg, image/svg+xml"
                        />
                        {errors.thumbnail && (
                          <small className="text-danger">
                            {errors.thumbnail}
                          </small>
                        )}
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
                          accept="application/pdf"
                        />
                        {errors.pdfFile && (
                          <small className="text-danger">
                            {errors.pdfFile}
                          </small>
                        )}
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
          {/* Modal For editing the card */}
{openEdittingModal && selectedEditCard && (
  <Modal
    size="lg"
    centered
    show={openEdittingModal}
    onHide={handleCloseEdittingModal}
  >
    <Modal.Header closeButton>
      <Modal.Title>Edit News: {selectedEditCard.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <div className="form-group">
          <label htmlFor="news-title">Title:</label>
          <input
            type="text"
            id="news-title"
            name="news-title"
            className="form-control"
            value={editedPayload.title || ""}
            onChange={(e) =>
              setEditedPayload({
                ...editedPayload,
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
            value={editedPayload.news_description || ""}
            onChange={(e) =>
              setEditedPayload({
                ...editedPayload,
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
            className="form-control"
            value={editedPayload.issued_date || ""}
            onChange={(e) =>
              setEditedPayload({
                ...editedPayload,
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
            className="form-control"
            onChange={(e) =>
              setEditedPayload({
                ...editedPayload,
                thumbnail: e.target.files[0],
              })
            }
            accept="image/png, image/jpeg, image/svg+xml"
          />
        </div>

        <div className="form-group">
          <label htmlFor="news-file">PDF File:</label>
          <input
            type="file"
            id="news-file"
            className="form-control"
            onChange={(e) =>
              setEditedPayload({
                ...editedPayload,
                pdfFile: e.target.files[0],
              })
            }
            accept="application/pdf"
          />
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => handleSaveChanges(selectedEditCard.id)}>
        Update
      </Button>
      <Button variant="danger" onClick={handleCloseEdittingModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)}
          {/* Dialog for confirming status change */}
          ...
          {auth.isAuthenticated &&
            (auth.user.role === "editor" || auth.user.role === "admin") && (
              <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={showDialog}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Set to:{" "}
                  {selectedCard && selectedCard.is_Active === "active"
                    ? "Inactive"
                    : "Active"}
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Are you sure you want to change the status of this news and
                    update?
                  </Typography>
                  <Typography gutterBottom>
                    Current status:{" "}
                    {selectedCard && selectedCard.is_Active === "active"
                      ? "Active"
                      : "Inactive"}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleSaveDialog}>
                    Save changes
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            )}
          {/* news and update cards here */}
          {/* thumbnail for the card */}
          {auth.isAuthenticated &&
          (auth.user.role === "editor" || auth.user.role === "admin") ? (
            fetchedNews && fetchedNews.length > 0 ? (
              <div id="news-and-update-cards-container">
                {fetchedNews.map((newsItem) => (
                  <div className="news-and-update-card" key={newsItem.id}>
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

                          <div className="admin-buttons-wrapper">
                            <Tooltip title="Delete">
                              <Button variant="outline-danger">
                                {" "}
                                <BsFillTrashFill />{" "}
                              </Button>
                            </Tooltip>
                            <Tooltip title="Edit page">
                              <Button variant="outline-secondary" onClick={() => handleOpenEdittingModal(newsItem)}>
                                <AiTwotoneEdit />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Add to Feature">
                              <Button
                                variant={
                                  selectedFeatureCard.includes(newsItem.id)
                                    ? "warning"
                                    : "outline-warning"
                                }
                                onClick={() => handleFeatureClick(newsItem.id)}
                              >
                                <AiOutlineStar />
                              </Button>
                            </Tooltip>
                          </div>
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

                        {/* ✅ Only editors/admins see the toggle */}
                        <div id="status-indicator-wrapper">
                          <FormControlLabel
                            control={
                              <Switch
                                sx={{ m: 1 }}
                                checked={newsItem.is_Active === "active"}
                                onChange={() => handleToggle(newsItem)}
                                color="primary"
                              />
                            }
                            label={
                              newsItem.is_Active === "active"
                                ? "Active"
                                : "Inactive"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="no-content-news-update">
                <NoContent />
              </div>
            )
          ) : // 👇 Non-admins only see active news
          fetchedNews &&
            fetchedNews.filter((item) => item.is_Active === "active").length >
              0 ? (
            <div id="news-and-update-cards-container">
              {fetchedNews
                .filter((item) => item.is_Active === "active")
                .map((newsItem) => (
                  <div className="news-and-update-card" key={newsItem.id}>
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
          ) : (
            <div id="no-content-news-update">
              <NoContent />
            </div>
          )}
          <div id="date-filter-sections">
            <div id="filter-options">
              <div id="label-filter">
                <label htmlFor="">Filter by year: </label>
              </div>

              <div id="options-filter">
                {/* filter by year */}
                <div className="filter-option">
                  <select
                    name="year"
                    id="year"
                    value={year}
                    onChange={handleOnChange}
                  >
                    <option value="All" defaultValue>
                      All
                    </option>
                    {fetchedYears.map((year) => (
                      <option key={year.id} value={`${year.issued_year}`}>
                        {year.issued_year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsAndUpdate;
