import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";


//imports
const EKGSpinner = lazy(() => import("./components/EKGSpinner"));
import { AuthProvider } from "./utils/AuthContext";
const Home = lazy(() => import("./pages/Home"));
const PatientRights = lazy(() => import("./components/PatientRights"));
const AppointmentScheduling = lazy(() => import("./components/AppointmentScheduling"));
const Services = lazy(() => import("./pages/Services"));
const Login = lazy(() => import("./pages/Login"));
const Editor = lazy(() => import("./pages/Editor"));
const Admin = lazy(() => import("./pages/Admin"))
const FindDoctors = lazy(() => import("./pages/FindDoctors"));
// import AdmissionAndBilling from "./pages/AdmissionAndBilling";
const OnlinePatientSurvey = lazy(() => import("./pages/OnlinePatientSurvey"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ServiceDetailRenderer = lazy(() => import("./components/ServiceDetailRenderer"));
const SearchPage = lazy(() => import("./components/SearchPage"));
const NewsAndUpdate = lazy(() => import("./pages/NewsAndUpdate"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));


function App() {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<div

          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <EKGSpinner />
        </div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="patient-rights" element={<PatientRights />} />
            <Route path="/services" element={<Services />} />
            <Route path='/appointment-schedule' element={<AppointmentScheduling />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find-doctors" element={<FindDoctors />} />
            {/* <Route path='/billing-admission' element={<AdmissionAndBilling />} /> */}
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
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>

            {/* Route for admin  */}
            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<Admin />} />

              {/* <Route path="/users" element={<UserManagement />} /> */}
            </Route>

          </Routes>
        </Suspense>
      </AuthProvider >
    </>
  )
}

export default App;