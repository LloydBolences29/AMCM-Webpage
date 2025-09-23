import { useState, useEffect, Suspense } from "react";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EKGSpinner from "../components/EKGSpinner";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";

import "../styles/DepartmentManagement.css";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({
    id: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [pageStatus, setPageStatus] = useState("idle");

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  // fetch all the department

  const fetchAllDepartments = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${VITE_API_URL}/department/get-all-departments?page=${currentPage}&limit=10`
      );

      if (response.ok) {
        const data = await response.json();
        setDepartments(data.departments);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setErrorMessage("Error Fetching department.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllDepartments();
  }, [currentPage]);

  //set the timer for the loading for 5secs
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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

  //function for the functionality of the search bar
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/search-department/${searchTerm}`
      );

      if (response.ok) {
        const data = await response.json();
        setDepartments(data.department);
        setTotalPages(1);
        setErrorMessage("");

        console.log("Search result:", data.department);
      } else if (response.status === 404) {
        setErrorMessage("Department not Found!!");
      }
    } catch (error) {
      console.error("Error searching department:", error);
    }
  };

  const handleOpenEditModal = (department) => {
    setSelectedDepartment(department);
    setShowEditModal(true);
  };

  const handleOpenDeleteModal = (department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  //function for handling the Update functionality of the department Management page
  const handleEditDepartment = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/update-department/${selectedDepartment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: selectedDepartment.name }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setPageStatus("success");
        setSuccessSnackBarState(true);
        setSuccessMessage(result.message);
        setShowEditModal(false);

        fetchAllDepartments();
      } else {
        setPageStatus("error");
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error Updating your department", error);
      console.log("Selected Department Name: ", selectedDepartment.name);
      setError(error.message);
      setPageStatus("error");
      setFailedSnackBarState(true);
    }
  };

  //functionality for the delete function of the department management page
  const handleDeleteDepartment = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/department/delete-department/${selectedDepartment.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setPageStatus("success");
        setSuccessMessage(result.message);
        setSuccessSnackBarState(true);
        setShowDeleteModal(false);
        fetchAllDepartments();
      } else {
        setPageStatus("error");
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error Deleting the department", error);
      setPageStatus("error");
      setFailedSnackBarState(true);
    }
  };

  return (
    <div>
      {/* table of the departments here using react bootstrap */}
      <div id="search-nav">
        <div id="department-search-bar">
          <TextField
            id="standard-basic"
            label="Search for Departments"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

        <div id="department-search-btn">
          <Button variant="outline-primary" onClick={() => handleSearch()}>
            Search
          </Button>
        </div>
      </div>
      {loading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <EKGSpinner />
          </div>
        </>
      ) : errorMessage ? (
        <p style={{ color: "red", margin: "1em" }}>{errorMessage}</p>
      ) : (
        <>
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
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.name}</td>
                  <td>
                    {/* Add action buttons here */}
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenEditModal(department)}
                      >
                        Edit
                      </Button>
                      {/* <Button variant="outline-danger" size="sm" onClick={() => handleOpenDeleteModal(department)}>
                        Delete
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
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
        </>
      )}

      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add your form for editing the department here */}

            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formDepartmentName">
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={selectedDepartment.id}
                      value={selectedDepartment ? selectedDepartment.id : ""}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formDepartmentName">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={selectedDepartment}
                      value={selectedDepartment ? selectedDepartment.name : ""}
                      onChange={(e) =>
                        setSelectedDepartment({
                          ...selectedDepartment,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleEditDepartment()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the department{" "}
            <strong>{selectedDepartment.name}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleteDepartment()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DepartmentManagement;
