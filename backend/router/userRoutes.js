const express = require('express');
const router = express.Router();
const { createUser, fetchUser, loginUser } = require('../controller/userController');
const { createCarbonFootprint, fetchAllUserCarbonFootprints, checkUserHasCarbonFootprint, updateCarbonFootprint, fetchOneCarbonFootprint } = require('../controller/carbonFootprintController');
const { addGoal, fetchUserGoals, deleteGoals } = require('../controller/goalController');
const verifyToken = require('../middleware/verifyToken'); // Import JWT middleware

// User Routes
router.post('/users', createUser); // Public: Create a new user
router.post('/login', loginUser); // Public: User login
router.get('/users/:id', verifyToken, fetchUser); // Public: Fetch user data

// Carbon Footprint Routes
router.post('/users/:userId/carbon-footprint', verifyToken, createCarbonFootprint); // Protected: Create a carbon footprint
router.get('/users/:userId/carbon-footprint', verifyToken, fetchAllUserCarbonFootprints); // Protected: Fetch carbon footprint for a specific user
router.put('/users/:userId/carbon-footprint', verifyToken, updateCarbonFootprint); // Protected: Update carbon footprint
router.get('/check-carbon-footprint/:userId', verifyToken, checkUserHasCarbonFootprint); // Protected: Check if the user has a carbon footprint
router.get('/users/:userId/carbon-footprints/:carbonFootprintId', verifyToken, fetchOneCarbonFootprint);

// Goals Routes
router.post('/users/:userId/goals', verifyToken, addGoal); // Protected: Add a new goal for a user
router.get('/users/:userId/goals', verifyToken, fetchUserGoals); // Protected: Fetch goals for a user
router.delete('/users/:userId/goals/:goalId', verifyToken, deleteGoals); // Protected: Delete a goal for a user

module.exports = router;
