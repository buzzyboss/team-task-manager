import { useEffect, useState } from "react";
import API from "../api";
import "./dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch {
      alert("Failed to load dashboard ❌");
    }
  };

  fetchDashboard();

  // ✅ Auto refresh every 2 seconds
  const interval = setInterval(fetchDashboard, 2000);

  return () => clearInterval(interval);

}, [token]);

  if (!stats) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Tasks</h3>
          <p>{stats.totalTasks}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{stats.completedTasks}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{stats.pendingTasks}</p>
        </div>

        <div className="card">
          <h3>Overdue</h3>
          <p>{stats.overdueTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;