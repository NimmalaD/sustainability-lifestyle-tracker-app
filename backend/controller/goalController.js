// controller/goalController.js
const User = require("../model/userModel");
const Goal = require("../model/goalModel");

// Add a new goal for the user
const addGoal = async (req, res) => {
  try {
    const { userId } = req.params;
    const { description, targetEmissionReduction, endDate } = req.body;
    console.log(`Adding goal for userId: ${userId}`); // Debug log

    // Check if user is present
    if (!userId) {
      console.log("Unauthorized: User information is missing.");
      return res.status(400).json({ message: "Unauthorized action" });
    }

    // check if user id is equal to authorized user
    if (req.user.userId !== userId) {
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
      userId: userId,
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
  try {
    const { userId } = req.params;
    const goals = await Goal.find({ userId });
    if (!userId) {
      console.log("Unauthorized: User information is missing.");
      return res.status(400).json({ message: "Unauthorized action" });
    }
    if (req.user.userId !== userId) {
      console.log(
        "Unauthorized: User ID does not match the authenticated user"
      );
      return res.status(403).json({ message: "Unauthorized action" });
    }

    if (!goals) {
      return res.status(404).json({ message: "No goals found for this user." });
    }

    res.status(200).json({ data: goals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchOneGoal = async (req, res) => {
  try {
    const { userId, goalId } = req.params;
    const goal = await Goal.findById(goalId);
    if (!userId) {
      console.log("Unauthorized: User information is missing.");
      return res.status(400).json({ message: "Unauthorized action" });
    }
    if (req.user.userId !== userId) {
      console.log(
        "Unauthorized: User ID does not match the authenticated user"
      );
      return res.status(403).json({ message: "Unauthorized action" });
    }
    if (!goal) {
      console.log("Goal not found");
      return res.status(404).json({ message: "Goal not found" });
    }
    // Return the goal data
    res.status(200).json({ data: goal });
  } catch (error) {
    console.error("Error fetching goal:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteGoals = async (req, res) => {
  try {
    const { userId, goalId } = req.params;
    const goal = await Goal.findById(goalId);
    if (!userId) {
      console.log("Unauthorized: User information is missing.");
      return res.status(400).json({ message: "Unauthorized action" });
    }
    if (req.user.userId !== userId) {
      console.log(
        "Unauthorized: User ID does not match the authenticated user"
      );
      return res.status(403).json({ message: "Unauthorized action" });
    }
    if (!goal) {
      console.log("goal not found");
      return res.status(404).json({ message: `Goal not found` });
    }
    // Delete the goal
    const deleteResult = await Goal.deleteOne({ _id: goalId });
    console.log(`Deleted goal ${goalId} for user ${userId}`);

    // Remove the reference from the user's goals array
    await User.findByIdAndUpdate(userId, { $pull: { goals: goalId } });

    // Log the result of the delete operation
    console.log(
      `Deleted ${deleteResult.deletedCount} goal(s) for user ${userId}`
    );

    // Send the response
    res.status(200).json({
      message: "Goal deleted successfully",
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addGoal, fetchUserGoals, deleteGoals, fetchOneGoal };
