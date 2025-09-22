import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CreateUserByAdmin from "./Register"; // your form component
import CreateTeamByAdmin from "./CreateTeamByAdmin"; // your form component
import CreateTodo from "./CreateTodo"; // your form component

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTodo, setIsModalOpenTodo] = useState(false);
  const [isModalOpenTeam, setIsModalOpenTeam] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [todoData, setTodoData] = useState([]);

  async function handleTeamWithUser() {
    try {
      if (teamData.length === 0) {
        // fetch only if array is empty
        const response = await fetch("http://localhost:4000/api/v1/getteams", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }

        const data = await response.json();
        setTeamData(data.teams); // save teams in state
        console.log("Team Data:", data.teams); // optional debug log
      } else {
        // clear the array if already has data
        setTeamData([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/gettodos");
        const data = await res.json();
        setTodoData(data.todos);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="p-4  w-full h-full flex flex-col gap-3">
      <div className="flex w-full justify-between items-center gap-2">
        <div className="w-1/4 h-fit bg-amber-300 text-amber-600 cursor-pointer p-2 text-center rounded" onClick={() => setIsModalOpen(true)}>
          Users +
        </div>
        <div className="w-1/4 h-fit bg-amber-300 text-amber-600 cursor-pointer p-2 text-center rounded" onClick={() => setIsModalOpenTeam(true)}>
          Team +
        </div>
        <div
          className="w-1/4 h-fit bg-amber-300 text-amber-600 cursor-pointer p-2 text-center rounded"
          // onClick={() => setIsModalOpen(true)}
        >
          Add User to Team
        </div>
        <div className="w-1/4 h-fit bg-amber-300 text-amber-600 cursor-pointer p-2 text-center rounded" onClick={() => handleTeamWithUser()}>
          View All User and Team
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Create New User</h2>
          <CreateUserByAdmin />
        </Modal>
        <Modal isOpen={isModalOpenTeam} onClose={() => setIsModalOpenTeam(false)}>
          <h2 className="text-xl font-bold mb-4">Create New Team</h2>
          <CreateTeamByAdmin />
        </Modal>
        <Modal isOpen={isModalOpenTodo} onClose={() => setIsModalOpenTodo(false)}>
          <h2 className="text-xl font-bold mb-4">Create Todo</h2>
          <CreateTodo />
        </Modal>
      </div>
      <div>
        {teamData.map((d) => {
          return (
            <div key={d._id} className="mb-2 border p-2 rounded">
              <div className="font-bold">
              <div>Team : {d.name}</div>
               </div>
              <div className="flex ">
              <div className="font-bold px-2">Users : </div>

               <div> {d.users.map((e, index) => (
                  <span key={index} className="mr-2">
                    {e}
                  </span>
                ))}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full border-2 border-green-500 p-2">
        <div className="w-full h-fit flex  flex-col justify-start items-center">
          <ul>
            {todoData.map((d, idx) => (
              <li key={idx} className="m-2">
                <div>
                  <div>Title :{d.title}</div>
                  <div>Desc : {d.description}</div>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-2 px-6 py-3 bg-green-500 text-white font-medium rounded-xl w-fit text-center" onClick={() => setIsModalOpenTodo(true)}>
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
