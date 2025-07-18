import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Overlay.css";

export const Overlay = ({ menuLinks, visible, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTimer, setModalTimer] = useState(3);

  const navigate = useNavigate(); // ✅ make sure this is included

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
            </ul>
          </div>
        </div>

        <br />

        <div className="sda-logo-container">
          <img
            className="sda-logo"
            src="/adventist-symbol--white.png"
            alt="sda-logo"
          />
        </div>

        <br />
        <div className="motto">
          <p className="motto-content" id="mission">Sharing Jesus Christ's Healing Ministry</p>
          <p className="motto-content" id="vision">
            The Center of Excellence in Faith-based Healthcare, Education and
            Lifestyle
          </p>
        </div>

        <br />

        <div className="learn-more-section">



        </div>




      </div>
    </div>
  );
};

export default Overlay;
