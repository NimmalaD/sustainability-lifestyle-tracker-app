const express = require('express');
const router = express.Router();
const { createUser, fetchUser, loginUser } = require('../controller/userController');
const { createCarbonFootprint, fetchUserCarbonFootprint, checkUserHasCarbonFootprint, updateCarbonFootprint } = require('../controller/carbonFootprintController');
const { authenticateUser } = require('../middleware/basicAuth');
const { addGoal, fetchUserGoals, deleteGoals } = require('../controller/goalController');

// User Routes
router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/users/:id', fetchUser);


// Carbon Footprint Routes
router.post('/users/:userId/carbon-footprint', authenticateUser, createCarbonFootprint);
router.get('/users/:userId/carbon-footprint', fetchUserCarbonFootprint); //fetch the carbon foot prints based on specific user
router.put('/users/:userId/carbon-footprint',authenticateUser, updateCarbonFootprint)//update carbon foot prints based on specific user
router.get('/check-carbon-footprint/:userId', checkUserHasCarbonFootprint);

//Goals Routes
router.post('/users/:userId/goals',authenticateUser,  addGoal);// Add a new goal for a user
router.get('/users/:userId/goals', fetchUserGoals);// Fetch goals for a user
router.delete('/users/:userId/goals/:goalId', authenticateUser, deleteGoals)// delete goals for a user

module.exports = router;
