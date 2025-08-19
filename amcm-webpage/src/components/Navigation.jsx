import React, { useState } from "react";
import "../styles/Navigation.css";
import { BsSearch, BsList } from "react-icons/bs";
import Overlay from "./Overlay";
import { useLocation } from "react-router-dom";

const Navigation = ({ menuLinks }) => {
const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenDrawer = () => setIsOverlayOpen(true);
  const handleCloseDrawer = () => setIsOverlayOpen(false);

  const pageMenus = [
    {
      id: "our-services",
      label: "Our Services",
      link: "/services",
    },
    {
      id: "find-doctors",
      label: "Find Doctors",
      link: "/find-doctors",
    },
    {
      id: "billing-and-admitting",
      label: "Billing and Admitting",
      link: "/billing-admission",
    },
    {
      id: "news-updates",
      label: "News and Updates",
      link: "/news-updates",
    },
    {
      id: "online-patient-survey",
      label: "Online Patient Survey",
      link: "/online-patient-survey",
    },
    {
      id: "about-us",
      label: "About Us",
      link: "/about-us",
    },
  ];

  return (
    <div className="header">
      <div className="logo-container">
        <div className="amcm-logo-wrapper">
          <a href="/">
          <img
            className="amcm-logo"
            loading="lazy"
            src="/AdventistMed.png"
            alt="AMCM Logo"
          />
          </a>
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
          {pageMenus.map((menu) => {
            return (
            <div key={menu.id} id={menu.id}>
              <a href={menu.link} className={`page-link ${isActive(menu.link) ? 'active' : ''}`}>
                {menu.label}
              </a>
            </div>
            );
          })}
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
