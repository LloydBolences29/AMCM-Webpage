import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";


//imports
import { AuthProvider } from "./utils/AuthContext";
import Home from "./pages/Home";
import PatientBusiness from "./components/PatientBusiness";
import AppointmentScheduling from './components/AppointmentScheduling';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
            <Routes>
              {/* Routes for public pages */}
              <Route path="/" element={<Home />} />
              <Route path="patient-business" element={<PatientBusiness />} />
              <Route path='/appointment-schedule' element={<AppointmentScheduling />} />
              {/* <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} /> */}
      
              {/* Route for editors
              <Route element={<ProtectedRoutes allowedRoles={["editor"]} />}>
                <Route path="/editor" element={<Editor />} />
              </Route>
      
              Route for admin 
              <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<Admin />} />
      
                <Route path="/users" element={<UserManagement />} />
              </Route> */}
            </Routes>
          </AuthProvider>
    </>
  )
}

export default App
