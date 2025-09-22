import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

const login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Login successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handlesubmit} className=" bg-gray-100 border-2 p-2 w-full h-auto flex flex-col justify-between items-center gap-y-5">
        <div>
          <input type="email" className="rounded-xl p-2 border-[1px]" placeholder="enter your email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <input type="password" className="rounded-xl p-2 border-[1px]" placeholder="enter your password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <div>
          <button className="rounded-xl px-6 py-2.5 bg-green-500 text-white" type="submit">
            Login
          </button>
        </div>
        <p className="text-sm text-center w-full">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Click here to register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default login;
