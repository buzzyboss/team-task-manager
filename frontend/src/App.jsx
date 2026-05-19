import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";


function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
     {token && window.location.pathname !== "/" && (
       <nav style={{
  padding: "15px",
  background: "#1e293b",
  color: "white",
  display: "flex",
  gap: "20px",
  alignItems: "center"
}}>
  <Link style={{ color: "white" }} to="/dashboard">Dashboard</Link>
  <Link style={{ color: "white" }} to="/projects">Projects</Link>
  <Link style={{ color: "white" }} to="/tasks">Tasks</Link>
  <button
    onClick={handleLogout}
    style={{
      marginLeft: "auto",
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer"
    }}
  >
    Logout
  </button>
</nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;