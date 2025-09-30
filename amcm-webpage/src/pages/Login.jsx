import React from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Login = () => {
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const navigate = useNavigate();
    const { setAuth } = useAuth();
  

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
      console.log("Login successful:", response.data);

      setAuth({
        loading: false,
        isAuthenticated: true,
        user: response.data.user,
      });
      switch (response.data.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "editor":
          navigate("/editor");
          break;
        default:
          navigate("/");
      }

      console.log("Role of the user:", response.data.user.role);

      // Clear the login form
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid email or password");
      setTimeout(() => {
        setLoginError("");
      }, 3000);
    }
  };
  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
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
              >
                Sign In
              </Button>
            </Form>
          </Container>
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

export default Login;
