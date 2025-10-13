import { lazy, Suspense, useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import EKGSpinner from "../components/EKGSpinner";
import "./PMRRenderer.css"

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
const PMRRenderer = () => {
    const [value, setValue] = useState("1")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const PMRHome = lazy(() => import("../PMR/PMR"))
    const PhysicalTherapy = lazy(() => import("../PMR/PhysicalTherapy"))
    const OccupationalTherapy = lazy(() => import("../PMR/OccupationalTherapy"))
    const HomeCareServices = lazy(() => import("../PMR/HomeCareServices"))

    const tabs = [
        {
            value: "1",
            label: "Physical Medicine and Rehabilitation (PMR)",
        },
        {
            value: "2",
            label: "Physical Therapy",
        },
        {
            value: "3",
            label: "Occupational Therapy",
        },
        {
            value: "4",
            label: "Home Care Services",
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
                            Physical Medicine and Rehabilitation Services
                        </Typography>
                    </CardContent>
                </Card>
            </Container>

            <div className="burger-menu-container">
                <Navbar expand="xxl" className="bg-body-primary">
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

            {value === "1" && (
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
                    <PMRHome />
                </Suspense>
            )}
            {value === "2" && (
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
                    <PhysicalTherapy />
                </Suspense>
            )}
            {value === "3" && (
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
                    <OccupationalTherapy />
                </Suspense>
            )}
            {value === "4" && (
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
                    <HomeCareServices />
                </Suspense>
            )}





        </div>
    )
}

export default PMRRenderer
