import React, { useState } from "react";
import Sidebar from "../features/Sidebar";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Class Option
  const currencies = [
    { value: "10-1", label: "10-1" },
    { value: "10-2", label: "10-2" },
    { value: "11-1", label: "11-1" },
    { value: "11-2", label: "11-2" },
    { value: "12-1", label: "12-1" },
    { value: "12-2", label: "12-2" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  // Add Data To Table
  const handleAddButtonClick = () => {
    if (selectedDate && selectedTime && selectedClass) {
      // Convert selectedDate and selectedTime to Date objects
      const dateObject = new Date(selectedDate);
      const timeObject = new Date(selectedTime);

      const newScheduleItem = {
        date: dateObject,
        time: timeObject,
        class: selectedClass,
      };
      setScheduleData([...scheduleData, newScheduleItem]);
      // Clear inputs after adding to table
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedClass(null);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Send Data to Backend
  const handleGenerate = async () => {
    try {
      await axios.post("/api/schedules", { scheduleData });
      console.log("Data successfully sent to the backend!");
      // Success Notification
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data successfully sent!",
      });
    } catch (error) {
      console.error("Error while sending data to the backend:", error);
      // Error Notification
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send data. Please try again later.",
      });
    }
  };

  return (
    <div className="flex bg-gray-200 w-screen min-h-screen">
      <div className="w-1/5 drop-shadow-xl">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-200">
        <div className="mx-auto w-full lg:w-3/4">
          {/* Header Start */}
          <div className="m-4 drop">
            <Card>
              <CardContent>
                <Typography fontWeight={"bold"}>
                  Create Your Schedule
                </Typography>
              </CardContent>
            </Card>
          </div>
          {/* Header End */}
          {/* Content Start */}
          <div className="m-4">
            <Card>
              <CardContent>
                {/* Date Pick Start */}
                <div className="my-5">
                  <Typography>Pick Your Schedule Date</Typography>
                </div>
                <div className="my-5">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                {/* Date Pick End */}
                {/* Class Select Start*/}
                <div className="my-5">
                  <Typography>Pick Your Class</Typography>
                </div>
                <div className="my-5">
                  <TextField
                    select
                    value={selectedClass}
                    variant="outlined"
                    fullWidth
                    label="Class"
                    onChange={(event) => setSelectedClass(event.target.value)}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                {/* Class Select End */}
                {/* Time Select Start */}
                <div className="my-5">
                  <Typography>Pick Your Class Time</Typography>
                </div>
                <div className="my-5">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Pick Your Time"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="w-full"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                {/* Time Select End */}
                {/* Button Add Start */}
                <div className="my-5 flex items-center justify-start">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddButtonClick}
                    size="small"
                  >
                    Add Schedule
                  </Button>
                </div>
                {/* Button Add End */}
                {/* Table Start */}
                <div className="my-5">
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead style={{ backgroundColor: "#1876D0" }}>
                        <TableRow>
                          <TableCell>
                            <p className="text-white font-semibold text-center">
                              Date
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-white font-semibold text-center">
                              Time
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-white font-semibold text-center">
                              Class
                            </p>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {scheduleData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell align="center">
                                {item.date.toLocaleDateString()}
                              </TableCell>
                              <TableCell align="center">
                                {item.time.toLocaleTimeString()}
                              </TableCell>
                              <TableCell align="center">{item.class}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={scheduleData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
                {/* Table End */}
                {/* Submit Schedule Data Button Start */}
                <div className="my-5 flex items-center justify-center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleGenerate}
                  >
                    Generate
                  </Button>
                </div>
                {/* Submit Schedule Data Button End */}
              </CardContent>
            </Card>
          </div>
          {/* Content End */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
