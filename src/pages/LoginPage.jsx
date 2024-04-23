import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
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
      // Perform login action here
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.data.success) {
        // Redirect to dashboard upon successful login
        navigate("/dashboard");
      } else {
        // Show Swal notification on failed login
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password. Please try again.",
        });
      }

      // For demonstration purposes, always redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      // Show sweet alert on login failure
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password. Please try again.",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="lg:w-full w-screen h-screen bg-gray-200 flex flex-col lg:flex-row justify-center items-center rounded-md m-auto">
      <div className="w-1/2">
        <div className="justify-center items-center flex flex-col">
          <p className="text-xl font-medium">Welcome</p>
          <div className="flex-col mt-5">
            <form
              //   onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <div className="mb-2">
                    <TextField
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      label="Username/Email"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="mb-2">
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
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="flex items-center justify-center mx-auto my-5">
                    <Button
                      style={{ width: "25%", backgroundColor: "#1876D0" }}
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Log in
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
            <div className="flex items-center justify-center">
              <Typography variant="body1"> Didnt Have Account?</Typography>
              <Link to="/CreateAccount">
                <Button>Create One</Button>
              </Link>
            </div>
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

export default Login;
