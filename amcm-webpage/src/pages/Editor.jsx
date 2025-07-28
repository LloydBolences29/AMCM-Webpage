import React from "react";
import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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

const Editor = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/doctor/get-all-doctors`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Doctors fetched successfully:", data);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(() => {
    fetchAllDoctors();
  }, []);

  console.log("Doctors state:", doctors);
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="doctor-select-label">Doctors</InputLabel>
      <Select
        labelId="doctor-select-label"
        id="doctor-multiple-checkbox"
        multiple
        value={doctorName}
        onChange={handleChange}
        input={<OutlinedInput label="Doctors" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {doctors.map((doctor) => (
          <MenuItem key={doctor.Name} value={doctor.Name}>
            <Checkbox checked={doctorName.includes(doctor.Name)} />
            <ListItemText primary={doctor.Name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Editor;
