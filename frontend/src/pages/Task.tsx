import React, { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  assignedTo?: string;
  completed: boolean;
}

const Tasks = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  const [loading, setLoading] = useState(false);



  // =========================
  // FETCH TASKS
  // =========================

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "/api/tasks"
      );

      setTasks(res.data);

    }

    catch (error) {

      console.log(error);
    }

    finally {

      setLoading(false);
    }
  };



  useEffect(() => {

    fetchTasks();

  }, []);





  // =========================
  // CREATE TASK
  // =========================

  const createTask = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !title.trim() ||
      !dueDate ||
      !assignedTo
    ) {

      alert(
        "Please enter task title, deadline and assigned member"
      );

      return;
    }

    try {

      const res = await axios.post(

        "/api/tasks",

        {
          title,
          description,
          dueDate,
          assignedTo,
        }

      );



      // ADD TASK INSTANTLY

      setTasks((prev) => [
        res.data,
        ...prev,
      ]);



      // CLEAR FORM

      setTitle("");

      setDescription("");

      setDueDate("");

      setAssignedTo("");

    }

    catch (error) {

      console.log(error);

      alert("Failed to create task");
    }
  };





  // =========================
  // TOGGLE TASK
  // =========================

  const toggleTask = async (
    id: string,
    completed: boolean
  ) => {

    try {

      await axios.put(

        `/api/tasks/${id}`,

        {
          completed: !completed,
        }

      );



      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? {
                ...task,
                completed: !completed,
              }
            : task
        )
      );

    }

    catch (error) {

      console.log(error);
    }
  };





  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (
    id: string
  ) => {

    try {

      await axios.delete(

        `/api/tasks/${id}`

      );



      setTasks((prev) =>
        prev.filter(
          (task) => task._id !== id
        )
      );

    }

    catch (error) {

      console.log(error);
    }
  };





  const completedTasks =
    tasks.filter(
      task => task.completed
    ).length;





  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto flex gap-10">



        {/* SIDEBAR */}

        <div className="w-72 bg-white rounded-3xl shadow-xl p-8 h-fit">

          <h2 className="text-4xl font-bold text-indigo-500 mb-8">

            Overview

          </h2>





          <div className="space-y-6">



            <div className="bg-slate-100 rounded-3xl p-8 text-center">

              <h3 className="text-5xl font-bold text-indigo-500">

                {tasks.length}

              </h3>

              <p className="mt-3 text-gray-500 font-medium">

                Total Tasks

              </p>

            </div>





            <div className="bg-slate-100 rounded-3xl p-8 text-center">

              <h3 className="text-5xl font-bold text-green-500">

                {completedTasks}

              </h3>

              <p className="mt-3 text-gray-500 font-medium">

                Completed

              </p>

            </div>





            <div className="bg-slate-100 rounded-3xl p-8 text-center">

              <h3 className="text-5xl font-bold text-yellow-500">

                {tasks.length - completedTasks}

              </h3>

              <p className="mt-3 text-gray-500 font-medium">

                Remaining

              </p>

            </div>

          </div>

        </div>






        {/* MAIN CONTENT */}

        <div className="flex-1">



          {/* CREATE TASK */}

          <div className="bg-slate-200 rounded-3xl p-10 shadow-xl mb-10">

            <h2 className="text-4xl font-bold mb-8 text-gray-800">

              Create New Task

            </h2>





            <form
              onSubmit={createTask}
            >

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                <input

                  type="text"

                  placeholder="Enter task title"

                  value={title}

                  onChange={(e)=>
                    setTitle(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                />





                <input

                  type="text"

                  placeholder="Add description"

                  value={description}

                  onChange={(e)=>
                    setDescription(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                />





                <input

                  type="date"

                  value={dueDate}

                  onChange={(e)=>
                    setDueDate(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                  required

                />





                <input

                  type="text"

                  placeholder="Assigned Member Name"

                  value={assignedTo}

                  onChange={(e)=>
                    setAssignedTo(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                  required

                />





                <button

                  type="submit"

                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg"

                >

                  Add Task

                </button>

              </div>

            </form>

          </div>






          {/* TASK LIST */}

          <div>

            <h2 className="text-4xl font-bold text-gray-800 mb-8">

              Your Tasks

            </h2>





            {loading ? (

              <div className="text-center text-xl">

                Loading...

              </div>

            ) : tasks.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 shadow-xl text-center">

                <h3 className="text-3xl font-bold text-gray-700">

                  No Tasks Yet

                </h3>

                <p className="mt-4 text-gray-500">

                  Create your first task above.

                </p>

              </div>

            ) : (

              <div className="space-y-8">

                {tasks.map((task) => (

                  <div

                    key={task._id}

                    className={`rounded-3xl p-8 shadow-xl border-l-8

                      ${
                        task.completed
                          ? "bg-green-50 border-green-400"
                          : "bg-white border-indigo-400"
                      }
                    `}
                  >

                    <div className="flex justify-between items-center">




                      {/* TASK CONTENT */}

                      <div>

                        <h2 className={`text-3xl font-bold

                          ${
                            task.completed
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }
                        `}>

                          {task.title}

                        </h2>





                        {task.description && (

                          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">

                            {task.description}

                          </p>

                        )}





                        {/* DEADLINE */}

                        <p className="mt-3 text-sm text-red-500 font-semibold">

                          Deadline:
                          {" "}

                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No Deadline"}

                        </p>





                        {/* ASSIGNED MEMBER */}

                        <p className="mt-2 text-blue-600 font-semibold">

                          Assigned To:
                          {" "}

                          {task.assignedTo || "No Member"}

                        </p>

                      </div>






                      {/* ACTIONS */}

                      <div className="flex gap-4">

                        <button

                          onClick={() =>
                            toggleTask(
                              task._id,
                              task.completed
                            )
                          }

                          className={`px-8 py-4 rounded-2xl text-white font-semibold

                            ${
                              task.completed
                                ? "bg-yellow-500"
                                : "bg-emerald-500"
                            }
                          `}
                        >

                          {task.completed
                            ? "Mark Incomplete"
                            : "Mark Complete"}

                        </button>





                        <button

                          onClick={() =>
                            deleteTask(task._id)
                          }

                          className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-2xl text-white font-semibold"

                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Tasks;