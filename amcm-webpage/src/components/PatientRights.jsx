import { useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SeventhGrid from "./SeventhGrid";
import "../styles/PatientRights.css";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
const PatientRights = () => {
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "Billing and Admission", path: "/billing-admission" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },
  ];

  // Sample accordion data
  const accordionData = [
    {
      title: "Right to Quality Healthcare",
      content:
        "You have the right to receive timely, appropriate, and high-quality medical care, free from discrimination based on race, gender, religion, nationality, or financial status.",
      reference:
        "Legal Reference: Republic Act No. 8344 – Prohibiting hospitals from refusing treatment in emergency cases.",
    },
    {
      title: "Right to Informed Consent",
      content:
        "You have the right to be fully informed about your medical condition, available treatment options, potential risks, and alternative procedures before making healthcare decisions. Your consent is required before any medical procedure, except in emergencies.",
      reference:
        "Legal Reference: DOH Patient’s Bill of Rights and Obligations.",
    },
    {
      title: "Right to Privacy and Confidentiality",
      content:
        "Your medical records and personal health information will be kept confidential and will only be shared with authorized personnel, with your consent, or as required by law.",
      reference: "Legal Reference: Data Privacy Act of 2012 (RA 10173).",
    },
    {
      title: "Right to Access Medical Records",
      content:
        "You have the right to review your medical records and obtain copies upon request. You may also authorize another person to access your records on your behalf.",
      reference:
        "Hospital Policy: Requests for medical records must be submitted in writing to the Medical Records Section, subject to hospital procedures and legal guidelines.",
    },
    {
      title: "Right to Choose Your Healthcare Provider",
      content:
        "You have the right to select your attending physician, seek a second opinion, or transfer to another hospital when medically feasible.",
      reference:
        "Hospital Policy: Transfers will be coordinated through the Patient Relations Office to ensure continuity of care.",
    },
    {
      title: "Right to Refuse Treatment",
      content:
        "You have the right to refuse any medical treatment, as long as you are mentally competent and fully informed of the risks. However, this right does not apply in cases of communicable diseases that pose a public health risk.",
      reference: "Legal Reference: DOH Guidelines on Patient Autonomy.",
    },
    {
      title: "Right to Emergency Care",
      content:
        "You have the right to receive emergency medical care at any time, regardless of your financial capacity or hospital deposit requirements.",
      reference: "Legal Reference: Republic Act No. 8344.",
    },
    {
      title: "Right to respect and Dignity",
      content:
        "You will be treated with dignity, respect, and compassion by our healthcare team, regardless of your medical condition or personal circumstances.",
      reference: "",
    },
    {
      title: "Right to a Safe and Clean Environment",
      content:
        "You have the right to receive care in a safe, clean, and well-maintained facility that adheres to hospital safety protocols and infection control measures",
      reference: "",
    },
    {
      title: "Right to File Complaints and Seek Redress",
      content:
        "If you have concerns regarding your treatment or hospital experience, you may file a complaint with the Patient Relations Office or the Hospital Administrator. Your concerns will be addressed promptly and fairly.",
      reference:
        "Legal Reference: The Philippine Medical Act & DOH Patient’s Bill of Rights.",
    },
  ];

  // State to track which accordion is expanded (only one at a time)
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpansion = (index) => () => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="home-body">
      <div className="home-content">
        <Navigation menuLinks={menuLinks} />
        <div className="main container">
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
                  sx={{ color: "#ffffffff" }}
                >
                  Patient Rights
                </Typography>
              </CardContent>
            </Card>
          </Container>

          <div className="accordion-container">
            <div className="accordion-wrapper">
              {accordionData.map((accordion, index) => (
                <Accordion
                  key={index}
                  expanded={expandedIndex === index}
                  onChange={handleExpansion(index)}
                  slots={{ transition: Fade }}
                  slotProps={{ transition: { timeout: 500 } }}
                  sx={[
                    expandedIndex === index
                      ? {
                          [`& .${accordionClasses.region}`]: {
                            height: "auto",
                          },
                          [`& .${accordionDetailsClasses.root}`]: {
                            display: "block",
                          },
                        }
                      : {
                          [`& .${accordionClasses.region}`]: {
                            height: 0,
                          },
                          [`& .${accordionDetailsClasses.root}`]: {
                            display: "none",
                          },
                        },
                  ]}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography component="span">{accordion.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{accordion.content}</Typography>
                    {accordion.reference && (
                      <Typography variant="caption" color="textSecondary">
                        {accordion.reference}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>

          <div className="file-complaint-instruction">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 3,
                  width: "82vw",
                  minHeight: "auto",
                },
                justifyContent: "center",
              }}
            >
              <Paper elevation={6} sx={{ overflow: "hidden" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ p: 2 }}
                  color="textSecondary"
                >
                  How to File a Complaint:
                </Typography>
                <Typography variant="body1" sx={{ p: 2 }}>
                  Visit the Patient Experience Office (located at G/F Annex
                  Building) Call [8525 9191 to 98 local 143/ 193] Email
                  [customercare@adventisthealth-mnl.com] Contact the Department
                  of Health (DOH) Hotline: 1555 Adventist Medical Center Manila
                  values your trust, and we are dedicated to ensuring your
                  health and well-being. Your safety and satisfaction are our
                  priorities. For further inquiries or assistance, please
                  contact us at [(02) 8525 9191-98].
                </Typography>
              </Paper>
            </Box>
          </div>
        </div>
        <Footer />
      </div>
      <div className="seventh-grid">
        <SeventhGrid />
      </div>
    </div>
  );
};

export default PatientRights;
