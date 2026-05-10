import mongoose from "mongoose";

const loginHistorySchema =
  new mongoose.Schema({

    email: {

      type: String,

    },



    loginTime: {

      type: Date,

      default: Date.now,

    },

  });

export default mongoose.model(

  "LoginHistory",

  loginHistorySchema

);