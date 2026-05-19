import { useEffect, useState } from "react";
import API from "../api";
import "./projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch {
      alert("Failed to load projects ❌");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/projects",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setDescription("");
      fetchProjects();
    } catch {
      alert("Only Admin can create projects ❌");
    }
  };

  return (
    <div className="projects-container">
      <h1>Projects</h1>

      <form onSubmit={handleCreate} className="project-form">
        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      <div className="project-list">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;