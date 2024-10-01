// controller/goalController.js
const Goal = require("../model/goalModel");
const User = require("../model/userModel");

// Add a new goal for the user
const addGoal = async (req, res) => {
  try {
    const { userId } = req.params;
    const { description, targetEmissionReduction, endDate } = req.body;
    console.log(`Adding goal for userId: ${userId}`); // Debug log
    console.log(`Goal data:`, req.body); // Log the incoming request data
    if (req.user._id.toString() !== userId) {
      console.log(
        "Unauthorized: User ID does not match the authenticated user"
      );
      return res.status(403).json({ message: "Unauthorized action" });
    }
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const newGoal = new Goal({
      userId: user._id,
      description,
      targetEmissionReduction,
      endDate,
      startDate: Date.now(),
      progress: 0, // Default progress to 0
    });

    await newGoal.save();
    user.goals.push(newGoal._id);
    await user.save();

    console.log("Goal added successfully:", newGoal); // Log the added goal
    res.status(201).json({ message: "Goal added successfully", goal: newGoal });
  } catch (error) {
    console.error("Error adding goal:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

// Fetch goals for a user
const fetchUserGoals = async (req, res) => {
  const { userId } = req.params;

  try {
    const goals = await Goal.find({ userId });
    if (!goals) {
      return res.status(404).json({ message: "No goals found for this user." });
    }

    res.status(200).json({ goals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGoals = async (req, res) => {
  const { userId, goalId } = req.params;

  try {
    const goal = await Goal.findOne({ _id: goalId, userId });
    if (req.user._id.toString() !== userId) {
      console.log(
        "Unauthorized: User ID does not match the authenticated user"
      );
      return res.status(403).json({ message: "Unauthorized action" });
    }
    if (!goal) {
      return res
        .status(404)
        .json({ message: `Goal with ${goalId} found for this user` });
    }
    // Delete the goals
    const deleteResult = await Goal.deleteOne({ _id: goalId });
    console.log(`deleted goal ${goalId} for this user ${userId}`);

    await User.findByIdAndUpdate(userId, { $pull: { goals: goalId } });
    // Log the result of the delete operation
    console.log(
      `Deleted ${deleteResult.deletedCount} goals for user ${userId}`
    );

    res
      .status(204)
      .json({
        message: "Goals deleted successfully",
        deletedCount: deleteResult.deletedCount,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addGoal, fetchUserGoals, deleteGoals };
