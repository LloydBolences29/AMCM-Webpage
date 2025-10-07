import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const PatientServices = () => {
  const services = [
    {
      id: "emergency-room-card",
      image: "/Emergency-Room.webp",
      title: "Emergency Room",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/emergency-room",
    },
    {
      id: "opd-services-card",
      image: "/opd.webp",
      title: "Outpatient Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/opd-service",
    },
    {
      id: "admission-services-card",
      image: "/admission.webp",
      title: "Admission Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/admission-service",
    },
    {
      id: "diagnostic-imaging-services-card",
      image: "/imaging.webp",
      title: " Diagnostic Imaging Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/diagnostic-imaging-service",
    },
    {
      id: "pharmacy-services-card",
      image: "/pharmacy.webp",
      title: "Pharmacy Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/pharmacy-service",
    },
    {
      id: "dental-card",
      image: "/dental.webp",
      title: "Dental",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/dental",
    },

    // {
    //   id: "medical-services-card",
    //   image: "/dental-profile.jpg",
    //   title: "Medical Services",
    //   description:
    //     "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
    //   link: "/service/medical-service",
    // },
    {
      id: "pathAndLab-services-card",
      image: "/pathAndLab.webp",
      title: "Pathology and Laboratory Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/pathology-laboratory-service",
    },
    {
      id: "pastoralCare-services-card",
      image: "/pastoral-care.webp",
      title: "Pastoral Care Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/pastoral-care-service",
    },
    {
      id: "physicalMed-services-card",
      image: "/physicalmed-and-rehab.webp",
      title: "Physical Medicine and Rehabilitation Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/physical-medicine-rehabilitation-service",
    },
    {
      id: "medicalRecords-services-card",
      image: "/med-records.webp",
      title: "Medical Records Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/medical-records-service",
    },
    {
      id: "renal-services-card",
      image: "/renal.webp",
      title: "Renal Services",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/renal-service",
    },
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
              <CardActionArea component="a" href={service.link}>
                <CardMedia
                  
                  component="img"
                  height="140"
                  image={service.image}
                  alt="green iguana"
                />
                {/* <CardContent>
                  <Typography variant="body2" sx={{ color: "textSecondary" }}>
                    {service.description}
                  </Typography>
                </CardContent> */}
              </CardActionArea>
              {/* <CardActions>
                <Button size="small" color="primary" href={service.link}>
                  Learn More
                </Button>
              </CardActions> */}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientServices;
