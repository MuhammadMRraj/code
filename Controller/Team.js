import { Team } from "../Modal/Team.js";

const createTeam = async (req, res, next) => {
  const { name } = req.body;
  // console.log("body name ", name);
  try {
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res
        .status(400)
        .json({ error: "Team with this name already exists" });
    }
    const newTeam = new Team({ name });
    const savedTeam = await newTeam.save();
    res.status(201).json({ message: "Team has been created", Team: savedTeam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ teams: teams });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getSingleTeam = async (req, res, next) => {
  const teamId = req.params.teamId;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json({ team: team });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateTeam = async (req, res, next) => {
  const id = req.params.teamId;
  const newName = req.body.name;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json({ message: "Team name updated", team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTeam = async (req, res, next) => {
  const id = req.params.teamId;
  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json({ message: "Team  deleted", team: deletedTeam });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createTeam, getAllTeams, getSingleTeam, updateTeam, deleteTeam };
