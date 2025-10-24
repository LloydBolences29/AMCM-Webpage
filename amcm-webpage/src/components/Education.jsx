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

const Education = () => {
  const services = [
    {
      id: "lifestyle-service",
      image: "/lifestyle.webp",
      title: "Lifestyle Is Medicine",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/lifestyle",
    },
    {
      id: "mac-service",
      image: "/mac.webp",
      title: "Manila Adventist College",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/mac",
    },
    {
      id: "clinical-pastoral-service",
      image: "/clinical-pastoral-education.webp",
      title: "Clinical Pastoral Education",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/clinical-pastoral-education",
    },
    {
      id: "internship-service",
      image: "/internship.webp",
      title: "Internship",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/internship",
    },
    {
      id: "residency-service",
      image: "/residency.webp",
      title: "Residency",
      description:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
      link: "/service/residency",
    },
  ];
  return (
    <div id="education-services" className="service-content" >
      <Divider className="divider">
        <Chip id="chip" label="Education Services" size="medium" />
      </Divider>

      <div className="services-card">
        {services.map((service) => (
          <div key={service.id} id={service.id}>
            <Card className="services-card-content" sx={{ maxWidth: 345 }}>
              <CardActionArea component="a" href={service.link}>
                <CardMedia
                  loading="lazy"
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                />
                {/* <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
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

export default Education;
