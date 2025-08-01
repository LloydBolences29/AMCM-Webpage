import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const Dental = () => {


  return (
    <>
      

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
              Dental
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <div id="dental-content-container">
        <div id="dental-content-introduction">
          <Typography variant="body1" sx={{ margin: "20px 0" }}>
            We are dedicated to providing comprehensive oral healthcare, from
            preventive care to advanced dental procedures. Our team of
            experienced dentists and specialists ensures that every patient
            receives high-quality treatment in a comfortable and safe
            environment.
          </Typography>
        </div>

        <div id="dental-content-services">
          <h5>
            <strong>Our services</strong>
          </h5>
          <ol>
            <li>
              <strong>Temporomandibular Dysfunction (TMD) Management</strong>{" "}
              <br />
              We offer non-surgical and surgical treatments for{" "}
              <strong>TMJ disorders</strong>, including pain management, bite
              adjustments, and physical therapy.
            </li>
            <li>
              <strong> Oral Prophylaxis </strong> <br />
              Regular <strong>teeth cleaning</strong> to remove plaque, tartar,
              and stains, ensuring optimal oral hygiene and preventing gum
              disease.
            </li>

            <li>
              <strong> Apicoectomy </strong>
              <br />A <strong>minor surgical procedure</strong> to remove
              infection from the root tip of a tooth and prevent further
              complications.
            </li>
            <li>
              <strong> Simple Tooth Extraction </strong> <br />
              Safe and painless removal of damaged or decayed teeth when
              preservation is no longer an option.
            </li>
            <li>
              <strong> Supernumerary Tooth Extraction </strong> <br />
            </li>
            <li>
              <strong> Odontectomy </strong>
            </li>
            <li>
              <strong> Endodontic Services (Root Canal Therapy) </strong>
            </li>
            <li>
              <strong> Dental Cosmetic Services </strong>
            </li>
            <li>
              <strong> Dental Implants</strong>
            </li>
            <li>
              <strong> Pediatric Dentistry </strong>
            </li>
            <li>
              <strong> Restorative Services </strong>
            </li>
            <li>
              <strong> Frenectomy </strong>
            </li>
            <li>
              <strong> Operculectomy </strong>
            </li>
            <li>
              <strong> CBCT (Cone Beam Computed Tomography) </strong>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Dental;
