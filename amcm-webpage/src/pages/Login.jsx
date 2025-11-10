import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import EKGSpinner from "../components/EKGSpinner";
import MainLayout from "../components/MainLayout";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const navigate = useNavigate();
  const { loading, auth, setAuth } = useAuth();
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [maxTriesReached, setMaxTriesReached] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!e.target[0].value || !e.target[1].value) {
      setLoginError("Please fill in all fields.");
      setTimeout(() => {
        setLoginError("");
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(
        `${VITE_API_URL}/auth/login`,
        loginData,
        { withCredentials: true }
      );

      const data = await response.data;
      if (response.status === 200) {
        console.log("Login successful:", data);
        if (data.requirePasswordChange) {
          setAuth({
            loading: false,
            isAuthenticated: true,
            user: data.user,
            requirePasswordChange: data.requirePasswordChange,
          });

          navigate("/change-password");
        } else {
          setAuth({
            loading: false,
            isAuthenticated: true,
            user: data.user,
            requirePasswordChange: data.requirePasswordChange,
          });

          switch (data.user.role) {
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

        console.log("Role of the user:", auth);

        // Clear the login form
        setLoginData({ email: "", password: "" });
      } else {
        setLoginError(response.data.error);
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 429) {
        // account locked
        setLoginError(error.response?.data?.message);
        setMaxTriesReached(true);
      } else if (error.response?.status === 401) {
        // invalid credentials
        const remaining = error.response?.data?.remainingAttempts;
        console.log("Remaining attempts:", remaining);
        setLoginError(
          remaining !== undefined
            ? `${error.response?.data?.message} (${
                remaining + 1
              } attempts left)`
            : error.response?.data?.error || "Login failed."
        );
      } else if (error.response?.status === 403) {
        // account inactive
        setLoginError(error.response?.data?.error);
      } else {
        setLoginError("An error occurred during login. Please try again.");
      }

      setTimeout(() => setLoginError(""), 3000);
    }
  };

  useEffect(() => {
    if (maxTriesReached) {
      const timer = setTimeout(() => {
        setMaxTriesReached(false);
        setNumberOfTries(0);
      }, 30000); //30 seconds lockout
      return () => clearTimeout(timer);
    }
  }, [maxTriesReached]);

  
  return (
    <MainLayout>
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
          {/* Login form */}
          <h2 className="mt-5">Login</h2>
          <Form className="mt-5" onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <span
                  variant="link"
                  size="sm"
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: 0,
                  }}
                  onClick={() => setShowLoginPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showLoginPassword ? (
                    <FaEyeSlash color="black" />
                  ) : (
                    <FaEye color="black" />
                  )}
                </span>
              </div>
            </Form.Group>
            {loginError && (
              <Alert variant="danger" className="mt-3">
                {loginError}
              </Alert>
            )}

            <Button
              type="submit"
              style={{ backgroundColor: "#007682", borderColor: "#007682" }}
              disabled={maxTriesReached}
            >
              Sign In
            </Button>
          </Form>
        </Container>
      )}
    </MainLayout>
  );
};

export default Login;
