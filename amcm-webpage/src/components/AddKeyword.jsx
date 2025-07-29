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

const AddKeyword = () => {
  const [doctorName, setDoctorName] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  const fetchAllDoctorsAndDepartments = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/doctor/get-doctors-departments`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("Doctors and departments fetched successfully:", data);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchAllDoctorsAndDepartments();
  }, []);

  return (
    <div>
      {/* Doctor select */}
      <FormControl sx={{ m: 1, width: 600 }}>
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
              <ListItemText primary={`${doctor.Name} - ${doctor.Department}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>{" "}
    </div>
  );
};

export default AddKeyword;
