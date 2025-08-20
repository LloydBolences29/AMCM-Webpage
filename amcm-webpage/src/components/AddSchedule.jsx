import { useEffect, useState } from "react";

const AddSchedule = () => {
  const [form, setForm] = useState({
    name: "",
    schedule: "",
    day_of_the_week: "",
    start_time: "",
    end_time: "",
  });
  const [searchDoctorValue, setSearchDoctorValue] =useState ("")
  const [doctorsData, setDoctorsData] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const fetchAllDoctorData = async () =>{
    try {
      const response = await fetch (`${VITE_API_URL}/doctor/get-doctors-departments/${searchDoctorValue}`)
      if (response.ok) {
        const data = await response.json();
        setDoctorsData(data);
      }else{
        setDoctorsData([]);
      }
      
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  }



  useEffect(() => {
    if(searchDoctorValue.trim() === ""){
      setDoctorsData([])
      return;
    }
    fetchAllDoctorData();
    console.log("Doctors Data: ", doctorsData);
  }, [searchDoctorValue]);

  return (
    <>
      <label htmlFor="name">Doctor's Name: </label>
      <input
        type="text"
        value={searchDoctorValue}
        placeholder="Doctor's Name"
        onChange={(e) => setSearchDoctorValue(e.target.value)}
        required
      />

      {doctorsData.length > 0 &&(
        <ul
        key={doctorsData.id}
        className="list-group"
        style={{maxHeight: "50px", overflowY: "scroll", cursor: "pointer"}}
        >
          {doctorsData.map((doctor) => (
            <li key={doctor.id}>{doctor.name} - {doctor.department}</li>
          ))}

        </ul>
      )}

      <label >Department: </label>
      <input
      type="text"
      name="Department"
      disabled
      />

      <label htmlFor="day_of_the_week">Choose a day: </label>
      <select
        name="day_of_the_week"
        id="day_of_the_week"
        value={form.day_of_the_week}
        onChange={(e) => setForm({ ...form, day_of_the_week: e.target.value })}
      >
        <option value="">Select a day</option>
        <option value="Sun">Sunday</option>
        <option value="Mon">Monday</option>
        <option value="Tue">Tuesday</option>
        <option value="Wed">Wednesday</option>
        <option value="Thu">Thursday</option>
        <option value="Fri">Friday</option>
        <option value="Sat">Saturday</option>
      </select>

      <label htmlFor="start_time">Set the start time</label>
      <input
        type="time"
        id="start_time"
        value={form.start_time}
        onChange={(e) => setForm({ ...form, start_time: e.target.value })}
        required
      />

      <label htmlFor="end_time">Set the end time</label>
      <input
        type="time"
        id="end_time"
        value={form.end_time}
        onChange={(e) => setForm({ ...form, end_time: e.target.value })}
        required
      />

      <button type="submit">Submit</button>
    </>
  );
};

export default AddSchedule;
