const mongoose = require("mongoose");

const carbonFootprintSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  homeEnergy: {
    electricity: { 
      type: Number, 
      default: 0 
    }, // in kWh
    gas: { 
      type: Number, 
      default: 0 
    }, // in cubic meters
    water: { 
      type: Number, 
      default: 0 
    }, // in liters
  },
  transport: {
    car: { 
      type: Number, 
      default: 0 
    }, // in km
    bike: { 
      type: Number, 
      default: 0 
    }, // in km
    publicTransport: { 
      type: Number, 
      default: 0 
    }, // in km
    walk: { 
      type: Number, 
      default: 0 
    }, // in km
  },
  waste: {
    paper: { 
      type: Number, 
      default: 0 
    }, // in kg
    plastic: { 
      type: Number, 
      default: 0 
    }, // in kg
    glass: { 
      type: Number, 
      default: 0 
    }, // in kg
  },
  totalCarbonEmission: {
    type: Number,
    default: 0,
  }, // in kg CO2
});

// Method to calculate total carbon emission based on inputs
carbonFootprintSchema.methods.calculateTotalEmission = function () {
  const totalElectricity = this.homeEnergy.electricity * 0.5; // Assuming kWh -> kg CO2 factor is 0.5
const totalGas = this.homeEnergy.gas * 2.5; // Assuming cubic meters -> kg CO2 factor is 2.5
const totalWater = this.homeEnergy.water * 0.1; // Including water in the calculation

const totalCar = this.transport.car * 0.2; // Assuming km -> kg CO2 factor for a car
const totalBike = this.transport.bike * 0.2; // Assuming km -> kg CO2 factor for a bike
const totalPublicTransport = this.transport.publicTransport * 0.2; // Assuming km -> kg CO2 factor
const totalWalk = this.transport.walk * 0.2; // Assuming km -> kg CO2 factor

const totalPaper = this.waste.paper * 0.1; // Assuming kg -> kg CO2 factor
const totalPlastic = this.waste.plastic * 0.2; // Assuming kg -> kg CO2 factor
const totalGlass = this.waste.glass; // Assuming this value already represents kg CO2

// Sum all components for total emission
let totalEmission = totalElectricity + totalGas + totalWater + totalCar + totalBike + totalPublicTransport + totalWalk + totalPaper + totalPlastic + totalGlass;

// Restrict to 2 decimal points
totalEmission = parseFloat(totalEmission.toFixed(2));

this.totalCarbonEmission = totalEmission;
return totalEmission;
};

const CarbonFootprint = mongoose.model(
  "CarbonFootprint",
  carbonFootprintSchema
); //creates a carbonfoortprint table
module.exports = CarbonFootprint;
