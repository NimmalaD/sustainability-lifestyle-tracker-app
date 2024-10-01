const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of the string
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique in the database
    lowercase: true, // Converts the email to lowercase before saving
    trim: true,
    validate: {
      validator: function(email) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
      },
      message: props => `${props.value} is not a valid email format!`
    }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0, // Age should be a positive number
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the date when a new document is created
  },
  //Storing carbonfootprints and goals as arrays in User schema
  carbonFootprints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarbonFootprint' }],
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }]
});


// Create the User model
const User = mongoose.model('User', userSchema);//creates a user table 

// Export the User model
module.exports = User;