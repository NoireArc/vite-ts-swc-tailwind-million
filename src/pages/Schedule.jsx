import React, { useState, useEffect } from "react";
import Sidebar from "../features/Sidebar";
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import Swal from "sweetalert2";

const Schedule = () => {
  // Create Dummy Data Start
  //   function createData(date, time, classValue) {
  //     return { date, time, class: classValue };
  //   }

  //   const rows = [
  //     createData("A", "B", "C"),
  //     createData("A", "B", "C"),
  //     createData("A", "B", "C"),
  //     createData("A", "B", "C"),
  //   ];
  // Create Dumm Data End

  const [scheduleData, setScheduleData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  // Get Data
  const fetchScheduleData = async () => {
    try {
      const response = await axios.get("/api/schedules");
      setScheduleData(response.data);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  //   Handle Delete Data
  const handleDeleteSchedule = async (index) => {
    const scheduleToDelete = scheduleData[index];

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/schedules/${scheduleToDelete.id}`);
          // Remove the deleted schedule from the state
          setScheduleData((prevData) =>
            prevData.filter((item, idx) => idx !== index)
          );
          Swal.fire("Deleted!", "Your schedule has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting schedule:", error);
          Swal.fire("Error!", "Failed to delete schedule.", "error");
        }
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex bg-gray-200 w-screen h-screen">
      <div className="w-1/5 drop-shadow-xl">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-200">
        <div className="mx-auto w-3/4">
          {/* Header Start */}
          <div className="m-4 drop">
            <Card>
              <CardContent>
                <Typography fontWeight={"Bold"}>Your Schedule</Typography>
              </CardContent>
            </Card>
          </div>
          {/* Header End */}
          {/* Content Start */}
          <div className="m-4">
            <Card>
              <CardContent>
                {/* Table Start */}
                <div className="my-5">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead style={{ backgroundColor: "#1876D0" }}>
                        <TableRow>
                          <TableCell>
                            <p className="text-white font-semibold text-center">
                              Date
                            </p>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <p className="text-white font-semibold text-center">
                              Time
                            </p>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <p className="text-white font-semibold text-center">
                              Class
                            </p>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <p className="text-white font-semibold text-center">
                              Action
                            </p>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(scheduleData) &&
                          scheduleData
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
                                <TableCell align="center">
                                  {item.class}
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteSchedule(index)}
                                  >
                                    <DeleteForeverIcon />
                                  </Button>
                                </TableCell>
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
              </CardContent>
            </Card>
          </div>
          {/* Content End */}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
