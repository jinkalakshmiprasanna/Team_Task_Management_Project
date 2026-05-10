import Project from "../models/Project.js";


// CREATE PROJECT
export const createProject = async (req, res) => {

    try {

        const { title, description } = req.body;

        const project = await Project.create({
            title,
            description,
            createdBy: req.user.id,
            members: [req.user.id]
        });

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



// GET PROJECTS FOR MEMBER
export const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            members: req.user.id
        })
        .populate("members", "name email role")
        .populate("createdBy", "name");

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};




// ADD MEMBER
export const addMember = async (req, res) => {

    try {

        const { projectId, memberId } = req.body;

        const project = await Project.findById(projectId);

        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if(!project.members.includes(memberId)) {

            project.members.push(memberId);

            await project.save();
        }

        res.json({
            message: "Member added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};




// REMOVE MEMBER
export const removeMember = async (req, res) => {

    try {

        const { projectId, memberId } = req.body;

        const project = await Project.findById(projectId);

        project.members = project.members.filter(
            member => member.toString() !== memberId
        );

        await project.save();

        res.json({
            message: "Member removed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};