import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
  },

  description: {
    type: String,
  },

  dueDate: {
    type: String,
  },

  priority: {
    type: String,
    default: "Medium",
  },

  assignedTo: {
    type: String,
  },

});

const Task = mongoose.model("Task", taskSchema);

export default Task;