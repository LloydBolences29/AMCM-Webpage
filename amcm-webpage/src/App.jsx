import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";


//imports
import { AuthProvider } from "./utils/AuthContext";
import Home from "./pages/Home";
import PatientRights from "./components/PatientRights";
import AppointmentScheduling from './components/AppointmentScheduling';
import Services from "./pages/Services";
import Login from "./pages/Login"
import Editor from "./pages/Editor"
import Admin from "./pages/Admin"
import FindDoctors  from "./pages/FindDoctors"
import AdmissionAndBilling from "./pages/AdmissionAndBilling";
import OnlinePatientSurvey from "./pages/OnlinePatientSurvey";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ServiceDetailRenderer from "./components/ServiceDetailRenderer";
import SearchPage from "./components/SearchPage";
import NewsAndUpdate from './pages/NewsAndUpdate';
function App() {

  return (
    <>
      <AuthProvider>
            <Routes>
              {/* Routes for public pages */}
              <Route path="/" element={<Home />} />
              <Route path="patient-rights" element={<PatientRights />} />
              <Route path="/services" element={<Services />} />
              <Route path='/appointment-schedule' element={<AppointmentScheduling />} />
              <Route path="/login" element={<Login />} />
              <Route path="/find-doctors" element = {<FindDoctors />} />
              <Route path='/billing-admission' element={<AdmissionAndBilling />} />
              <Route path="/online-patient-survey" element={<OnlinePatientSurvey />} />
              <Route path='/about-us' element={<AboutUs />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/news-updates" element={<NewsAndUpdate />} />
              {/* <Route path="/about" element={<About />} /> */}

              {/* Route for services detail */}
              <Route path="/service/:id" element={<ServiceDetailRenderer />} />
  
              {/* Route for editors*/}
              <Route element={<ProtectedRoutes allowedRoles={["editor", "admin"]} />}>
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
