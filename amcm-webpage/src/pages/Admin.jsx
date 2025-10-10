import { lazy, Suspense } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/Admin.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Divider from '@mui/material/Divider';
import EKGSpinner from "../components/EKGSpinner";
import MainLayout from "../components/MainLayout";


const AccountManagement = lazy(() => import("../components/AccountManagement"));
const DepartmentManagement = lazy(() => import("../components/DepartmentManagement"))
const DoctorManagement = lazy(() => import("../components/DoctorManagement"))
const Admin = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];

  const [active, setActive] = useState("account-management");

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const buttons = [
    {
      label: "Account Management",
      id: "account-management",
    },
    {
      label: "Department Management",
      id: "department-management",
    },
    {
      label: "Doctor Management",
      id: "doctor-management",
    },
  ];

  const handleOnClick = (id) => {
    setActive(id);
  };

  return (
    <MainLayout>
      <div id="admin-content">
        <div id="menu-list">
          {buttons.map((button) => (
            <Button
              id="menu-list-button"
              key={button.id}
              variant={
                active === button.id ? "secondary" : "outline-secondary"
              }
              onClick={() => handleOnClick(button.id)}
            >
              {button.label}
            </Button>
          ))}
        </div>

        <Divider orientation="vertical" variant="middle" />

        <div id="admin-page-content">
          {active === "account-management" && (
            <>
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                      width: "100vw",
                    }}
                  >
                    <EKGSpinner />
                  </div>
                }
              >
                <AccountManagement />
              </Suspense>
            </>
          )}

          {active === "department-management" && (
            <>
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                      width: "100vw",
                    }}
                  >
                    <EKGSpinner />
                  </div>
                }
              >
                <DepartmentManagement />
              </Suspense>
            </>
          )}

          {active === "doctor-management" && (
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                  }}
                >
                  <EKGSpinner />
                </div>
              }
            >
              <DoctorManagement />
            </Suspense>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
