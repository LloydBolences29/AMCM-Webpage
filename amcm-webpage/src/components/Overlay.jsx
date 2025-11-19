import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Modal from "react-bootstrap/Modal";

import "../styles/Overlay.css";

export const Overlay = ({ menuLinks, visible, onClose }) => {
    const navigate = useNavigate(); // ✅ make sure this is included
  const { auth, setAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalTimer, setModalTimer] = useState(3);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  console.log("Overlay auth state: ", auth.user?.requirePasswordChange);
  useEffect(() => {
    if (visible) {
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable when closed
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount (important!)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

const additionalLinks = useMemo(() => {
    // If password change is required, ONLY return that link.
    if (auth.user?.requirePasswordChange) {
      return [
        {
          role: ["editor", "admin"],
          label: "Change Your Password",
          link: "/change-password",
        },
      ];
    }

    // If password change is NOT required, return the normal links.
    return [
      {
        role: "admin",
        label: "Admin Dashboard",
        link: "/admin",
      },
      {
        role: ["editor", "admin"],
        label: "Editor Dashboard",
        link: "/editor",
      },
      {
        role: ["editor", "admin"],
        label: "Profile",
        link: "/profile",
      },
    ];
  }, [auth.user?.requirePasswordChange]);


  
  const handleLogout = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/auth/logout`, {
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
        <div className="scroll-content">
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
                  <NavLink className="sidebar-link" to="/about-us">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink className="sidebar-link" to="/contact-us">
                    Contact
                  </NavLink>
                </li>
                {auth.isAuthenticated && (
                  <>
                    {additionalLinks.map((item) => {
                      const allowed = Array.isArray(item.role)
                        ? item.role.includes(auth.user?.role) // check if user's role is in the allowed roles
                        : auth.user?.role === item.role; // fallback for single role

                      if (allowed) {
                        return (
                          <li key={item.link}>
                            <NavLink className="sidebar-link" to={item.link}>
                              {item.label}
                            </NavLink>
                          </li>
                        );
                      }

                      return null;
                    })}
                  </>
                )}

                {auth.isAuthenticated ? (
                  <li>
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink className="sidebar-link" to="/login">
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

          <div className="sda-logo-container">
            <img
              className="sda-logo"
              src="/adventist-symbol--white.png"
              alt="sda-logo"
            />
          </div>

          <div id="second-section">
            <div className="motto">
              <p className="motto-content" id="mission">
                Sharing Jesus Christ's Healing Ministry
              </p>
              <p className="motto-content" id="vision">
                The Center of Excellence in Faith-based Healthcare, Education
                and Lifestyle
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
    </div>
  );
};

export default Overlay;
