import Task from "../models/Task.js";
// GET TASKS
export const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find();

    res.json(tasks);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,
    });
  }
};




// CREATE TASK

export const createTask = async (req, res) => {

  try {

    const task = await Task.create({

      title: req.body.title,

      description: req.body.description,

      dueDate: req.body.dueDate,

      priority: req.body.priority,

      assignedTo: req.body.assignedTo,

    });

    res.status(201).json(task);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,
    });
  }
};




// UPDATE TASK

export const updateTask = async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
      }

    );

    res.json(updatedTask);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,
    });
  }
};




// DELETE TASK

export const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({

      message: "Deleted",
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,
    });
  }
};