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

const GovernmentCollabServices = () => {
  const services = [
    {
      id: "take-care1-card",
      image: "/dental-profile.jpg",
      title: "Take Care 1 Care",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "dswd-ncr-card",
      image: "/dental-profile.jpg",
      title: "DSWD-NCR",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "doh-maip-card",
      image: "/dental-profile.jpg",
      title: "DOH-MAIP",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
    {
      id: "pcso-card",
      image: "/dental-profile.jpg",
      title: "PCSO",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/",
    },
  ];

  return (
    <div id="government-collaborative-services">
      <Divider>
        <Chip label="Government Collaborative Services" size="large" />
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
                  alt={service.title}
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

export default GovernmentCollabServices;
