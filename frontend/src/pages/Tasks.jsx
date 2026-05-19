import { useEffect, useState } from "react";
import API from "../api";
import "./tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const taskRes = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(taskRes.data);

      const projectRes = await API.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projectRes.data);

      const userRes = await API.get("/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {}); // ignore if route doesn't exist

    } catch {
      alert("Failed to load data ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/tasks",
        { title, projectId, assignedTo, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setProjectId("");
      setAssignedTo("");
      setDueDate("");
      fetchData();
    } catch {
      alert("Only Admin can create tasks ❌");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/tasks/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch {
      alert("Failed to update task ❌");
    }
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>

      {/* CREATE TASK FORM */}
      <form onSubmit={handleCreate} className="task-form">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Create Task</button>
      </form>

      {/* TASK LIST */}
    <div className="task-list">
  {tasks.map((task) => (
    <div key={task.id} className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>Status: {task.status}</p>
        <p>Due: {task.dueDate}</p>
      </div>

      <div className="task-buttons">
        <button onClick={() => updateStatus(task.id, "In Progress")}>
          In Progress
        </button>

        <button onClick={() => updateStatus(task.id, "Completed")}>
          Completed
        </button>

        <button
          style={{ background: "red" }}
          onClick={async () => {
            if (window.confirm("Tasks only deleted by ADMIN")) {
              await API.delete(`/tasks/${task.id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              fetchTasks();
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Tasks;