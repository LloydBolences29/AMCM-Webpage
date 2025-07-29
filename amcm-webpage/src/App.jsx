import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";


//imports
import { AuthProvider } from "./utils/AuthContext";
import Home from "./pages/Home";
import PatientBusiness from "./components/PatientBusiness";
import AppointmentScheduling from './components/AppointmentScheduling';
import Services from "./pages/Services";
import Login from "./pages/Login"
import Editor from "./pages/Editor"
import Admin from "./pages/Admin"
import FindDoctors  from "./pages/FindDoctors"

function App() {

  return (
    <>
      <AuthProvider>
            <Routes>
              {/* Routes for public pages */}
              <Route path="/" element={<Home />} />
              <Route path="patient-business" element={<PatientBusiness />} />
              <Route path="/services" element={<Services />} />
              <Route path='/appointment-schedule' element={<AppointmentScheduling />} />
              <Route path="/login" element={<Login />} />
              <Route path="/find-doctors" element = {<FindDoctors />} />
              {/* <Route path="/about" element={<About />} /> */}
  
              {/* Route for editors*/}
              <Route element={<ProtectedRoutes allowedRoles={["editor"]} />}>
                <Route path="/editor" element={<Editor />} />
              </Route>
      
              {/* Route for admin  */}
              <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<Admin />} />
      
                {/* <Route path="/users" element={<UserManagement />} /> */}
              </Route> 
            </Routes>
          </AuthProvider>
    </>
  )
}

export default App
