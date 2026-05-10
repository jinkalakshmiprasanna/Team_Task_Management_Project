import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

   members: [String],
    
},
{
    timestamps: true
}
);

export default mongoose.model("Project", ProjectSchema);