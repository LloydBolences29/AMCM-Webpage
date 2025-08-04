import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import "./DiagnosticImaging.css";
const DiagnosticImaging = () => {
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
              Diagnostic Imaging Services
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <div id="diagnostic-imaging-services-container">
        <div id="diagnostic-imaging-wrapper">
          <div id="diagnostic-imaging-content-introduction">
            <Typography variant="body1" sx={{ margin: "20px 0" }}>
              <strong>Imaging Department</strong> provides state-of-the-art
              diagnostic imaging services to ensure accurate and timely
              diagnoses. Our expert radiologists and highly trained staff use
              the latest medical imaging technology for
              <strong>precise and high-quality results.</strong>
            </Typography>
          </div>

          <div id="diagnostic-imaging-services">
            <h4>
              <strong>Our services</strong>
            </h4>
            <ul style={{ listStyle: "none" }}>
              <li>
                <strong>📌 Bone Densitometry </strong> <br />A specialized X-ray
                test to measure bone mineral density, used for diagnosing
                osteoporosis and assessing fracture risk.
              </li>
              <li>
                <strong> 📌 Computed Tomography (CT Scan) </strong> <br />
                Advanced cross-sectional imaging for detailed evaluation of
                internal organs, bones, soft tissues, and blood vessels. CT
                scans are used for detecting tumors, injuries, and other medical
                conditions.
              </li>
              <li>
                <strong> 📌 Mammography </strong> <br />A{" "}
                <strong>breast imaging technique</strong> used for early
                detection of <strong>breast cancer</strong> and abnormalities.
                We offer both{" "}
                <strong>screening and diagnostic mammograms</strong> with
                high-resolution imaging.
              </li>
              <li>
                <strong> 📌 Ultrasound </strong> <br />
                Safe and non-invasive imaging that uses sound waves to visualize{" "}
                <strong>
                  internal organs, pregnancy development, blood flow, and soft
                  tissues.
                </strong>{" "}
                Our services include:
                <ul style={{ listStyle: "none" }}>
                  <li>
                    ✔ General Ultrasound (abdomen, thyroid, kidneys, etc.)
                  </li>
                  <li>✔ Obstetric & Gynecologic Ultrasound</li>
                  <li>✔ Vascular Ultrasound & Doppler Studies</li>
                </ul>
              </li>
            </ul>
          </div>

          <Divider sx={{ borderBottomWidth: 2, borderColor: "#142C2E" }} />

          <br />

          <div id="diagnostic-contact-section">
            <h4><strong>Location and Contact Information</strong></h4>
            <p>
              For more information or to schedule an appointment, please contact
              our Imaging Department at:
            </p>
            <ul style={{ listStyle: "none" }}>
              <li>
                <strong>📍 Ground Floor, Right Side of Main Lobby</strong>
              </li>
              <li>
                <strong>📞 Phone:</strong> (02) 8525 9191 to 98
              </li>
              <li>
                <strong>📞 Local:</strong> 143, 144, 145
              </li>
              <li>
                <strong>📧 Email:</strong> imaging@adventisthealth-mnl.com
              </li>
              <li>
                <strong>🌐 Follow us on Facebook:</strong>{" "}
                <a href="http://"> AMCM Imaging FB Page</a>
              </li>
            </ul>
          </div>

          <Divider sx={{ borderBottomWidth: 2, borderColor: "#142C2E" }} />

          <br />

          <div id="schedule-an-appointment-section">
            <h4><strong>Schedule an Appointment</strong></h4>

            <ul style={{ listStyle: "none" }}>
              <li>
                📌 Book your imaging procedure with ease! Click the link below
                to schedule your appointment online.
              </li>
              <li>🔹 Schedule an Appointment</li>
            </ul>
          </div>

          <Divider sx={{ borderBottomWidth: 2, borderColor: "#142C2E" }} />

          <br />

          <div id="customer-feedback-section">
            <h4>
              <strong>Customer Feedback</strong>
            </h4>
            <p>
              Your feedback matters! Help us improve our services by filling out
              our quick survey.
            </p>
            <Button
              variant="contained"
              href="/online-patient-survey"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                backgroundColor: "#163235ff",
                color: "#ffffff",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              Fill Out Online Survey Form
            </Button>
          </div>

          <br />

          <div id="post-script-message">
            <p>
              At AMCM, we are committed to providing accurate, safe, and
              patient-centered diagnostic imaging services. For inquiries,
              appointments, or assistance, feel free to contact us.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosticImaging;
