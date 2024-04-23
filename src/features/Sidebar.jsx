import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800); // Adjust the width threshold as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1876D0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsOpen(false); // Close the sidebar
        navigate("/");
      }
    });
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleToggleSidebar}
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            zIndex: 50,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isOpen}
        onClose={handleToggleSidebar}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <img src="Sidebar.png" alt="Sidebar" className="flex p-5" />
        <div className="flex items-center justify-center p-2 drop-shadow-xl">
          <Card style={{ backgroundColor: "#F0F0F0", width: "85%" }}>
            <CardContent>
              <List>
                <ListItem button component={Link} to="/Dashboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/Schedule">
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Schedule" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Person2Icon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
