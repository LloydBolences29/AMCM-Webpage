import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const FetchDoctorByDepartment = ({ searchValue }) => {
  const [doctors, setDoctors] = useState([]);
  const [expandedStates, setExpandedStates] = useState({});
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleExpandClick = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const fetchDoctor = async (searchValue) => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors/${searchValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const res = await response.json();
        setDoctors(res);
      } else {
        const errorMsg = await response.json();
        setError(errorMsg.message);
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      fetchDoctor(searchValue);
    }
  }, [searchValue]);

  if (doctors.length === 0) {
    return (
      <div className="text-center mt-5">
        <Typography variant="h6" color="textSecondary" className="fw-bold">
          {error}
        </Typography>
      </div>
    );
  }

  console.log("Fetched data of the doctors", doctors);
  return (
    <div id="doctor-wrapper">
      <br />
      <Divider>
        <Chip id="chip" label="Results" size="medium" />
      </Divider>
      <br />
      <div id="doctor-cards">
        {doctors.map((doctor) => {
          return (
            <Card key={doctor.id} className="doctor-card">
              <div
                className="cards"
                style={{
                  backgroundColor: "#007682",
                  color: "white",
                  padding: "8px 16px",
                  margin: "0.5rem",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#142C2E",
                      width: 56,
                      height: 56,
                      border: "2px solid white",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                    }}
                  >
                    {doctor.Name?.split(" ")[0][0]}
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Advent Sans, sans-serif",
                    }}
                  >
                    Dr. {doctor.Name}
                  </Typography>
                </div>
              </div>
              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#142C2E",
                    }}
                  >
                    <i
                      className="fas fa-building"
                      style={{ marginRight: "8px", color: "#007682" }}
                    ></i>
                    <Chip
                      label={doctor.department}
                      sx={{
                        bgcolor: "#163235",
                        color: "white",
                        fontSize: "1rem",
                        transition: "all 0.3s ease-in-out",

                        "&:hover": {
                          bgcolor: "#254f53ff",
                          boxShadow: 6,
                          transform: "translateY(-2px)",
                        },
                      }}
                    />
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#142C2E",
                    }}
                  >
                    <i
                      className="fas fa-door-open"
                      style={{ marginRight: "8px", color: "#007682" }}
                    ></i>
                    Room Number: {doctor.roomNumber}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#142C2E",
                    }}
                  >
                    <i
                      className="fas fa-phone"
                      style={{ marginRight: "8px", color: "#007682" }}
                    ></i>
                    Local Number: {doctor.localPhone}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      color: "#142C2E",
                    }}
                  >
                    <i
                      className="fas fa-calendar-alt"
                      style={{
                        marginRight: "8px",
                        color: "#007682",
                        marginTop: "4px",
                      }}
                    ></i>
                    <div style={{ width: "100%" }}>
                      {doctor.schedules.Clinic.length > 0 && (
                        <div style={{ textAlign: "left" }}>
                          <b>Clinic: </b>

                          {doctor.schedules.Clinic.map((doc) => (
                            <div
                              key={doc.id}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 2fr",
                              }}
                            >
                              <div>{doc.day}</div>
                              <div>{doc.time}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {doctor.schedules.Ultrasound.length > 0 && (
                        <div>
                          <b>Ultrasound: </b>
                          {doctor.schedules.Ultrasound.map((doc) => (
                            <div
                              key={doc.id}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 2fr",
                              }}
                            >
                              <div>{doc.day}</div>
                              <div>{doc.time}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Typography>{" "}
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FetchDoctorByDepartment;
