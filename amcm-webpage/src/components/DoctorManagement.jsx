import { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, Pagination } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../styles/DoctorManagement.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [pageStatus, setPageStatus] = useState("idle");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorById, setDoctorById] = useState({
    id: "",
    name: "",
    roomNumber: "",
    localPhone: "",
    schedules: {
      Clinic: [],
      Ultrasound: [],
    },
  });
  const [departments, setDepartments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  //fetch all the doctors with only name, local and room number.
  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-all-doctors?page=${currentPage}&limit=10`
      );

      if (!response.ok) {
        setErrorMessage(response.message);
        setDoctors([]);
      }

      const result = await response.json();
      setDoctors(result.doctors);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

  //Fetch all the information of the doctor including
  // the schedule, department by the selected ID
  const fetchDoctorById = async (id) => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors-by-id/${id}`
      );

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      const result = await response.json();
      setDoctorById((previousState) => ({
        ...previousState,
        ...result,
      }));
    } catch (error) {
      console.log("Error fetching doctor by id:", error);
      setErrorMessage(error.message);
    }
  };

  //fetch all the DEPARTMENT FOR THE SELECT OPTION
  const fetchAllDepartment = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/get-departments`, 
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  //handle Update functionality
  const handleUpdate = async () => {
    const doctorDataToSend = {
      name: doctorById.name,
      roomNo: doctorById.roomNumber, // Match backend property name
      localPhone: doctorById.localPhone,
      departmentId: doctorById.departmentId,
    };
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/doctor-update-information/${doctorById.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorDataToSend),
          credentials: "include",
        }
      );

      if (!response.ok) {
        setPageStatus("error");
        setFailedSnackBarState(true);
        setError(response.message);
        return;
      }

      const result = await response.json();
      setShowDialog(false);
      setPageStatus("success");
      setSuccessSnackBarState(true);
      setSuccessMessage(result.message);
      fetchAllDoctors();
    } catch (error) {
      console.log("Error updating doctor:", error);
      setFailedSnackBarState(true);
      setPageStatus("error");
      setError(error.message);
    }
  };

  //search functionality
  const handleDoctorSearch = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors-departments/${searchTerm}`
      );

      if (response.ok) {
        const result = await response.json();
        setDoctors(result);
        setTotalPages(1);
        setErrorMessage("");
      } else if (response.status === 404) {
        setErrorMessage("No doctors found.");
      }
    } catch (error) {
      console.log("Error Searching for doctor.", error);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, [currentPage]);

  useEffect(() => {
    if (selectedDoctor) {
      fetchDoctorById(selectedDoctor.id);
      fetchAllDepartment();
    }
  }, [selectedDoctor]);

  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <div>
      <div id="doctor-search-bar">
        <div id="doctor-search-input">
          <TextField
            id="standard-basic"
            label="Search for Doctors"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
        </div>

        <div id="doctor-search-btn">
          <Button
            variant="outline-primary"
            onClick={() => handleDoctorSearch()}
          >
            Search
          </Button>
        </div>
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
            {successMessage}
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
            {error}
          </Alert>
        </Snackbar>
      )}
      {errorMessage ? (
        <p style={{ color: "red", margin: "1em" }}>{errorMessage}</p>
      ) : (
        <div id="doctors-list">
          <Table
            striped
            bordered
            hover
            responsive
            variant="light"
            className="my-4 shadow-sm rounded"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Room Number</th>
                <th>Local Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.roomNo}</td>
                  <td>{doctor.localPhone}</td>
                  <td>
                    <div>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleOpenDialog(doctor)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div id="pagination">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {renderPaginationItems()}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      )}

      {showDialog && (
        <Dialog open={showDialog} onClose={handleCloseDialog}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-bold">Doctor's ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Doctor's ID"
                      value={doctorById ? doctorById.id : ""}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-bold">Doctor's Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Doctor's Name"
                      value={doctorById ? doctorById.name : ""}
                      onChange={(e) =>
                        setDoctorById({ ...doctorById, name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-bold">
                      Doctor's Department
                    </Form.Label>
                    <Form.Select
                      value={doctorById ? doctorById.departmentId : ""}
                      onChange={(e) =>
                        setDoctorById({
                          ...doctorById,
                          departmentId: e.target.value,
                        })
                      }
                    >
                      <option value="">Set as Inactive</option>

                      {departments.map((dept) => (
                        <option key={dept.ID} value={dept.ID}>
                          {dept.Name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-bold">Room Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Room Number"
                      value={doctorById ? doctorById.roomNumber : ""}
                      onChange={(e) =>
                        setDoctorById({
                          ...doctorById,
                          roomNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-bold">Local Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Local Phone"
                      value={doctorById ? doctorById.localPhone : ""}
                      onChange={(e) =>
                        setDoctorById({
                          ...doctorById,
                          localPhone: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* Schedules are soon to be updated */}
              {/* <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-bold">
                      Doctor's Schedules
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Doctor's Schedules"
                      value={doctorById ? doctorById.schedules : ""}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row> */}
            </Form>
          </DialogContent>
          <DialogActions>
            <Button variant="outline-secondary" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="outline-success" onClick={() => handleUpdate()}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default DoctorManagement;
