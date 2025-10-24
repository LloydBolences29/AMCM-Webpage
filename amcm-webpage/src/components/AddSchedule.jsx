import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  ListGroup,
} from "react-bootstrap";


const AddSchedule = () => {
  const initialStateOfForm = {
    doctor_department_id: "",
    name: "",
    schedule: "",
    schedule_type: "" || "clinic",
    department: "",
    day_of_the_week: "",
    start_time: "",
    end_time: "",
    notes: "" || "N/A",
  };

  const [form, setForm] = useState(initialStateOfForm);
  const [pageStatus, setPageStatus] = useState("idle");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [notification, setNotification] = useState("")
  const [searchDoctorValue, setSearchDoctorValue] = useState("");
  const [doctorsData, setDoctorsData] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  const fetchAllDoctorData = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors-departments/${searchDoctorValue}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDoctorsData(data);
      } else {
        setDoctorsData([]);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const handleSubmitNewSchedule = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_API_URL}/doctor/add-schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      console.log("To be sent: ", form)

      if (response.ok) {
        const data = await response.json();
        console.log("New schedule added:", data);
        setPageStatus("success");
        setForm(initialStateOfForm);
        setSearchDoctorValue("");
        setNotification(data.message);
        setSuccessSnackBarState(true);

      } else {
        const data = await response.json();
        console.error("Error adding schedule:", response.statusText);
        setPageStatus("error");
        setNotification(data.message);
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error submitting new schedule:", error);
      setPageStatus("error");
      setNotification(error.message);
      setFailedSnackBarState(true);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setForm({
      ...form,
      doctor_department_id: doctor.id,
      name: doctor.name,
      department: doctor.department,
    });
    // Also update the input field to show the selected name
    setSearchDoctorValue(doctor.name);
    // Clear the dropdown list
    setDoctorsData([]);
  };

  useEffect(() => {
    if (searchDoctorValue.trim() === "") {
      setDoctorsData([]);
      return;
    }
    fetchAllDoctorData();
    console.log("Doctors Data: ", doctorsData);
  }, [searchDoctorValue]);

  console.log("Form Data: ", form);

  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Header
                className="text-white text-center py-3"
                style={{ backgroundColor: "#007682" }}
              >
                <h2 className="mb-0">
                  <i className="fas fa-user-md me-2"></i>
                  Add New Doctor's Schedule
                </h2>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-4">
                  <Badge
                    className="mb-2"
                    style={{ backgroundColor: "#163235" }}
                  >
                    Instructions
                  </Badge>
                  <p className="text-muted small">
                    Please fill in all the required information to add a new
                    schedule for the doctor. Make sure all details are accurate
                    before submitting.
                  </p>
                </div>

                {pageStatus === "success" ? (
                  <Snackbar
                    open={successSnackBarState}
                    autoHideDuration={5000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                      sx={{
                        width: "100%",
                        margin: "1em",
                        fontSize: "1em",
                      }}
                    >
                      {notification}
                    </Alert>
                  </Snackbar>
                ) : (
                  <Snackbar
                    open={failedSnackBarState}
                    autoHideDuration={5000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      variant="filled"
                      sx={{
                        width: "100%",
                        margin: "1em",
                        fontSize: "1em",
                      }}
                    >
                      {notification}
                    </Alert>
                  </Snackbar>
                )}

                <Form onSubmit={handleSubmitNewSchedule}>
                  {/* DOCTOR'S NAME INPUT AND SEARCH RESULTS */}
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Doctor's Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={searchDoctorValue}
                      placeholder="Search for a doctor..."
                      onChange={(e) => setSearchDoctorValue(e.target.value)}
                      required
                      autoComplete="off"
                    />

                    {/* --- THIS IS THE SEARCH RESULT LIST --- */}
                    {doctorsData.length > 0 && (
                      <ListGroup
                        style={{
                          position: "absolute",
                          zIndex: 1000,
                          width: "100%",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {doctorsData.map((doctor) => (
                          <ListGroup.Item
                            key={doctor.id}
                            action // Adds hover effect and makes it clickable
                            onClick={() => handleDoctorSelect(doctor)}
                          >
                            {doctor.name} - {doctor.department}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Form.Group>

                  {/* DEPARTMENT (AUTO-FILLED) */}
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="Department"
                      value={form.department}
                      readOnly
                      disabled
                    />
                  </Form.Group>

                  {(form.department ===
                    "OBSTETRICS AND GYNECOLOGY / PERINATOLOGIST / SONOLOGIST" ||
                    form.department === "OBSTETRICS AND GYNECOLOGY / SONOLOGIST") && (
                      <Form.Group className="mb-3">
                        <Form.Label>Schedule Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={form.schedule_type}
                          onChange={(e) =>
                            setForm({ ...form, schedule_type: e.target.value })
                          }
                        >
                          <option value="">Select a schedule type</option>
                          <option value="clinic">Clinic</option>
                          <option value="ultrasound">Ultrasound</option>
                        </Form.Control>
                      </Form.Group>
                    )}

                  {/* DAY OF THE WEEK */}
                  <Form.Group className="mb-3">
                    <Form.Label>Choose a day</Form.Label>
                    <Form.Select // Use Form.Select for better styling
                      value={form.day_of_the_week}
                      onChange={(e) =>
                        setForm({ ...form, day_of_the_week: e.target.value })
                      }
                    >
                      <option value="">Select a day</option>
                      <option value="Sun">Sunday</option>
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thur">Thursday</option>
                      <option value="Fri">Friday</option>
                      <option value="Sat">Saturday</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Additional Notes: </Form.Label>
                    <Form.Control
                      type="text"
                      rows={3}
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                    />
                  </Form.Group>

                  {/* TIME INPUTS */}
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Start time</Form.Label>
                        <Form.Control
                          type="time"
                          value={form.start_time}
                          onChange={(e) =>
                            setForm({ ...form, start_time: e.target.value })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>End time</Form.Label>
                        <Form.Control
                          type="time"
                          id="end_time"
                          value={form.end_time}
                          onChange={(e) =>
                            setForm({ ...form, end_time: e.target.value })
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#007682",
                      borderColor: "#007682",
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddSchedule;
