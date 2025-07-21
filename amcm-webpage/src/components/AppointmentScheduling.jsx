import { useState } from 'react';
import axios from 'axios';
import Navigation from "../components/Navigation";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import SeventhGrid from "../components/SeventhGrid";
import { useForm } from 'react-hook-form';


import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
} from '@mui/material';

const AppointmentScheduling = () => {
    const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Schedule and Appointment", path: "/appointment" },
    { label: "Find Doctors", path: "/doctors" },
    { label: "Patient Guide", path: "/patient-business" },
  ];


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [serverResponse, setServerResponse] = useState(null);

  const onSubmit = async (data) => {
    try {
      setServerResponse(null); // reset message
      const response = await axios.post('http://localhost:5000/api/contact', data);
      setServerResponse({ type: 'success', message: response.data.message });
      reset();
    } catch (error) {
      setServerResponse({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong',
      });
    }
  };
  return (
  <div className="home-body">
      <div className="home-content">
        <Navigation menuLinks={menuLinks} />
        <div className="main container">
          <Container>
            <Card
              className="content-column analytics-card shadow-sm p-3 bg-white rounded text-center"
              sx={{
                mb: 3,
                textAlign: "center",
                marginTop: "2em",
                backgroundColor: "#163235ff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  component="h1"
                  className="page-title fw-bold"
                  sx={{ color: "#ffffffff" }}
                >
                  Schedule an Appointment
                </Typography>
              </CardContent>
            </Card>
          </Container>

          <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 4, maxWidth: 600, mx: 'auto' }}
    >
      <Typography variant="h5" mb={2}>
        Contact Us
      </Typography>

      {serverResponse && (
        <Alert severity={serverResponse.type} sx={{ mb: 2 }}>
          {serverResponse.message}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            })}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>

          
          
        </div>
        <Footer />
      </div>
      <div className="seventh-grid">
        <SeventhGrid />
      </div>
    </div>
  )
}

export default AppointmentScheduling
