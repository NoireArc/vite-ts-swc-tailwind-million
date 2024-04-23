import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
// import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/CreateAccount" element={<CreateAccount />} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
