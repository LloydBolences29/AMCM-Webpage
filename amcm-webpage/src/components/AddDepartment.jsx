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
  ListGroup,
  Badge,
} from "react-bootstrap";


const AddDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [pageStatus, setPageStatus] = useState("idle");

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/get-all-departments`
      );
      const data = await response.json();
      setDepartments(data);
      console.log("Departments:", data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  const handleAddDepartment = async (newDepartment) => {
    try {
      console.log("the department", newDepartment);
      const response = await fetch(
        `${VITE_API_URL}/department/add-department`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newDepartment }),
        }
      );

      console.log("Response status:", response);

      if (response.ok) {
        setPageStatus("success");
        setSuccessSnackBarState(true);
        setNewDepartment(""); // Clear the input field

        console.log("Adding department:", newDepartment); // Optionally, fetch the updated list of departments
      } else {
        setFailedSnackBarState(true);

        const errorData = await response.json();
        console.error("Error adding department:", errorData);
      }
    } catch (error) {
      setPageStatus("error");
      setFailedSnackBarState(true);
      console.error("Error adding department:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={6} md={8} sm={10}>
          <Card className="shadow-lg border-0">
            <Card.Header className="text-white text-center py-3"  style={{ backgroundColor: "#007682" }}>
              <h2 className="mb-0">
                <i className="fas fa-building me-2"></i>
                Department Management
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <Card className="mb-4 h-100">
                    <Card.Header style={{ backgroundColor: "#163235", color: "white" }}>
                      <h5 className="mb-0">
                        <i className="fas fa-plus-circle me-2"></i>
                        Add New Department
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <Badge style={{ backgroundColor: "#007682" }} className="mb-2">
                          Instructions
                        </Badge>
                        <p className="text-muted small">
                          Enter the name of the new department you want to add
                          to the system.
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
                            Department saved successfully!
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
                            Failed on saving the Department!
                          </Alert>
                        </Snackbar>
                      )}

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <i className="fas fa-tag me-2"></i>Department Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newDepartment}
                          onChange={(e) => setNewDepartment(e.target.value)}
                          placeholder="Enter department name"
                          className="form-control-lg"
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          onClick={() => handleAddDepartment(newDepartment)}
                          size="lg"
                          className="py-2"
                          disabled={!newDepartment.trim()}
                          style={{ backgroundColor: "#007682", borderColor: "#007682" }}
                        >
                          <i className="fas fa-plus-circle me-2"></i>
                          Add Department
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="mb-4 h-100">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">
                        <i className="fas fa-list me-2"></i>
                        Existing Departments ({departments.length})
                      </h5>
                    </Card.Header>
                    <Card.Body className="p-0">
                      {departments.length === 0 ? (
                        <div className="text-center py-4">
                          <div className="text-muted">
                            <i className="fas fa-inbox fa-3x mb-3"></i>
                            <p>No departments found</p>
                          </div>
                        </div>
                      ) : (
                        <ListGroup
                          className="list-group-flush"
                          style={{ maxHeight: "300px", overflowY: "auto" }}
                        >
                          {departments.map((dept, index) => (
                            <ListGroup.Item
                              key={dept.ID}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <div>
                                <i className="fas fa-building text-primary me-2"></i>
                                <span className="fw-medium">{dept.Name}</span>
                              </div>
                              <Badge bg="secondary" pill>
                                ID: {dept.ID}
                              </Badge>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDepartment;
