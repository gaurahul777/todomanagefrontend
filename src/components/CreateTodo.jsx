// src/pages/Register.js
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTodo = () => {
//   const navigate = useNavigate();
  const [teams, setTeams] = useState([]);


 useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/getteams");
        const data = await res.json();
        setTeams(data.teams);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, []);

  const [formData, setFormData] = useState({
    team: "",
    creator: "",
    title: "",
    description: "",
    allowedEditors:""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/api/v1/create-todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Create todo successfully!");
        
      } else {
         
        toast.error(data.message || "Something went wrong!");
      }

      console.log("Server Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="bg-gray-100 border-2 p-2 w-full h-[300px] flex flex-col justify-between items-center">
        <select
        name="team"
        value={formData.team}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
        <div>
          <input type="text" className="rounded-xl p-2 border-[1px]" placeholder="enter your title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <input type="text" className="rounded-xl p-2 border-[1px]" placeholder="enter your description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <button className="rounded-xl px-6 py-2.5 bg-green-500 text-white" type="submit">
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
