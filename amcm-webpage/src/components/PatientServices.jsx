import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
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
      link: "/service/dental",
    },
    {
      id: "diagnostic-imaging-services-card",
      image: "/dental-profile.jpg",
      title: " Diagnostic Imaging Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/diagnostic-imaging-service",
    },
    {
      id: "emergency-room-card",
      image: "/dental-profile.jpg",
      title: "Emergency Room",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/emergency-room",
    },
    {
      id: "medical-services-card",
      image: "/dental-profile.jpg",
      title: "Medical Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/medical-service",
    },
    {
      id: "opd-services-card",
      image: "/dental-profile.jpg",
      title: "Outpatient Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/opd-service",
    },
    {
      id: "patientBusiness-services-card",
      image: "/dental-profile.jpg",
      title: "Patient Business Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/patient-business-service",
    },
    {
      id: "pathAndLab-services-card",
      image: "/dental-profile.jpg",
      title: "Pathology and Laboratory Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/pathology-laboratory-service",
    },
    {
      id: "pastoralCare-services-card",
      image: "/dental-profile.jpg",
      title: "Pastoral Care Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/pastoral-care-service",
    },
    {
      id: "physicalMed-services-card",
      image: "/dental-profile.jpg",
      title: "Physical Medicine and Rehabilitation Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/physical-medicine-rehabilitation-service",
    },
    {
      id: "pharmacy-services-card",
      image: "/dental-profile.jpg",
      title: "Pharmacy Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/pharmacy-service",
    },
    {
      id: "medicalRecords-services-card",
      image: "/dental-profile.jpg",
      title: "Medical Records Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/medical-records-service",
    },
    {
      id: "renal-services-card",
      image: "/dental-profile.jpg",
      title: "Renal Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/renal-service",
    }
  ];
  return (
    <div id="patient-services-wrapper" className="service-content">
      <Divider className="divider">
        <Chip id="chip" label="Patient Services" size="medium" />
      </Divider>

      <div className="services-card">
        {services.map((service) => (
          <div key={service.id} id={service.id}>
            <Card className="services-card-content" sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  loading="lazy"
                  component="img"
                  height="140"
                  image={service.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" >
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "textSecondary"}}>
                    {service.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" href={service.link} >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientServices;
