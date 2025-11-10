import { useEffect, useState } from "react";
import Mainlayout from "../components/MainLayout";
import EKGSpinner from "../components/EKGSpinner";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

//imports of bootstrap
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

const ChangePassword = () => {
  const { loading, auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.newPassword !== newPassword.confirmNewPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${VITE_API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: auth.user?.email,
          newPassword: newPassword.newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok){
        setSuccessMessage(data.message);
        setErrorMessage("");
        console.log("Password changed successfully:", data);
        setAuth((prev) => ({
          ...prev, loading: false, requirePasswordChange: false
        }));

        setIsSuccess(true);

      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  useEffect(() => {
    if (isSuccess && auth.isAuthenticated && !auth.requirePasswordChange) {
      

      switch (auth.user?.role) {
        case "admin":
          navigate("/admin");
          break;
        case "editor":
          navigate("/editor");
          break;
        default:
          navigate("/");
      }
    }
  },[isSuccess, auth.isAuthenticated, auth.requirePasswordChange]);

  console.log("Require password change:", auth.user?.role);
  return (
    <>
      <Mainlayout>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <EKGSpinner />
          </div>
        ) : (
          <Container>
            <div>
              <h2>Change Your Password</h2>
            </div>
            <Form onSubmit={handleChangePassword}>
              <Form.Group as={Row} className="mb-3" controlId="formNewPassword">
                <Form.Label column sm={2}>
                  New Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange ={(e) => setNewPassword({...newPassword, newPassword: e.target.value})}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formConfirmPassword"
              >
                <Form.Label column sm={2}>
                  Confirm Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    onChange={(e) => setNewPassword({...newPassword, confirmNewPassword: e.target.value})}
                  />
                </Col>
              </Form.Group>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              <Button variant="outline-primary" type="submit">
                Change Password
              </Button>
            </Form>
          </Container>
        )}
      </Mainlayout>
    </>
  );
};

export default ChangePassword;
