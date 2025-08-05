import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "./Dental.css";

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
          <h3>
            <strong>Our services</strong>
          </h3>
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
        <br />
        <div id="dental-why-choose-us">
          <h4>
            <strong>Why Choose Us for Your Dental Care?</strong>
          </h4>

          <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
            <li>✔ Experienced Dental Specialists</li>
            <li>✔ State-of-the-Art Technology </li>
            <li>✔ Patient-Centered Care</li>
            <li>✔ Safe & Comfortable Treatments</li>
            <li>📍 Location: G/F Outpatient Department</li>
            <li>📞 Contact Us: 85259191 to 98 local 132, +63963 739 2366, +63961 683 6754</li>
            <li>📧 Email: dental@adventisthealth-mnl.com</li>
            <li>🔹 Book an Appointment Today! Let us help you achieve a healthier and brighter smile </li>
          </ul>
        </div>



        <br />
        <div id="customer-feedback-survey">
          <h4>Customer Feedback Survey</h4>

          <p>
            We value your feedback! Please take a moment to complete our
            Customer Survey Form to help us improve our dental services.
          </p>

          <ul style={{ listStyleType: "none" }}>
            <li>
              <strong>📌 Click here to fill out the survey:</strong>{" "}
              <a>Customer Survey Form</a>
            </li>

            <li>
              <i>
                📌 Your feedback helps us enhance our services. Thank you for
                trusting us with your dental care!
              </i>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dental;
