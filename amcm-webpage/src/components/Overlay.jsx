import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Modal from "react-bootstrap/Modal";


import "../styles/Overlay.css";

export const Overlay = ({ menuLinks, visible, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTimer, setModalTimer] = useState(3);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://195.68.4.254:2000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          navigate("/login");
          setAuth({ isAuthenticated: false });
        }, 3000);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

    useEffect(() => {
    let timer;
    if (showModal && modalTimer > 0) {
      timer = setTimeout(() => {
        setModalTimer((prev) => prev - 1);
      }, 1000);
    } else if (modalTimer === 0) {
      setShowModal(false);
      setModalTimer(3);
    }
    return () => clearTimeout(timer);
  }, [showModal, modalTimer]);


  const navigate = useNavigate(); // ✅ make sure this is included
  const { auth, setAuth } = useAuth();

  const linksFunction = (item) => (
    <li key={item.path}>
      <NavLink
        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        to={item.path}
        onClick={onClose}
      >
        {item.label}
      </NavLink>
    </li>
  );

  return (
    <div className={`overlay-container ${visible ? "show" : ""}`}>
      <div className="overlay-background" onClick={onClose}></div>

      {visible && (
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      )}

      <div className="overlay-panel">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            autoFocus
            placeholder="Search..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const searchQuery = e.target.value;
                navigate(`/search?query=${searchQuery}`);
                onClose();
              }
            }}
          />
        </div>

        <div className="links">
          <div className="menu-links-wrapper component-links">
            <ul className="ul-menu-links">{menuLinks?.map(linksFunction)}</ul>
          </div>
          <br />

          <div className="menu-links-wrapper information-links">
            <ul className="ul-menu-links">
              <li>
                <NavLink className="sidebar-link" to="/about">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink className="sidebar-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              {auth.isAuthenticated ? (
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <NavLink className="sidebar-link" to="/login" >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>

         {/* ✅ Logout success modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Body className="text-center">
                <h4 className="mt-3">Logout Successful!</h4>
                <p>Closing in {modalTimer} seconds...</p>
              </Modal.Body>
            </Modal>

        <br />

        <div className="sda-logo-container">
          <img
            className="sda-logo"
            src="/adventist-symbol--white.png"
            alt="sda-logo"
          />
        </div>

        <br />
        <div id="second-section">
          <div className="motto">
            <p className="motto-content" id="mission">
              Sharing Jesus Christ's Healing Ministry
            </p>
            <p className="motto-content" id="vision">
              The Center of Excellence in Faith-based Healthcare, Education and
              Lifestyle
            </p>
          </div>

          <br />

          <div id="learn-more-section">
            <h5>Learn more:</h5>
            <div id="learn-more-content">
              <a href="">Adventist.org</a>
              <a href="">ADRA</a>
              <a href="">Adventist World Radio</a>
              <a href="">Hope Channel</a>
              <a href="">Adventist Hospital Santiago City</a>
              <a href="">Adventist Hospital Calbayog</a>
              <a href="">Adventist Hospital Palawan</a>
              <a href="">Adventist Hospital Cebu</a>
              <a href="">Adventist Medical Center Bacolod</a>
              <a href="">Gingoog Sanitarium and Hospital</a>
              <a href="">Adventist Medical Center Iligan</a>
              <a href="">ADventist Hospital Davao</a>
              <a href="">Adventist Medical Center Valencia</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
