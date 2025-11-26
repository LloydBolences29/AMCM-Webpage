import { useState, useEffect, useMemo } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAuth } from "../utils/AuthContext";
import "../styles/NewsAndUpdate.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const navigate = useNavigate();
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
  const [openEdittingDialog, setOpenEdittingDialog] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openSubmitChangesModal, setOpenSubmitChangesModal] = useState(false);
  const [originalIDs, setOriginalIDs] = useState([]);
  const [openTypeOfNews, setOpenTypeOfNews] = useState(false);
  const [pageTitleModal, setPageTitleModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState({
    article_title: "",
    slug: "",
    news_type: "article",
    article_thumbnail: "",
    is_Active: "inactive",
  });
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setOpenTypeOfNews(false);
    setTimeout(() => {
      setShowModal(true);
    }, 300);
  };

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  //handle choose type of news

  const handleShowTypeofNews = () => {
    setOpenTypeOfNews(true);
  };

  const handleCloseShowTypeofNews = () => {
    setOpenTypeOfNews(false);
  };

  const handleOpenPageTitleModal = () => {
    setOpenTypeOfNews(false);
    setPageTitleModal(true);
  };
  const handleClosePageTitleModal = () => {
    setPageTitleModal(false);
  };
  //handle the multiple selection of featured news cards
  const handleFeatureClick = (id) => {
    setSelectedFeatureCard((prevState) => {
      return prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id];
    });
  };

  //Open the modal for editing a card
  const handleOpenEdittingModal = (news) => {
    setEditedPayload(news);
    setSelectedEditCard(news);
    setOpenEdittingModal(true);
  };

  //close the modal for editing
  const handleCloseEdittingModal = () => {
    setOpenEdittingModal(false);
    setSelectedEditCard(null);
  };

  //open the confirmation dialog for confirmation of editting
  const handleOpenEdittingDialog = (id) => {
    setSelectedEditCard(id); // store the selected card
    setOpenEdittingDialog(true);
  };

  const handleCloseEdittingDialog = () => {
    setOpenEdittingModal(false);
    setSelectedEditCard(null);
  };

  //for the delete button
  const handleOpenDeleteModal = (news) => {
    setOpenDeleteModal(true);
    setItemToDelete(news);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteModal(false);
    setItemToDelete(null);
  };

  //dialog for confirmation of changes in the feature selection
  const handleOpenSubmitChangesDialog = () => {
    setOpenSubmitChangesModal(true);
  };

  const handleCloseSubmitChangesDialog = () => {
    setOpenSubmitChangesModal(false);
  };

  //submit function for changes in selecting the featured cards
  const handleSubmitChanges = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/page/add-featured-news`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsIds: selectedFeatureCard }),
      });
      console.log("data being sent", selectedFeatureCard);

      const data = await response.json();
      if (response.ok) {
        setPageStatus("success");
        setNotification(data.message);
        setSuccessSnackBarState(true);
        setOpenSubmitChangesModal(false);
      } else {
        setPageStatus("error");
        setNotification(data.message);
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error submitting changes", error);
      setPageStatus("error");
      setNotification("An unexpected error occurred. Please try again.");
      setFailedSnackBarState(true);
    }
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

  //handle submit for article creation
  const handleSubmitArticleTitle = async () => {
    const formPayload = new FormData();
    formPayload.append("article_title", articleTitle.article_title);
    formPayload.append("slug", articleTitle.slug);
    formPayload.append("news_type", articleTitle.news_type);
    formPayload.append("is_Active", articleTitle.is_Active);

    const articleThumbnail = document.getElementById("article_thumbnail");

    if (articleThumbnail.files.length > 0) {
      formPayload.append("article_thumbnail", articleThumbnail.files[0]);
    }

    try {
      const response = await fetch(`${VITE_API_URL}/page/upload-title-slug`, {
        method: "POST",
        credentials: "include",
        body: formPayload,
      });

      const data = await response.json();
      if (response.ok) {
        setPageStatus("success");
        setNotification(data.message);
        setSuccessSnackBarState(true);
        setPageTitleModal(false);
        fetchNewsAndUpdates(); // Refresh the news list
        navigate(`/news-update/${articleTitle.slug}`);
      }
    } catch (error) {
      console.log("Error submitting article title", error);
      setPageStatus("error");
      setNotification(error.message);
      setFailedSnackBarState(true);
    }
  };

  const handleSaveChanges = async (id) => {
    // Implement the logic to save changes to the edited news item
    try {
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
        setOpenEdittingDialog(false);
        setTimeout(() => setOpenEdittingModal(false), 150);
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
  };

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

  const handleDeleteCard = async (id) => {
    try {
      const response = await fetch(`${VITE_API_URL}/page/delete-news/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setNotification("News item deleted successfully.");
        setPageStatus("success");
        setSuccessSnackBarState(true);
        fetchNewsAndUpdates();
        setOpenDeleteModal(false);
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setPageStatus("error");
        setNotification("Failed to delete news item. Please try again.");
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error while deleting the card.", error);
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

  //get all the feautured cards
  const getFeaturedCardsIDs = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/page/get-featured-news`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const ids = data.rows.map((item) => item.newsID);
        setSelectedFeatureCard(ids);
        setOriginalIDs(ids);
      }
    } catch (error) {
      console.log("Error fetching featured cards IDs", error);
    }
  };
  useEffect(() => {
    getFeaturedCardsIDs();
  }, []);

  //memoized value for selected featured cards
  const featuredCards = useMemo(() => {
    return new Set(selectedFeatureCard);
  }, [selectedFeatureCard]);

  const hasChanged = useMemo(() => {
    //checking the length first
    if (originalIDs.length !== selectedFeatureCard.length) return true;

    //setting the Set function
    const originalSet = new Set(originalIDs);

    //check if the content is the same

    return !selectedFeatureCard.every((id) => originalSet.has(id));
  });

  console.log("Selected Card for editing: ", originalIDs);

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
                  <button id="add-news-button" onClick={handleShowTypeofNews}>
                    Add News
                  </button>

                  {hasChanged && (
                    <Tooltip title="Submit Changes">
                      <Button
                        variant="outline-success"
                        className="rounded-pill"
                        onClick={handleOpenSubmitChangesDialog}
                      >
                        Submit Changes
                      </Button>
                    </Tooltip>
                  )}
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

                {/* Modal of chosen type of news and Update */}
                {openTypeOfNews && (
                  <Modal
                    size="md"
                    centered
                    show={openTypeOfNews}
                    onHide={handleCloseShowTypeofNews}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Choose Type of News and Update
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="choose-type-buttons">
                        <Button
                          variant="outline-primary"
                          onClick={handleOpenPageTitleModal}
                        >
                          Write Article
                        </Button>
                        <Button variant="outline-primary" onClick={handleShow}>
                          Upload a Document
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}

                {pageTitleModal && (
                  <Modal
                    size="md"
                    centered
                    show={pageTitleModal}
                    onHide={handleClosePageTitleModal}
                  >
                    <Modal.Header>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Title of your News and/Or Article
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formPageTitle">
                          <Form.Label>Your Page Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your page title"
                            onChange={(e) => {
                              const article_title_value = e.target.value;
                              const slug_value = article_title_value
                                .toLowerCase()
                                .trim()
                                .replace(/[^a-z0-9\s-]/g, "")
                                .replace(/\s+/g, "-"); // replace spaces with hyphens

                              setArticleTitle({
                                ...articleTitle,
                                article_title: article_title_value,
                                slug: slug_value,
                              });
                            }}
                          />
                          <Form.Text className="text-muted">
                            Your page title will be your slug.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formPageThumbnail">
                          <Form.Label>Your Thumbnail</Form.Label>
                          <Form.Control
                            type="file"
                            placeholder="Enter your page title"
                            id="article_thumbnail"
                            onChange={(e) => {
                              setArticleTitle({
                                ...articleTitle,
                                article_thumbnail: e.target.files[0],
                              });
                            }}
                            accept="image/png, image/jpeg, image/svg+xml"
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <div className="add-article-modal-buttons">
                        <Button
                          variant="success"
                          onClick={handleSubmitArticleTitle}
                        >
                          {" "}
                          Submit{" "}
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={handleClosePageTitleModal}
                        >
                          {" "}
                          Close{" "}
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Modal>
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
                <Button
                  variant="outline-success"
                  onClick={() => handleOpenEdittingDialog(selectedEditCard)}
                >
                  Update
                </Button>
                <Button variant="secondary" onClick={handleCloseEdittingModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          {/* Dialog for confirming status change */}
          {openEdittingDialog && selectedEditCard && (
            <BootstrapDialog
              onClose={handleCloseEdittingDialog}
              aria-labelledby="customized-dialog-title"
              open={openEdittingDialog}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Update the following card for the {selectedEditCard.title}
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseEdittingDialog}
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
                  Are you sure you want to change this card of news and update?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  variant="outline-success"
                  onClick={() => handleSaveChanges(selectedEditCard.id)}
                >
                  Save changes
                </Button>
              </DialogActions>
            </BootstrapDialog>
          )}

          {/* Modal for deletion */}
          {openDeleteModal && itemToDelete && (
            <BootstrapDialog
              onClose={handleCloseDeleteDialog}
              aria-labelledby="customized-dialog-title"
              open={openDeleteModal}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Delete the following card for the {itemToDelete.title}
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseDeleteDialog}
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
                  Are you sure you want to delete this card of news and update?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outline-danger"
                  autoFocus
                  onClick={() => handleDeleteCard(itemToDelete.id)}
                >
                  Delete
                </Button>
              </DialogActions>
            </BootstrapDialog>
          )}

          {/* For submitting featured news changes */}
          {auth.isAuthenticated &&
            (auth.user.role === "editor" || auth.user.role === "admin") && (
              <BootstrapDialog
                onClose={handleCloseSubmitChangesDialog}
                aria-labelledby="customized-dialog-title"
                open={openSubmitChangesModal}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Submit Changes in featured News
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseSubmitChangesDialog}
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
                    Are you sure you want to update the featured news?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    variant="outline-success"
                    onClick={handleSubmitChanges}
                  >
                    Save changes
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            )}

          {/* for changing the status of the card */}
          {showDialog && (
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
                      <div id="thumbnail-wrapper">
                        <img
                          id="thumbnail-images"
                          src={`${VITE_API_URL}/uploads/thumbnail/${newsItem.thumbnail}`}
                          loading="lazy"
                          alt="News Thumbnail"
                          className="news-thumbnail"
                        />
                      </div>

                      <div id="news-and-update-card-details">
                        <div id="news-and-update-card-title">
                          <h3>{newsItem.title}</h3>

                          <div className="admin-buttons-wrapper">
                            <Tooltip title="Delete">
                              <Button
                                variant="outline-danger"
                                onClick={() => handleOpenDeleteModal(newsItem)}
                              >
                                {" "}
                                <BsFillTrashFill />{" "}
                              </Button>
                            </Tooltip>
                            <Tooltip title="Edit page">
                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  handleOpenEdittingModal(newsItem)
                                }
                              >
                                <AiTwotoneEdit />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Add to Feature">
                              <Button
                                variant={
                                  featuredCards.has(newsItem.id)
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

                        <div id="staff-action-buttons">
                          <div id="read-more-button-wrapper">
                            {newsItem.type === "file" ? (
                              /* OPTION A: It is a File (PDF) */
                              /* Use standard <a> tag to open in new tab */
                              <a
                                href={`${VITE_API_URL}/uploads/pdfFile/${newsItem.unique_filename}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-custom-outline" // Use your css class
                              >
                                View Document
                              </a>
                            ) : (
                              /* OPTION B: It is a Page (Article) */
                              /* Use React Router <Link> for instant, no-refresh loading */
                              <Link
                                to={`/news-updates/${newsItem.slug}`}
                                className="btn-custom-outline" // Use your css class
                              >
                                Read Article
                              </Link>
                            )}
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
                      <div id="thumbnail-wrapper">
                        <img
                          id="thumbnail-images"
                          src={`${VITE_API_URL}/uploads/thumbnail/${newsItem.thumbnail}`}
                          loading="lazy"
                          alt="News Thumbnail"
                          className="news-thumbnail"
                        />
                      </div>

                      <div id="news-and-update-card-details">
                        <div id="news-and-update-card-title">
                          <h3>{newsItem.title}</h3>
                        </div>
                        <div id="news-and-update-card-content">
                          <p>{newsItem.news_description}</p>
                          <p>Issued Date: {newsItem.issued_date}</p>
                        </div>
                        <div id="read-more-button-wrapper">
                          {newsItem.type === "file" ? (
                            /* OPTION A: It is a File (PDF) */
                            /* Use standard <a> tag to open in new tab */
                            <a
                              href={`${VITE_API_URL}/uploads/pdfFile/${newsItem.unique_filename}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-custom-outline" // Use your css class
                            >
                              View Document
                            </a>
                          ) : (
                            /* OPTION B: It is a Page (Article) */
                            /* Use React Router <Link> for instant, no-refresh loading */
                            <Link
                              to={`/news-updates/${newsItem.slug}`}
                              className="btn-custom-outline" // Use your css class
                            >
                              Read Article
                            </Link>
                          )}
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
