// src/pages/Register.js
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
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
    name: "",
    email: "",
    team: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Registered successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
         setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
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
        <div>
          <input className="rounded-xl p-2 border-[1px]" placeholder="enter your name" type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <input type="email" className="rounded-xl p-2 border-[1px]" placeholder="enter your email" name="email" value={formData.email} onChange={handleChange} />
        </div>
         <select
        name="team"
        value={formData.team}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team._id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
        <div>
          <button className="rounded-xl px-6 py-2.5 bg-green-500 text-white" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
