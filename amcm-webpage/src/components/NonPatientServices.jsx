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
      image: "/auto-mo-wash-ko.png",
      title: "Auto Mo, Wash Ko",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/auto-mo-wash-ko",
    },
    {
      id: "healthyBites-card",
      image: "/healthy-bites.png",
      title: "Healthy Bites",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/healthy-bites",
    },
    {
      id: "guest-rooms-card",
      image: "/guest-room.png",
      title: "Guest Rooms",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/guest-rooms",
    },
      {
      id: "gymnasium-card",
      image: "/gymnasium.png",
      title: "Gymnasium",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/gymnasium",
    },
    {
      id: "parking-card",
      image: "/parking.png",
      title: "Parking",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/parking",
    }
  ];
  return (
    <div id="services-card-wrapper" className="service-content">
      <div id="non-patient-services">
        <Divider className="divider">
          <Chip id="chip" label="Non-Patient Services" size="medium" />
        </Divider>
        <div className="services-card">
          {services.map((service) => (
            <div key={service.id} id={service.id}>
              <Card className="services-card-content" sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                  href={service.link}
                    loading="lazy"
                    component="img"
                    height="140"
                    image={service.image}
                    alt="green iguana"
                  />
                  {/* <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
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
    </div>
  );
};

export default NonPatientServices;
