import { lazy, Suspense, useEffect, useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';

import EKGSpinner from "../components/EKGSpinner";
import './AdmissionServiceRenderer.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const AdmissionServiceRenderer = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMenuClick = (menu) => setActivePageMenu(menu);

    const AdmissionProcessComponent = lazy(() => import("../Admission/AdmissionProcess"));
    const PatientRightsComponent = lazy(() => import("../Admission/PatientRights"));
    const PhilhealthClaimsComponent = lazy(() => import("../Admission/PhilhealthClaims"));
    const CreditandCollectionComponent = lazy(() => import("../Admission/CreditandCollection"));
    const SocialServicesComponent = lazy(() => import("../Admission/SocialServices"));

    const tabs = [
        {
            value: "1",
            label: "Admission Process"
        },
        {
            value: "2",
            label: "Patient Rights"
        },
        {
            value: "3",
            label: "Philhealth Claims"
        },
        {
            value: "4",
            label: "Credit and Collection"
        },
        {
            value: "5",
            label: "Social Services"
        },
    ]


    return (
        <div>

            <Container>
                <Card
                    sx={{
                        mb: 3,
                        textAlign: "center",
                        marginTop: "2em",
                        backgroundColor: "#163235ff",
                        borderRadius: "10px",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h4"
                            component="h1"
                            className="page-title fw-bold"
                            sx={{
                                color: "#ffffffff",
                                fontFamily: "Advent Sans, sans-serif",
                            }}
                        >
                            Admission Services
                        </Typography>
                    </CardContent>
                </Card>
            </Container>

            <div className="burger-menu-container">
                <Navbar expand="xl" className="bg-body-primary">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {tabs.map((tab) => (
                                    <Nav.Link key={tab.value} onClick={() => setValue(tab.value)}>{tab.label}</Nav.Link>
                                ))}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>



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
                    <AdmissionProcessComponent />
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
                        <PatientRightsComponent />
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
                            <PhilhealthClaimsComponent />
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
                            <CreditandCollectionComponent />
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
                                <SocialServicesComponent />
                            </Suspense>)
                                : <>
                                    <p>There is no page available.</p>
                                </>}

        </div>
    )
}

export default AdmissionServiceRenderer
