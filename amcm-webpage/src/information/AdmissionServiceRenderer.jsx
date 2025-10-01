import { lazy, Suspense, useEffect, useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import { BsList } from "react-icons/bs";
import BurgerMenu from "../components/BurgerMenu";
import EKGSpinner from "../components/EKGSpinner";
import './AdmissionServiceRenderer.css'

const AdmissionServiceRenderer = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMenuClick = (menu) => setActivePageMenu(menu);

    const AccreditedPartnersComponent = lazy(() => import("../Admission/AccreditedPartners"));
    const DoctorsClinicComponent = lazy(() => import("../Admission/DoctorsClinic"));
    const HealthCheckUpPackagesComponent = lazy(() => import("../Admission/HealthCheckUpPackages"));
    const ImmunizationComponent = lazy(() => import("../Admission/Immunization"));
    const WomensHealthUltrasoundComponent = lazy(() => import("../Admission/WomenHealthUltrasound"));

    const tabs = [
        {
            value: "1",
            label: "Accredited Partners"
        },
        {
            value: "2",
            label: "Doctor's Clinic"
        },
        {
            value: "3",
            label: "Health Check Up Packages"
        },
        {
            value: "4",
            label: "Immunization"
        },
        {
            value: "5",
            label: "Women's Health Ultrasound"
        },
    ]


    return (
        <div>

            <button className="menu-button" onClick={() => setIsMenuOpen(true)}>
                <BsList />
                <span>Menu</span>
            </button>

            <BurgerMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                pageMenus={tabs}
                onMenuClick={handleMenuClick}
            />

            <div id="tabs">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <TabList onChange={handleChange} >
                            {tabs.map((tab) => (
                                <Tab onClick={() => setValue(tab.value)} label={tab.label} value={tab.value} />
                            ))}
                        </TabList>
                    </Box>
                </TabContext>
            </div>

            {value === "1" ? (
                <Suspense fallback={<div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        width: "100vw",
                    }}
                >
                    <EKGSpinner />
                </div>}>
                    <AccreditedPartnersComponent />
                </Suspense>)
                : value === "2" ? (
                    <Suspense fallback={<div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            width: "100vw",
                        }}
                    >
                        <EKGSpinner />
                    </div>}>
                        <DoctorsClinicComponent />
                    </Suspense>)
                    : value === "3" ? (
                        <Suspense fallback={<div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                                width: "100vw",
                            }}
                        >
                            <EKGSpinner />
                        </div>}>
                            <HealthCheckUpPackagesComponent />
                        </Suspense>)

                        : value === "4" ? (<Suspense fallback={<div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                                width: "100vw",
                            }}
                        >
                            <EKGSpinner />
                        </div>}>
                            <ImmunizationComponent />
                        </Suspense>)
                            : value === "5" ? (<Suspense fallback={<div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100vh",
                                    width: "100vw",
                                }}
                            >
                                <EKGSpinner />
                            </div>}>
                                <WomensHealthUltrasoundComponent />
                            </Suspense>)
                                : <>
                                    <p>There is no page available.</p>
                                </>}

        </div>
    )
}

export default AdmissionServiceRenderer
