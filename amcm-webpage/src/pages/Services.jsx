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
import "../styles/Services.css";
import { Anchor } from 'antd';


const Services = () => {
  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment-schedule" },
    { label: "Find Doctors", path: "/doctors" },
    { label: "Patient Guide", path: "/patient-business" },
  ];
  return (
    <div className="home-body">
      <div className="home-content">
        {/* navigation  */}
        <Navigation menuLinks={menuLinks} />
        <div className="main">
          <div id="services-wrapper">
            <Container>
              <Card
                sx={{
                  mb: 1,
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
                    Our Services
                  </Typography>
                </CardContent>
              </Card>
            </Container>

            <div id="services-container">
              <div id="anchor-wrapper">
                <Anchor
                  affix={false}
                  items={[
                    {
                      key: "1",
                      href: "#patient-services-wrapper",
                      title: "Patient Services",
                    },
                    {
                      key: "2",
                      href: "#non-patient-services",
                      title: "Non-patient Services",
                    },
                    {
                      key: "3",
                      href: "#government-collaborative-services",
                      title: "Government Collaborative Services",
                     
                    },
                    {
                      key: "4",
                      href: "#education-services",
                      title: "Education",
                     
                    },
                  ]}
                />
              </div>
              <div id="services-card-wrapper">
                <br />
                <div id="patient-services-wrapper">
                  <Divider>
                    <Chip label="Patient Services" size="large" />
                  </Divider>

                  <div className="services-card">
                    <div id="dental-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Dental
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="diagnostic-imaging-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              Diagnostic Imaging Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="emergency-room-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Emergency Room
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="medical-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Medical Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div id="opd-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Outpatient Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="patientBusiness-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Patient Business Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="pathAndLab-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              Pathology and Laboratory Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="pastoralCare-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              Pastoral Care Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="physicalMed-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              Physical Medicine and Rehabilitation Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div id="pharmacy-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Pharmacy Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="medicalRecords-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Medical Records Services
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="renal-services-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Renal Unit
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>

                <br />

                <div id="non-patient-services">
                  <Divider>
                    <Chip label="Non-Patient Services" size="large" />
                  </Divider>

                  <div className="services-card">
                    <div id="automo-washko-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Auto Mo, Wash Ko
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="healthyBites-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Healthy Bites
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="guest-rooms-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Guest Rooms
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="parking-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Parking
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="gymnasium-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Gymnasium
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="charity-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Charity
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>

                <br />

                <div id="government-collaborative-services">
                  <Divider>
                    <Chip
                      label="Government Collaborative Services"
                      size="large"
                    />
                  </Divider>

                  <div className="services-card">
                    <div id="take-care1-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Take Care 1 Care
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="dswd-ncr-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              DSWD-NCR
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="doh-maip-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              DOH-MAIP
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="pcso-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              PCSO
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>

                <br />
                <div id="education-services">
                  <Divider>
                    <Chip label="Education Services" size="large" />
                  </Divider>

                  <div className="services-card">
                    <div id="take-care1-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Education
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="dswd-ncr-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Internship
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                    <div id="doh-maip-card">
                      <Card
                        className="services-card-content"
                        sx={{ maxWidth: 345 }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image="/dental-profile.jpg"
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Trainings
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Lizards are a widespread group of squamate
                              reptiles, with over 6,000 species, ranging across
                              all continents except Antarctica
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" href="/">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <Footer />
      </div>

      <div className="seventh-grid">
        <div id="seventh-grid-body">
          <img
            id="symbol"
            src="/adventist-symbol--white.png"
            alt="Seventh Grid"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
