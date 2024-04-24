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
  const [scheduleData, setScheduleData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await axios.get("/api/schedules");
      setScheduleData(response.data); //Set Schedule Data from DB
    } catch (error) {
      console.error("Error fetching schedule data:", error); //Error MSG
    }
  };

  const handleDeleteSchedule = async (id, index) => {
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
          await axios.delete(`/api/schedules/${id}`);
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
      <div className="w-full lg:w-1/5">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-200">
        <div className="mx-auto w-full lg:w-3/4">
          <div className="m-4">
            <Card>
              <CardContent>
                <Typography fontWeight={"Bold"}>Your Schedule</Typography>
              </CardContent>
            </Card>
          </div>
          <div className="m-4">
            <Card>
              <CardContent>
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
                            <p className="text-white font-semibold text-center">
                              Time
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="text-white font-semibold text-center">
                              Class
                            </p>
                          </TableCell>
                          <TableCell>
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
                                  {new Date(item.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="center">
                                  {new Date(item.date).toLocaleTimeString()}
                                </TableCell>
                                <TableCell align="center">
                                  {item.classroom}
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() =>
                                      handleDeleteSchedule(item.id, index)
                                    }
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
