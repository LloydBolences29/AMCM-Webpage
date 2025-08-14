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

    const fetchDoctor = async (searchValue)=> {
    try {
      const response =  await fetch(`${VITE_API_URL}/doctor/get-doctors/${searchValue}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )

      if (response.ok){
        const res = await response.json();
        setDoctors(res)
      }else{
        const errorMsg = await response.json();
        setError(errorMsg.message)
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  }

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
        <Chip id="chip" label="Results" size="medium"/>
      </Divider>

      <br />

      <div id="doctor-cards" >
          
        {doctors.map((doctors, index) => {
          return (
            <Card key={index} className="doctor-card" >
              <div className="cards" style={{backgroundColor: '#007682', color: 'white', padding: '8px 16px', borderRadius: '8px' }}>
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
                    <i className="fas fa-door-open" style={{ marginRight: '8px', color: '#007682' }}>
                    Department: {doctors["Department"]}</i>
                  </Typography>
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
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: '#142C2E'
                    }}
                  >
                    <i className="fas fa-phone" style={{ marginRight: '8px', color: '#007682' }}></i>
                    Schedule: {doctors["Schedule"]}
                  </Typography>
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
