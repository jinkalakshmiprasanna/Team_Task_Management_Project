import React, { useEffect, useState } from "react";
import axios from "axios";

interface Member {
  _id?: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  teamLead?: string;
  admin?: string;
  status?: string;
  members?: Member[];
}

const Projects = () => {

  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [teamLead, setTeamLead] = useState("");

  const [memberName, setMemberName] = useState("");

  const [loading, setLoading] = useState(false);





  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "/api/projects"
      );

      setProjects(res.data);

    }

    catch (error) {

      console.log(error);
    }

    finally {

      setLoading(false);
    }
  };



  useEffect(() => {

    fetchProjects();

  }, []);





  // =========================
  // CREATE PROJECT
  // =========================

  const handleCreate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !title ||
      !description ||
      !teamLead
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      const res = await axios.post(

        "/api/projects/create",

        {
          title,
          description,
          teamLead,
        }

      );



      // ADD PROJECT INSTANTLY

      setProjects((prev) => [
        res.data,
        ...prev,
      ]);



      // CLEAR FORM

      setTitle("");

      setDescription("");

      setTeamLead("");

    }

    catch (error) {

      console.log(error);

      alert("Failed to create project");
    }
  };





  // =========================
  // ADD MEMBER
  // =========================

  const addMember = async (
    projectId: string
  ) => {

    if (!memberName) {

      alert("Enter member name");

      return;
    }

    try {

      const res = await axios.put(

        `/api/projects/${projectId}/add-member`,

        {
          name: memberName,
        }

      );



      setProjects((prev) =>
        prev.map((project) =>
          project._id === projectId
            ? res.data
            : project
        )
      );



      setMemberName("");

    }

    catch (error) {

      console.log(error);

      alert("Failed to add member");
    }
  };





  // =========================
  // REMOVE MEMBER
  // =========================

  const removeMember = async (
    projectId: string,
    name: string
  ) => {

    try {

      const res = await axios.put(

        `/api/projects/${projectId}/remove-member`,

        {
          name,
        }

      );



      setProjects((prev) =>
        prev.map((project) =>
          project._id === projectId
            ? res.data
            : project
        )
      );

    }

    catch (error) {

      console.log(error);
    }
  };





  // =========================
  // DELETE PROJECT
  // =========================

  const deleteProject = async (
    id: string
  ) => {

    try {

      await axios.delete(
        `/api/projects/${id}`
      );



      setProjects((prev) =>
        prev.filter(
          (project) => project._id !== id
        )
      );

    }

    catch (error) {

      console.log(error);
    }
  };





  const completedProjects =
    projects.filter(
      project => project.status === "Completed"
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

                {projects.length}

              </h3>

              <p className="mt-3 text-gray-500 font-medium">

                Total Projects

              </p>

            </div>





            <div className="bg-slate-100 rounded-3xl p-8 text-center">

              <h3 className="text-5xl font-bold text-green-500">

                {completedProjects}

              </h3>

              <p className="mt-3 text-gray-500 font-medium">

                Completed

              </p>

            </div>





            <div className="bg-slate-100 rounded-3xl p-8 text-center">

              <h3 className="text-5xl font-bold text-yellow-500">

                {projects.length - completedProjects}

              </h3>

              <p className="mt-3 text-gray-500 font-medium">

                Active

              </p>

            </div>

          </div>

        </div>






        {/* MAIN CONTENT */}

        <div className="flex-1">



          {/* CREATE PROJECT */}

          <div className="bg-slate-200 rounded-3xl p-10 shadow-xl mb-10">

            <h2 className="text-4xl font-bold mb-8 text-gray-800">

              Create New Project

            </h2>





            <form
              onSubmit={handleCreate}
            >

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <input

                  type="text"

                  placeholder="Project Title"

                  value={title}

                  onChange={(e)=>
                    setTitle(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                />





                <input

                  type="text"

                  placeholder="Description"

                  value={description}

                  onChange={(e)=>
                    setDescription(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                />





                <input

                  type="text"

                  placeholder="Team Lead"

                  value={teamLead}

                  onChange={(e)=>
                    setTeamLead(e.target.value)
                  }

                  className="p-5 rounded-2xl border text-black"

                />





                <button

                  type="submit"

                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg"

                >

                  Add Project

                </button>

              </div>

            </form>

          </div>






          {/* PROJECT LIST */}

          <div>

            <h2 className="text-4xl font-bold text-gray-800 mb-8">

              Your Projects

            </h2>





            {loading ? (

              <div className="text-center text-xl">

                Loading...

              </div>

            ) : projects.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 shadow-xl text-center">

                <h3 className="text-3xl font-bold text-gray-700">

                  No Projects Yet

                </h3>

                <p className="mt-4 text-gray-500">

                  Create your first project above.

                </p>

              </div>

            ) : (

              <div className="space-y-8">

                {projects.map((project) => (

                  <div

                    key={project._id}

                    className={`rounded-3xl p-8 shadow-xl border-l-8

                      ${
                        project.status === "Completed"
                          ? "bg-green-50 border-green-400"
                          : "bg-white border-indigo-400"
                      }
                    `}
                  >

                    <div className="flex justify-between items-center">




                      {/* PROJECT CONTENT */}

                      <div>

                        <h2 className={`text-3xl font-bold

                          ${
                            project.status === "Completed"
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }
                        `}>

                          {project.title}

                        </h2>





                        <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">

                          {project.description}

                        </p>





                        {/* TEAM LEAD */}

                        <p className="mt-3 text-blue-600 font-semibold">

                          Team Lead:
                          {" "}

                          {project.teamLead || "No Lead"}

                        </p>





                     






                        {/* ADD MEMBER */}

                        <div className="mt-6">

                          <input

                            type="text"

                            placeholder="Member Name"

                            value={memberName}

                            onChange={(e)=>
                              setMemberName(e.target.value)
                            }

                            className="border p-4 rounded-2xl w-full text-black"

                          />





                          <button

                            onClick={() =>
                              addMember(project._id)
                            }

                            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold"

                          >

                            Add Member

                          </button>

                        </div>






                        {/* MEMBER LIST */}

                        <div className="mt-8">

                          <h4 className="font-bold text-gray-700 mb-4">

                            Team Members

                          </h4>





                          <div className="flex flex-wrap gap-3">

                            {
                              project.members?.map((member)=>(

                                <div

                                  key={member._id}

                                  className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-3"

                                >

                                  {member.name}





                                  <button

                                    onClick={() =>
                                      removeMember(
                                        project._id,
                                        member.name
                                      )
                                    }

                                    className="text-red-500 font-bold"

                                  >

                                    ✕

                                  </button>

                                </div>

                              ))
                            }

                          </div>

                        </div>

                      </div>






                      {/* ACTIONS */}

                      <div className="flex gap-4">

                        <button

                          className={`px-8 py-4 rounded-2xl text-white font-semibold

                            ${
                              project.status === "Completed"
                                ? "bg-yellow-500"
                                : "bg-emerald-500"
                            }
                          `}
                        >

                          {project.status === "Completed"
                            ? "Completed"
                            : "Active"}

                        </button>





                        <button

                          onClick={() =>
                            deleteProject(project._id)
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

export default Projects;