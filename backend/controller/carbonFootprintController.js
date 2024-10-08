const User = require("../model/userModel");
const CarbonFootprint = require("../model/carbonFootprintModel");

// Create a new carbon footprint entry
const createCarbonFootprint = async (req, res) => {
  try {
    const { userId } = req.params;
    const { carbonFootprintData } = req.body;
    console.log(`Creating carbon footprint for userId: ${userId}`); // Log userId
    console.log("Carbon Footprint Data:", carbonFootprintData); // Log incoming data

    if(!userId){
      console.log('user information missing')
      return res.status(400).json({ message: "User information missing" });
    }

    if (req.user.userId !== userId) {
      console.log("Unauthorized: User ID does not match the authenticated user");
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const existingCarbonFootprint = await CarbonFootprint.findOne({
      userId,
      date: carbonFootprintData.date,
    });
    if (existingCarbonFootprint) {
      console.log("Carbon footprint for this date already exists");
      return res
        .status(400)
        .json({
          message: "Carbon footprint data for this date already exists.",
        });
    }

    const newCarbonFootprint = new CarbonFootprint({
      userId: user._id,
      date: carbonFootprintData.date,
      homeEnergy: carbonFootprintData.homeEnergy,
      transport: carbonFootprintData.transport,
      waste: carbonFootprintData.waste,
    });

    newCarbonFootprint.calculateTotalEmission();
    const savedCarbonFootprint = await newCarbonFootprint.save();

    user.carbonFootprints.push(savedCarbonFootprint._id);
    await user.save();

    console.log("Carbon footprint created successfully:", savedCarbonFootprint); // Log the saved footprint
    res
      .status(201)
      .json({
        message: "Carbon footprint created successfully",
        data: savedCarbonFootprint,
      });
  } catch (error) {
    console.error("Error creating carbon footprint:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

// Fetch carbon footprint data for a specific user
const fetchAllUserCarbonFootprints = async (req, res) => {
  try {
    const { userId } = req.params;
    if(!userId){
      console.log('user information missing')
      return res.status(400).json({ message: "User information missing" });
    }
    if (req.user.userId !== userId) {
      console.log("Unauthorized: User ID does not match the authenticated user");
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const carbonFootprints = await CarbonFootprint.find({ userId });
    if (!carbonFootprints) {
      return res.status(404).json({ message: "No carbon footprint data found for this user." });
    }

    res.status(200).json({ data: carbonFootprints });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const fetchOneCarbonFootprint = async (req, res) => {
  try {
    const {userId, carbonFootprintId} = req.params
    const carbonFootprint = await CarbonFootprint.findById(carbonFootprintId);
    console.log(req.user.userId)
    console.log(req.user._id)
    console.log(userId)
    console.log(req.user)
    console.log(req.params)
    console.log(req.params.carbonFootprintId)

    if(!userId){
      console.log('user information missing')
      return res.status(400).json({ message: "User information missing" });
    }

    if (req.user.userId !== userId) {
      console.log("Unauthorized: User ID does not match the authenticated user");
      return res.status(403).json({ message: "Unauthorized action" });
    }

    if (!carbonFootprint) {
      console.log("Carbonfootprint not found");
      return res.status(404).json({ message: "Carbonfootprint not found" });
    }

    // Return the carbon footprint data
    res.status(200).json({ data: carbonFootprint });
  } catch (error) {
    console.error("Error fetching carbon footprint:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update carbon footprint data for a specific user
const updateCarbonFootprint = async (req, res) => {
  try {
    const { userId } = req.params;
    const { carbonFootprintData } = req.body;

    console.log(`Updating carbon footprint for userId: ${userId}`); // Log userId

    // Ensure the logged-in user is the same as the userId in params
    if (req.user.userId !== userId) {
      console.log("Unauthorized: User ID does not match the authenticated user");
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Find the carbon footprint by userId and date
    const existingCarbonFootprint = await CarbonFootprint.findOne({
      userId,
      date: carbonFootprintData.date,
    });

    if (!existingCarbonFootprint) {
      console.log("Carbon footprint data not found for the specified date");
      return res.status(404).json({ message: "Carbon footprint data not found for this date." });
    }

    // Update the carbon footprint data
    existingCarbonFootprint.homeEnergy = carbonFootprintData.homeEnergy;
    existingCarbonFootprint.transport = carbonFootprintData.transport;
    existingCarbonFootprint.waste = carbonFootprintData.waste;

    // Recalculate the total emission
    existingCarbonFootprint.calculateTotalEmission();
    const updatedCarbonFootprint = await existingCarbonFootprint.save();

    console.log("Carbon footprint updated successfully:", updatedCarbonFootprint);
    res.status(200).json({
      message: "Carbon footprint updated successfully",
      data: updatedCarbonFootprint,
    });
  } catch (error) {
    console.error("Error updating carbon footprint:", error);
    res.status(500).json({ error: error.message });
  }
};

// Check if a user has carbon footprint data
const checkUserHasCarbonFootprint = async (req, res) => {
  const { userId } = req.params;

  try {
    const carbonFootprint = await CarbonFootprint.findOne({ userId });

    if (carbonFootprint) {
      return res.status(200).json({ hasData: true });
    } else {
      return res.status(200).json({ hasData: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createCarbonFootprint,
  fetchAllUserCarbonFootprints,
  checkUserHasCarbonFootprint,
  updateCarbonFootprint,
  fetchOneCarbonFootprint
};
