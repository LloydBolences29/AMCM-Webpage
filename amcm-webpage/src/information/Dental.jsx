import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
              Specialized extraction of <strong>extra teeth</strong> that may
              affect alignment and dental function.
            </li>
            <li>
              <strong> Odontectomy </strong> <br />
              Surgical removal of <strong>impacted or problematic teeth</strong>
              , including wisdom teeth, to prevent infections and misalignment.
            </li>
            <li>
              <strong> Endodontic Services (Root Canal Therapy) </strong> <br />
              We provide <strong>root canal treatments</strong> to save infected
              or damaged teeth, relieving pain and preserving natural teeth.
            </li>
            <li>
              <strong> Dental Cosmetic Services </strong> <br />
              Enhance your <strong>smile aesthetics</strong> with{" "}
              <strong>
                teeth whitening, veneers, dental bonding, and smile makeovers
              </strong>{" "}
              tailored to your needs
            </li>
            <li>
              <strong> Dental Implants</strong>
              <br />
              Permanent solutions for <strong>missing teeth</strong>, restoring
              function and aesthetics with high-quality{" "}
              <strong>titanium implants</strong>.
            </li>
            <li>
              <strong> Pediatric Dentistry </strong> <br />
              Comprehensive <strong>dental care for children</strong>, including
              cavity prevention, fluoride treatments, and early orthodontic
              assessments.
            </li>
            <li>
              <strong> Restorative Services </strong>
              <br />
              Restoring damaged or decayed teeth with{" "}
              <strong>fillings, crowns, bridges, and dentures</strong> to
              improve function and appearance.
            </li>
            <li>
              <strong> Frenectomy </strong>
              <br />A minor surgical procedure to{" "}
              <strong>correct tongue-tie or lip-tie issues</strong>, improving
              speech and feeding in children and adults.
            </li>
            <li>
              <strong> Operculectomy </strong>
              <br />
              Surgical removal of gum tissue covering partially erupted teeth,
              commonly for <strong>wisdom teeth</strong> to prevent infections.
            </li>
            <li>
              <strong> CBCT (Cone Beam Computed Tomography) </strong>
              <br />
              Advanced 3D imaging technology for{" "}
              <strong>accurate diagnosis and treatment planning</strong> in
              implantology, orthodontics, and oral surgery.
            </li>
          </ol>
        </div>

        <Divider sx={{ borderBottomWidth: 2, borderColor: "#142C2E" }} />

        <div id="dental-why-choose-us">
            <h5>Why Choose Us for Your Dental Care?</h5>

            <ul>
              <li>
                <strong>Experienced Team:</strong> Our skilled dentists and
                staff have years of experience in various dental specialties.
              </li>
              <li>
                <strong>Comprehensive Services:</strong> We offer a wide range
                of services, from routine check-ups to advanced procedures.
              </li>
              <li>
                <strong>Patient-Centered Care:</strong> Your comfort and
                satisfaction are our top priorities. We listen to your concerns
                and involve you in your treatment planning.
              </li>
              <li>
                <strong>State-of-the-Art Technology:</strong> We utilize the
                latest dental technology to ensure accurate diagnoses and
                effective treatments.
              </li>
              <li>
                <strong>Flexible Financing Options:</strong> We provide various
                payment options to make dental care accessible for everyone.
              </li>
            </ul>
            </div>
          </div>
    </>
  );
};

export default Dental;
