import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BsFillTrashFill } from "react-icons/bs";
import { useAuth } from "../utils/AuthContext";

const AccountManagement = () => {
  const { auth } = useAuth();
  const initialValue = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialValue);
  const [pageStatus, setPageStatus] = useState("idle");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);
  const [notification, setNotification] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: "",
  });
  const [toDeleteUser, setTODeleteUser] = useState(null);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  const handleOpenDeleteModal = (user) =>{
    setTODeleteUser(user);
    setDeleteUserModal(true)
  }

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        fetchAllUser();
        setForm(initialValue);
        setPageStatus("success");
        setSuccessSnackBarState(true);
        setNotification(data.message);
        setShowModal(false);
      } else {
        setPageStatus("error");
        setNotification(data.message);
        setFailedSnackBarState(true);
      }
    } catch (error) {
      console.log("Error Adding User.", error);
      setPageStatus("error");
      setFailedSnackBarState(true);
      setNotification(error.message);
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();

    // find fields that actually changed
    const updatedFields = {};
    Object.keys(selectedUser).forEach((key) => {
      if (selectedUser[key] !== originalUser[key]) {
        updatedFields[key] = selectedUser[key];
      }
    });

    // always include the user ID (important!)
    updatedFields.id = selectedUser.id;

    if (Object.keys(updatedFields).length <= 1) {
      console.log("No changes detected.");
      return;
    }
    try {
      const response = await fetch(`${VITE_API_URL}/user/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (!response.ok) {
        setPageStatus("error");
        setFailedSnackBarState(true);
        setNotification(data.message);
      } else {
        fetchAllUser();
        setPageStatus("success");
        setSuccessSnackBarState(true);
        setNotification(data.message);
        setShowEditModal(false);
      }
    } catch (error) {
      console.log("Error Saving User.", error);
      setPageStatus("error");
      setFailedSnackBarState(true);
      setNotification(error.message);
    }
  };

  const handleDeleteUser = async () =>{
    const userId = toDeleteUser.id; 

    // Safety check
    if (!userId) {
        console.error("No user selected for deletion.");
        setNotification("Error: No user selected.");
        setFailedSnackBarState(true);
        return;
    }
    try {
      const response = await fetch(`${VITE_API_URL}/auth/delete-user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      
      if (response.ok) {
        setPageStatus("success");
        setSuccessSnackBarState(true);
        setNotification(data.message);
        setDeleteUserModal(false);
        fetchAllUser();
      }
      
    } catch (error) {
      console.log("Error Deleting User.", error);
      setPageStatus("error");
      setFailedSnackBarState(true);
      setNotification(error.message);
    }
  }

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOriginalUser(user);
    setShowEditModal(true);
  };

  const fetchAllUser = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/user/get-users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleResetPassword = async () =>{
    alert(`Restart password for user ${selectedUser.id} - ${selectedUser.username}`);
  }

  useEffect(() => {
    fetchAllUser();
  }, []);

  //for the snackbar

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  console.log("Users to be deleted: ", toDeleteUser?.id);

  return (
    <>
      <div id="add-user-container">
        <div id="add-user-wrapper">
          <div id="add-user-button">
            <Button variant="outline-primary" onClick={handleOpenModal}>
              Add User
            </Button>
          </div>
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
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {auth.user && auth.user.id !== user.id && (
                  <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenEditModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenDeleteModal(user)}
                  >
                    <BsFillTrashFill />

                  </Button>
                </div>
                )}
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleAddUser}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter firstname"
                      value={form.firstname}
                      onChange={(e) => {
                        setForm({ ...form, firstname: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRole">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter lastname"
                      value={form.lastname}
                      onChange={(e) => {
                        setForm({ ...form, lastname: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter a username"
                      value={form.username}
                      onChange={(e) => {
                        setForm({ ...form, username: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                    >
                      <option value="">Select a Role</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Please enter your email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Please enter your password"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                className="mx-1"
                variant="secondary"
                onClick={handleOnClose}
              >
                Close
              </Button>
              <Button className="mx-1" variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {deleteUserModal && (
        <Modal show={deleteUserModal} onHide={() => setDeleteUserModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete user {toDeleteUser?.username}?</p>
            <Button
              className="mx-1"
              variant="secondary"
              onClick={() => setDeleteUserModal(false)}
            >
              Cancel
            </Button>
            <Button className="mx-1" variant="danger" 
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSaveUser}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter firstname"
                      value={selectedUser ? selectedUser.firstname : ""}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          firstname: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRole">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter last name"
                      value={selectedUser ? selectedUser.lastname : ""}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          lastname: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter a username"
                      value={selectedUser ? selectedUser.username : ""}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          username: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedUser ? selectedUser.role : ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a Role</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Please enter your email"
                      value={selectedUser ? selectedUser.email : ""}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicIsActive">
                    <Form.Label>Active Status:</Form.Label>
                    <Form.Control
                      as="select"
                      value={
                        selectedUser && selectedUser.is_active !== undefined
                          ? selectedUser.is_active
                          : ""
                      }
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          is_active: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                

                <Col>
                <Form.Group>
                  <Form.Label>Lock Status:</Form.Label>
                  <Form.Check 
                    type="switch"
                    id="custom-switch"
                    checked={selectedUser ? selectedUser.is_locked : false}
                    onChange={(e) => {
                      setSelectedUser({
                        ...selectedUser,
                        is_locked: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
              </Col>

                <Col>
                <Form.Group>
                  <Button variant="outline-danger" style={{fontSize: "0.9rem"}} onClick={handleResetPassword}>
                      Reset Account Password
                  </Button>
                </Form.Group>
              </Col>
            </Row>

              <Button
                className="mx-1"
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button className="mx-1" variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AccountManagement;
