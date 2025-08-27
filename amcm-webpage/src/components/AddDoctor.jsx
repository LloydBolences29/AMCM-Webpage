import { useState, useEffect } from "react";
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
} from "react-bootstrap";

const AddDoctor = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [pageStatus, setPageStatus] = useState("idle");
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roomNo: "",
    localPhone: "",
    departmentId: "",
    doctor_schedule: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  const fetchAllDepartments = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/get-departments`
      );
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const response = await fetch(`${VITE_API_URL}/doctor/add-doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const doctorData = await response.json();
        console.log("Doctor added successfully:", doctorData);

        setPageStatus("success");
        setSuccessSnackBarState(true);
        setForm({
          name: "",
          roomNo: "",
          localPhone: "",
          departmentId: "",
        });
      } else {
        setFailedSnackBarState(true);
      }
    } catch (error) {
      setPageStatus("error");
      setFailedSnackBarState(true);
      console.error("Error adding doctor:", error);
    }
  };

  console.log("department id", form);
  return (
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
                Add New Doctor
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-4">
                <Badge className="mb-2" style={{ backgroundColor: "#163235" }}>
                  Instructions
                </Badge>
                <p className="text-muted small">
                  Please fill in all the required information to add a new
                  doctor to the system. Make sure all details are accurate
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
                    sx={{ width: "100%", margin: "1em", fontSize: "1em" }}
                  >
                    Doctor saved successfully!
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
                    sx={{ width: "100%", margin: "1em", fontSize: "1em" }}
                  >
                    Failed on saving the Doctor!
                  </Alert>
                </Snackbar>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        <i className="fas fa-user me-2">Doctor's Name</i>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter doctor's full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        <i className="fas fa-door-open me-2">Room Number</i>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., 201"
                        value={form.roomNo}
                        onChange={(e) =>
                          setForm({ ...form, roomNo: e.target.value })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        <i className="fas fa-phone me-2">Local Phone</i>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., 2001"
                        value={form.localPhone}
                        onChange={(e) =>
                          setForm({ ...form, localPhone: e.target.value })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                 
                </Row>

                {/* <Row>
                  <Col>
                    <Form.Label>Upload Profile Image</Form.Label>
                    <Form.Control
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const selected = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imagePreview = event.target.result;
                          };
                          reader.readAsDataURL(file); // ✅ Convert to base64 Data URL
                        }
                        setFile(selected);
                      }}
                    />
                    <Form.Text className="text-muted">
                      You can upload a new background image for the hero
                      section.
                    </Form.Text>
                  </Col>
                </Row> */}

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">
                        <i className="fas fa-building me-2">Department</i>
                      </Form.Label>
                      <Form.Select
                        value={form.departmentId}
                        onChange={(e) =>
                          setForm({ ...form, departmentId: e.target.value })
                        }
                        required
                        className="form-select-lg"
                      >
                        <option value="">-- Select Department --</option>
                        {departments.map((dept) => (
                          <option key={dept.ID} value={dept.ID}>
                            {dept.Name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button
                    type="submit"
                    size="lg"
                    className="py-2"
                    style={{
                      backgroundColor: "#007682",
                      borderColor: "#007682",
                    }}
                  >
                    <i className="fas fa-plus-circle me-2"></i>
                    Add Doctor
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDoctor;
