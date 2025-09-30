import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Card,
  Row,
  Container,
  Col,
  Form,
  Button,
  Badge,
} from "react-bootstrap";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddKeyword = () => {
  const [doctorName, setDoctorName] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pageStatus, setPageStatus] = useState("idle");
  const [successSnackBarState, setSuccessSnackBarState] = useState(false);
  const [failedSnackBarState, setFailedSnackBarState] = useState(false);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackBarState(false);
    setFailedSnackBarState(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(typeof value === "string" ? value.split(",") : value);
  };

  const fetchAllDoctorsAndDepartments = async () => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors-departments`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("Doctors and departments fetched successfully:", data);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddKeyword = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${VITE_API_URL}/keyword/add-keyword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorDepartment_id: doctorName,
          keyword: keyword,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPageStatus("success");
        setSuccessSnackBarState(true);
        setKeyword(""); // Clear the keyword input
        setDoctorName([]); // Clear the selected doctors
        console.log("Keyword added successfully:", data);
      }
    } catch (error) {
      setPageStatus("error");
      setFailedSnackBarState(true);
      console.error("Error adding keyword:", error);
    }
  };

  useEffect(() => {
    fetchAllDoctorsAndDepartments();
  }, []);

  useEffect(() => {
    console.log("Selected doctors:", doctorName);
  }, [doctorName]);

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
                Add New KeyWord
              </h2>
            </Card.Header>

            <Card.Body className="p-4">
              <div className="mb-4">
                <Badge className="mb-2" style={{ backgroundColor: "#163235" }}>
                  Instruction
                </Badge>
                <p>
                  Please select the doctors and enter a keyword to add it to the
                  system.
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

              <Form onSubmit={handleAddKeyword}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">
                        <i className="fas fa-key me-2"></i>Keyword
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        required
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <FormControl fullWidth sx={{ mt: 1}}>
                        <InputLabel id="doctor-select-label">
                          Doctors
                        </InputLabel>
                        <Select
                          labelId="doctor-select-label"
                          id="doctor-multiple-checkbox"
                          multiple
                          value={doctorName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Doctors" />}
                          renderValue={
                            (selected) =>
                              doctors
                                .filter((doctor) =>
                                  selected.includes(doctor.ID)
                                )
                                .map((doctor) => doctor.Name)
                                .join(", ") // Display names in the selected value
                          }
                          MenuProps={MenuProps}
                        >
                          {doctors.map((doctor) => (
                            <MenuItem key={doctor.ID} value={doctor.ID}>
                              <Checkbox
                                checked={doctorName.includes(doctor.ID)}
                              />
                              <ListItemText
                                primary={`${doctor.Name} - ${doctor.Department}`}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-lg"
                  >
                    Add Keyword
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    // <div>
    //   <input
    //     type="text"
    //     value={keyword}
    //     onChange={(e) => setKeyword(e.target.value)}
    //   />
    //   {/* Doctor select */}
    //   <FormControl sx={{ m: 1, width: 600 }}>
    //     <InputLabel id="doctor-select-label">Doctors</InputLabel>
    //     <Select
    //       labelId="doctor-select-label"
    //       id="doctor-multiple-checkbox"
    //       multiple
    //       value={doctorName}
    //       onChange={handleChange}
    //       input={<OutlinedInput label="Doctors" />}
    //       renderValue={
    //         (selected) =>
    //           doctors
    //             .filter((doctor) => selected.includes(doctor.ID))
    //             .map((doctor) => doctor.Name)
    //             .join(", ") // Display names in the selected value
    //       }
    //       MenuProps={MenuProps}
    //     >
    //       {doctors.map((doctor) => (
    //         <MenuItem key={doctor.ID} value={doctor.ID}>
    //           <Checkbox checked={doctorName.includes(doctor.ID)} />
    //           <ListItemText primary={`${doctor.Name} - ${doctor.Department}`} />
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>{" "}

    //   <Button onClick={handleAddKeyword}>Add Keyword</Button>
    //   {pageStatus === "success" ? (
    //     <Snackbar
    //       open={successSnackBarState}
    //       autoHideDuration={5000}
    //       onClose={handleClose}
    //     >
    //       <Alert
    //         onClose={handleClose}
    //         severity="success"
    //         variant="filled"
    //         sx={{
    //           width: "100%",
    //           margin: "1em",
    //           fontSize: "1em",
    //         }}
    //       >
    //         Department saved successfully!
    //       </Alert>
    //     </Snackbar>
    //   ) : (
    //     <Snackbar
    //       open={failedSnackBarState}
    //       autoHideDuration={5000}
    //       onClose={handleClose}
    //     >
    //       <Alert
    //         onClose={handleClose}
    //         severity="error"
    //         variant="filled"
    //         sx={{
    //           width: "100%",
    //           margin: "1em",
    //           fontSize: "1em",
    //         }}
    //       >
    //         Failed on saving the Department!
    //       </Alert>
    //     </Snackbar>
    //   )}
    // </div>
  );
};

export default AddKeyword;
