import express from "express";

import Project from "../models/Project.js";

const router = express.Router();



// =========================
// GET PROJECTS
// =========================

router.get("/", async (req, res) => {

  try {

    const projects =
      await Project.find();

    res.json(projects);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });
  }
});





// =========================
// CREATE PROJECT
// =========================

router.post("/create", async (req, res) => {

  try {

    const {
      title,
      description,
      teamLead,
    } = req.body;




    // VALIDATION

    if (
      !title ||
      !description ||
      !teamLead
    ) {

      return res.status(400).json({

        message: "Please fill all fields",

      });
    }




    // CREATE PROJECT

    const project =
      await Project.create({

        title,

        description,

        teamLead,

        admin: teamLead,

        status: "Active",

        members: [],

      });




    res.status(201).json(project);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });
  }
});





// =========================
// ADD MEMBER
// =========================

router.put("/:id/add-member", async (req, res) => {

  try {

    const project =
      await Project.findById(req.params.id);




    project.members.push({

      name: req.body.name,

    });




    await project.save();

    res.json(project);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });
  }
});





// =========================
// REMOVE MEMBER
// =========================

router.put("/:id/remove-member", async (req, res) => {

  try {

    const project =
      await Project.findById(req.params.id);




    project.members =
      project.members.filter(

        (member) =>
          member.name !== req.body.name

      );




    await project.save();

    res.json(project);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });
  }
});





// =========================
// DELETE PROJECT
// =========================

router.delete("/:id", async (req, res) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );




    res.json({

      message: "Project deleted",

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });
  }
});

export default router;