import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout.jsx";
import { useAuth } from "../utils/AuthContext.jsx";
import "../styles/Profile.css";
//imports from MUI
import {
  Avatar,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//imports from react-bootstrap
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

const Profile = () => {
  const { auth } = useAuth();
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [pageStatus, setPageStatus] = useState("idle");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [openUpdateInfoModal, setOpenUpdateInfoModal] = useState(false);
  const [updatePayload, setUpdatePayload] = useState({
    firstname:  "",
    lastname:  "",
    email:  "",
    username: "",
  });

  const handleOpenUpdateInfoModal = () => setOpenUpdateInfoModal(true);
  const handleCloseUpdateInfoModal = () => setOpenUpdateInfoModal(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };
  //fetch the user information
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/user/get-user/${auth.user?.id}`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("Data: ", data);
      if (response.ok) {
        setUpdatePayload(data);
      }
    } catch (error) {
      console.log("Error Fetching User Profile.", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleOnUpdate = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/user/update-user-profile/${auth.user?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatePayload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setPageStatus("success");
        setNotificationMessage(data.message);
        setSuccessSnackBarState(true);
        fetchUserProfile();
        handleCloseUpdateInfoModal();
      } else {
        setPageStatus("error");
        setNotificationMessage(
          data.message || "Failed to update user information."
        );
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error updating user info:", error);
      setPageStatus("error");
      setNotificationMessage(error.message);
      setFailedSnackBarState(true);
    }
  };

  console.log("Auth in Profile:", updatePayload);
  return (
    <MainLayout>
      {pageStatus === "success" ? (
        <Snackbar
          open={successSnackBarState}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              margin: "1em",
              fontSize: "1em",
            }}
          >
            {notificationMessage}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={failedSnackBarState}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{
              width: "100%",
              margin: "1em",
              fontSize: "1em",
            }}
          >
            {notificationMessage}
          </Alert>
        </Snackbar>
      )}

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
              User Profile
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <div className="profile-container">
        <div className="profile-page">
          <Avatar className="profile-avatar">
            {updatePayload?.firstname ? updatePayload?.firstname[0] : "N"}
          </Avatar>
          <div className="user-profile-information">
            <div>
              <p className="welcome-message">
                Welcome, {updatePayload?.username ? updatePayload.username : "User"}
                !
              </p>
            </div>

            <div>
              <p className="profile-info">
                <Chip
                  label={
                    updatePayload?.role
                      ? updatePayload.role.charAt(0).toUpperCase() +
                        updatePayload.role.slice(1)
                      : ""
                  }
                  color="primary"
                  variant="outlined"
                  sx={{
                    px: 2,
                    py: 0,
                    fontSize: "1rem",
                    height: "auto",
                  }}
                />
              </p>
            </div>
          </div>
        </div>

        <Divider
          sx={{ height: 20, borderColor: "black", borderBottomWidth: 2 }}
          orientation="horizontal"
        />
      </div>

      <Container>
        <Form>
          <Form.Group>
            <Row>
              <Col md={6}>
                <Form.Label>Firstname: </Form.Label>
                <Form.Control
                  type="text"
                  value={updatePayload?.firstname || ""}
                  readOnly
                />
              </Col>
              <Col md={6}>
                <Form.Label>Lastname: </Form.Label>
                <Form.Control
                  type="text"
                  value={updatePayload?.lastname || ""}
                  readOnly
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6}>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={updatePayload?.email || ""}
                  readOnly
                />
              </Col>
              <Col md={6}>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  type="text"
                  value={updatePayload?.username || ""}
                  readOnly
                />
              </Col>
            </Row>

            <br />
          </Form.Group>
        </Form>
        <Row>
          <Col md={6} className="d-flex gap-2">
            <Button
              variant="outline-success"
              onClick={handleOpenUpdateInfoModal}
            >
              Update info
            </Button>
          </Col>
        </Row>
      </Container>

      {openUpdateInfoModal && (
        <Modal
          size="md"
          show={openUpdateInfoModal}
          onHide={handleCloseUpdateInfoModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Information for {updatePayload?.firstname}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Label>Firstname: </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={updatePayload.firstname || ""}
                        onChange={(e) =>
                          setUpdatePayload({
                            ...updatePayload,
                            firstname: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Lastname: </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={updatePayload.lastname || ""}
                        onChange={(e) =>
                          setUpdatePayload({
                            ...updatePayload,
                            lastname: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={6}>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        value={updatePayload.email || ""}
                        onChange={(e) =>
                          setUpdatePayload({
                            ...updatePayload,
                            email: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Username: </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={updatePayload.username || ""}
                        onChange={(e) =>
                          setUpdatePayload({
                            ...updatePayload,
                            username: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseUpdateInfoModal}>Close</Button>
            <Button variant="outline-success" onClick={handleOnUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </MainLayout>
  );
};

export default Profile;
