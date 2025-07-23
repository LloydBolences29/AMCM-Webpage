import React, { useState } from "react";
import "../styles/Navigation.css";
import { BsSearch, BsList } from "react-icons/bs";
import Overlay from "./Overlay";

const Navigation = ({ menuLinks }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenDrawer = () => setIsOverlayOpen(true);
  const handleCloseDrawer = () => setIsOverlayOpen(false);

  return (
    <div className="header">
      <div className="logo-container">
        <div className="amcm-logo-wrapper">
          <img
            className="amcm-logo"
            src="https://adventisthealth-mnl.com/wp-content/uploads/2024/06/AMCM-Logo-small2-1.webp"
            alt="AMCM Logo"
          />
        </div>
      </div>

      <div className="header-menu">
        <div id="main-menu-wrapper">
          <div className="search">
            <button className="search-button" onClick={handleOpenDrawer}>
              <BsSearch />
              <span className="btn-name">Search</span>
            </button>
          </div>
          <div className="menu">
            <button className="menu-button" onClick={handleOpenDrawer}>
              <BsList />
              <span className="btn-name">Menu</span>
            </button>
          </div>
        </div>
        <div id="page-menu">
          <div id="our-services">
            <a href="/our-services" className="page-link">
              Our Services
            </a>
          </div>
        </div>
      </div>

      <Overlay
        menuLinks={menuLinks}
        visible={isOverlayOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default Navigation;
