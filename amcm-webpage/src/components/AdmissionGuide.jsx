import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "../styles/AdmissionGuide.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const AdmissionGuide = () => {
  return (
    <div id="admission-guide-wrapper">
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
              sx={{ color: "#ffffffff", fontFamily: "Advent Sans, sans-serif" }}
            >
              Hospital Admission Process
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <div id="admission-guide-container">
        <div id="admission-guide-description">
          <Typography
            variant="h6"
            sx={{ color: "#000000", fontFamily: "Advent Sans, sans-serif", width: "50%", textAlign: "center", margin: "0 auto" }}
          >
            AMCM strives to make your admission process smooth and hassle-free.
            Below is a step-by-step guide to ensure a seamless hospital
            admission experience.
          </Typography>
        </div>

        <div id="admission-steps">
          <h3>
            <strong>
              Step 1: Pre-Admission <br />{" "}
              <h4>
                <strong>(For Scheduled Admissions)</strong>
              </h4>
            </strong>
          </h3>
          <ul>
            <li>
              <strong>Doctor's Referral or Admission Order</strong> - Your
              attending physician will issue an admission order for inpatient
              care.
            </li>
            <li>
              <strong>Pre-Admission Counseling</strong> – Our staff will guide
              you through the admission requirements, and necessary documents.
            </li>
            <li>
              <strong>Room Reservation (if applicable)</strong> – You may choose
              from available room types (suite, private, small private,
              semi-private, or ward). Please note that reservation for suite
              room is only for 4 hours, you may need to call our office again to
              extend it for another 4 hours until your admission.
            </li>
          </ul>

          <p>
            <i>
              For elective or scheduled procedures, patients may complete
              pre-admission forms online or at the Admission Office.
            </i>
          </p>

          <h3>
            <strong>Step 2: Registration and Admission</strong>
          </h3>

          <ul>
            <li>
              <strong>Present the following documents:</strong>
              <ul style={{ listStyle: "none" }}>
                <li>✔ Doctor’s Admission Order</li>
                <li>✔ Valid ID (Government-issued or company ID)</li>
                <li>✔ PhilHealth/Insurance Card (if applicable)</li>
                <li>✔ Health Declaration Form (if required)</li>
                <li>
                  ✔ HMO/Corporate Account Letter of Authorization (if
                  applicable)
                </li>
              </ul>
              
            </li>
            <li>
              <strong>
                Fill out the Patient Information and Consent Forms
              </strong>
              – Our staff will assist you in completing the necessary paperwork.
            </li>
            <li>
              <strong>Assignment of Room and Hospital ID Bracelet</strong> –
              Once processed, you will receive a hospital ID bracelet for
              identification and be escorted to your room.
            </li>
          </ul>

          <h3>
            <strong>
              Step 3: Emergency Room Triage, IV Insertion & Settling In
            </strong>
          </h3>

          <h6>
            <strong>For Emergency Admissions:</strong>
          </h6>

          <br />

          <p>
            Patients arriving through the <strong>Emergency Room (ER)</strong>{" "}
            will undergo a <strong>Triage Assessment</strong>, where a nurse will
            evaluate the severity of their condition: (Hyperlink of Emergency
            Room Triage System)
          </p>
          <h6>
            <strong>IV Insertion in Emergency Cases:</strong>
          </h6>

          <br />

          <ul>
            <li>
              If necessary, an <strong>intravenous (IV) line</strong> will be
              inserted by a nurse or doctor to administer fluids, medications,
              or emergency treatment.
            </li>
            <li>
              Blood tests or other lab procedures may also be conducted
              simultaneously.
            </li>
          </ul>

          <br />

          <h6>
            <strong>For Scheduled Admissions:</strong>
          </h6>

          <br />

          <ul>
            <li>
              <strong>Orientation</strong>– A nurse or hospital staff will
              explain hospital policies, visiting hours, and available services.
            </li>
            <li>
              <strong>Initial Assessment & IV Insertion</strong>– A nurse will
              record your vital signs, obtain medical history, and insert an IV
              line if required for treatment.
            </li>
            <li>
              <strong>Physician’s Initial Visit</strong>– Your attending doctor
              will assess your condition and discuss the treatment plan.
            </li>
          </ul>
          <h3>
            <strong>Step 4: During Your Stay</strong>
          </h3>

          <ul>
            <li>
              <strong>Medical Care</strong> – Your healthcare team will provide
              the necessary treatment, medications, and procedures.
            </li>
            <li>
              <strong>IV Therapy Management</strong>– If an IV line is in place,
              nurses will monitor and adjust fluids or medications as
              prescribed.
            </li>
            <li>
              <strong>Daily Updates</strong>– Your doctor and nurses will
              provide updates regarding your condition and treatment plan.
            </li>
            <li>
              <strong>Billing and Insurance Coordination</strong>– Our billing
              department will work with PhilHealth, HMOs, and insurance
              providers to assist with coverage and claims.
            </li>
          </ul>

          <h3>
            <strong>Step 5: Discharge Process</strong>
          </h3>
          <br />
          <ol>
            <li>
              <strong>Doctor’s Clearance</strong>
              <ul>
                <li>
                  Your attending physician will assess your condition and
                  determine if you are ready for discharge.
                </li>
                <li>
                  The doctor will issue a discharge order and provide medical
                  instructions for home care and follow-ups
                </li>
              </ul>
            </li>
            <li>
              <strong>Billing Clearance</strong>
              <ul>
                <li>
                  Settle all hospital bills at the <strong>Cashier</strong>.
                </li>
                <li>
                  If you are covered by an HMO or company account, ensure that
                  all necessary documents, such as a Letter of Authorization
                  (LOA), have been processed.
                </li>
                <li>
                  <strong>PhilHealth Deduction:</strong> Patients eligible for
                  PhilHealth benefits must submit the required documents to
                  avail of deductions. Our Philhealth Section will process the
                  necessary claims before finalizing your hospital bill
                </li>
              </ul>
            </li>
            <li>
              <strong>Pharmacy and Medication Instructions</strong>
              <ul>
                <li>
                  Receive prescriptions and final medication instructions from
                  your nurse
                </li>
                <li>
                  Ensure you understand how to take your medications correctly.
                </li>
              </ul>
            </li>
            <li>
              <strong>Final Nursing Assessment</strong>
              <ul>
                <li>
                  The Nursing Station will review discharge instructions, remove
                  IV lines (if applicable), and ensure you are in stable
                  condition to leave.
                </li>
              </ul>
            </li>
            <li>
              <strong>Final Approval and Discharge Slip</strong>
              <ul>
                <li>
                  Once all clearances are completed, the Admission Office will
                  issue your Discharge Slip.
                </li>
                <li>
                  Present the Discharge Slip to the Nurse Station to complete
                  the process.
                </li>
              </ul>
            </li>
            <li>
              <strong>Medical Records Claim</strong>
              <ul>
                <li>
                  Patients who need a copy of their Medical Records (e.g.,
                  Discharge Summary, Laboratory Results) may request them at the
                  Medical Records Department.
                </li>
                <li>
                  Some documents may require processing time and a formal
                  request.
                </li>
                <li>
                  Contact the Medical Records Section for further assistance.
                </li>
              </ul>
            </li>
            <li>
              <strong>Exit Process</strong>
              <ul>
                <li>
                  A nurse or staff member will assist you in leaving the
                  hospital.
                </li>
                <li>
                  Ensure you have all your belongings with you before leaving.
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div id="admission-visiting-hours-guidelines">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100vw",
                minHeight: "auto",
              },
              justifyContent: "center",
            }}
          >
            <Paper elevation={6} sx={{ overflow: "hidden" }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ p: 2 }}
                color="textSecondary"
                textAlign={"center"}
              >
                Visiting Hours & Watcher Guidelines
              </Typography>
              <Typography variant="body1" sx={{ p: 2 }}>
                <ul>
                  <li>
                    <strong>General Visiting Hours: </strong> 9:00 AM – 12:00 PM
                    | 2:00 PM – 9:00 PM
                  </li>
                  <li>
                    <strong>ICU Visits: </strong>
                    Limited to specific hours and short durations.
                  </li>
                  <li>
                    <strong>Maternity Ward: </strong>
                    <strong>Male watchers are not allowed</strong> in the
                    maternity ward for patient privacy and comfort.
                  </li>
                </ul>
              </Typography>
            </Paper>
          </Box>
        </div>

        <Divider sx={{ borderBottomWidth: 2, borderColor: "#142C2E" }} />

        <div id="give-us-feedback">
          <Typography
            variant="body1"
            component="p"
            sx={{ p: 2 }}
            color="textSecondary"
            textAlign={"center"}
          >
            We value your experience at our Patient Business Office. Please take
            a moment to fill out our Online Survey Form to help us improve our
            services.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdmissionGuide;
