import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const PatientServices = () => {
  const services = [
    {
      id: "dental-card",
      image: "/dental-profile.jpg",
      title: "Dental",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "diagnostic-imaging-services-card",
      image: "/dental-profile.jpg",
      title: " Diagnostic Imaging Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "emergency-room-card",
      image: "/dental-profile.jpg",
      title: "Emergency Room",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "medical-services-card",
      image: "/dental-profile.jpg",
      title: "Medical Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "opd-services-card",
      image: "/dental-profile.jpg",
      title: "Outpatient Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "patientBusiness-services-card",
      image: "/dental-profile.jpg",
      title: "Patient Business Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "pathAndLab-services-card",
      image: "/dental-profile.jpg",
      title: "Pathology and Laboratory Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "pastoralCare-services-card",
      image: "/dental-profile.jpg",
      title: "Pastoral Care Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "physicalMed-services-card",
      image: "/dental-profile.jpg",
      title: "Physical Medicine and Rehabilitation Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "pharmacy-services-card",
      image: "/dental-profile.jpg",
      title: "Pharmacy Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "medicalRecords-services-card",
      image: "/dental-profile.jpg",
      title: "Medical Records Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "renal-services-card",
      image: "/dental-profile.jpg",
      title: "Renal Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "renal-services-card",
      image: "/dental-profile.jpg",
      title: "Renal Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
  ];
  return (
    <div id="services-card-wrapper">
      <br />
      <div id="patient-services-wrapper">
        <Divider className="divider">
          <Chip label="Patient Services" size="large" />
        </Divider>

        <div className="services-card">
          {services.map((service) => (
            <div key={service.id} id={service.id}>
              <Card className="services-card-content" sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" href={service.link}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientServices;
