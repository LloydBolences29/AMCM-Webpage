import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FetchDoctorByDepartment = ({ activeDept }) => {
  const [doctors, setDoctors] = useState([]);
  const [expandedStates, setExpandedStates] = useState({});
const [loading, setLoading] = useState(true);
//   const cardStyle = {
//     maxWidth: 345,
//     margin: '16px',
//     transition: 'transform 0.2s, box-shadow 0.2s',
//     '&:hover': {
//       transform: 'translateY(-5px)',
//       boxShadow: '0 8px 16px rgba(0,118,130,0.2)',
//     },
//     backgroundColor: '#ffffff',
//     borderRadius: '12px',
//     border: '1px solid rgba(0,118,130,0.1)',
//   };

//   const headerStyle = {
//     backgroundColor: '#007682',
//     color: 'white',
//     padding: '16px',
//     borderRadius: '12px 12px 0 0',
//   };

//   const contentStyle = {
//     padding: '20px',
//   };

  const handleExpandClick = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const fetchDoctorsByDepartment = async (department) => {
    try {
      const response = await fetch(
        `${VITE_API_URL}/doctor/get-doctors-by-department/${department}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const res = await response.json();
      setDoctors(res);
    } catch (error) {
      console.error("Error fetching doctors by department:", error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeDept) {
      fetchDoctorsByDepartment(activeDept);
    }
  }, [activeDept]);


  if (doctors.length === 0) {
    return (
      <div className="text-center mt-5">
        <Typography variant="h6" color="textSecondary" className="fw-bold">
          There aren't any doctors available in this department yet.
        </Typography>
      </div>
    );
  }

  console.log("Fetched data of the doctors", doctors);
  return (
    <div id="doctor-wrapper">
      <br />

      <Divider>
        <Chip label={`Doctors for ${activeDept}`} size="medium"/>
      </Divider>

      <br />

      <div id="doctor-cards" >
          
        {doctors.map((doctors, index) => {
          return (
            <Card key={index} className="doctor-card" >
              <div style={{backgroundColor: '#007682', color: 'white', padding: '8px 16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                  <Avatar
                    sx={{
                      bgcolor: '#142C2E',
                      width: 56,
                      height: 56,
                      border: '2px solid white',
                      fontSize: '1.5rem',
                      fontWeight: 500
                    }}
                  >
                    {doctors.Name.split(' ')[0][0]}
                  </Avatar>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 600, fontFamily: 'Advent Sans, sans-serif' }}>
                    Dr. {doctors.Name}
                  </Typography>
                </div>
              </div>
              <CardActionArea>
                <CardContent>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1,
                      color: '#142C2E'
                    }}
                  >
                    <i className="fas fa-door-open" style={{ marginRight: '8px', color: '#007682' }}></i>
                    Room Number: {doctors["Room Number"]}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: '#142C2E'
                    }}
                  >
                    <i className="fas fa-phone" style={{ marginRight: '8px', color: '#007682' }}></i>
                    Local Phone: {doctors["Local Phone"]}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <Divider />

              <CardActions>
                <ExpandMore
                  expand={expandedStates[index]}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expandedStates[index]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse in={expandedStates[index]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography sx={{ marginBottom: 2 }}>Schedule:</Typography>
                  <Typography>{doctors["Schedule"]}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FetchDoctorByDepartment;
