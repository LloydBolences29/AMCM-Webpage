import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const NonPatientServices = () => {
  const services = [
    {
      id: "automo-washko-card",
      image: "/dental-profile.jpg",
      title: "Auto Mo, Wash Ko",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "healthyBites-card",
      image: "/dental-profile.jpg",
      title: "Healthy Bites",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "guest-rooms-card",
      image: "/dental-profile.jpg",
      title: "Guest Rooms",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "parking-card",
      image: "/dental-profile.jpg",
      title: "Parking",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "gymnasium-card",
      image: "/dental-profile.jpg",
      title: "Gymnasium",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "charity-card",
      image: "/dental-profile.jpg",
      title: "Charity",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
  ];
  return (
    <div id="non-patient-services">
      <Divider>
        <Chip label="Non-Patient Services" size="medium" />
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
                  <Typography gutterBottom variant="h5" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
  );
};

export default NonPatientServices;
