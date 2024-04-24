import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send user data to backend
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // Check if registration is successful
      if (response.data.success) {
        // Redirect to dashboard upon successful registration
        navigate("/");
      } else {
        // Show Swal notification on failed registration
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Failed to create account. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration failed", error);
      // Show sweet alert on registration failure
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Failed to create account. Please try again.",
      });
    }
  };

  return (
    <div className="lg:w-full w-screen h-screen bg-gray-200 flex flex-col lg:flex-row justify-center items-center rounded-md m-auto">
      <div className="w-1/2">
        <div className="justify-center items-center flex flex-col">
          <p className="text-xl font-medium">Create Account</p>
          <div className="flex flex-col mt-5 items-center justify-center">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-center",
                width: "100%",
              }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    className="w-1/2"
                    value={name}
                    onChange={handleNameChange}
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleShowPasswordToggle}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="flex flex-col items-center justify-evenly">
                    <Button
                      size="small"
                      style={{ backgroundColor: "#1876D0" }}
                      type="submit"
                      variant="contained"
                    >
                      Create Account
                    </Button>
                    <Link to="/">
                      <Button size="small">Back</Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        {!isMobile && (
          <img
            src="LoginPage.png"
            alt="Login"
            className="rounded-md h-full w-1/2"
          />
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
