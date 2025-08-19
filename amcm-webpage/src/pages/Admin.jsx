import {lazy, Suspense} from 'react'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/Admin.css'


const AccountManagement = lazy(() => import ("../components/AccountManagement"))

const Admin = () => {
        const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];
  return (
<div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
         <Suspense fallback={    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full screen height
        width: "100vw",  // full screen width
      }}
    >
      <CircularProgress size={30} />
    </div>}>
           <AccountManagement />
         </Suspense>

        </div>

        {/* Footer section */}
        <Footer />
      </div>

      <div className="seventh-grid">
        <div id="seventh-grid-body">
          <img
            id="symbol"
            src="/adventist-symbol--white.png"
            alt="Seventh Grid"
          />
        </div>
      </div>
    </div>
  )
}

export default Admin
