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
  ListGroup
} from "react-bootstrap";

const AddSchedule = () => {
  const [form, setForm] = useState({
    name: "",
    schedule: "",
    department: "",
    day_of_the_week: "",
    start_time: "",
    end_time: "",
  });
  const [searchDoctorValue, setSearchDoctorValue] = useState("");
  const [doctorsData, setDoctorsData] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const fetchAllDoctorData = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors-departments/${searchDoctorValue}`
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

  const handleDoctorSelect = (doctor) => {
    setForm({
      ...form,
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

  return (
    <>
  <Container className="py-5">
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Header as="h5">Add Doctor's Schedule</Card.Header>
          <Card.Body>
            <Form>
              {/* DOCTOR'S NAME INPUT AND SEARCH RESULTS */}
              <Form.Group controlId="formName" className="mb-3 position-relative">
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
              <Form.Group controlId="formDepartment" className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="Department"
                  value={form.department}
                  readOnly
                  disabled
                />
              </Form.Group>

              {/* DAY OF THE WEEK */}
              <Form.Group controlId="formDayOfWeek" className="mb-3">
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
                  <option value="Thu">Thursday</option>
                  <option value="Fri">Friday</option>
                  <option value="Sat">Saturday</option>
                </Form.Select>
              </Form.Group>

              {/* TIME INPUTS */}
              <Row>
                <Col>
                  <Form.Group controlId="formStartTime" className="mb-3">
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
                  <Form.Group controlId="formEndTime" className="mb-3">
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

              <Button variant="primary" type="submit">
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
