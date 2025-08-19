import {useState} from "react";
import { Button } from "react-bootstrap";
import Divider from '@mui/material/Divider';
import Table from 'react-bootstrap/Table';


const AccountManagement = () => {
    const [active , setActive] = useState("account-management")


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
    <div id="admin-content">
      <div id="menu-list">
        {buttons.map((button) => (
          <Button id="menu-list-button" key={button.id} variant={active === button.id ? "secondary" : "outline-secondary"} onClick={() => handleOnClick(button.id)} >
            {button.label}
          </Button>
        ))}
      </div>

      <Divider orientation="vertical" variant="middle" />



      <div id="admin-page-content">
              {active === "account-management" &&(
                <>
        <h1>this is the account management page</h1>
        </>

      ) }
      
      {active === "department-management"&& (
        <h1>this is the department management</h1>
      )}

      {active === "doctor-management" && (
        <h1>this is the doctor management</h1>

        
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
