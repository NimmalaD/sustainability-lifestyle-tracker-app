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
  const totalElectricity = this.homeEnergy.electricity * 0.5;
  const totalGas = this.homeEnergy.gas * 2.5;
  const totalWater = this.homeEnergy.water * 0.1; // Including water in the calculation
  
  const totalCar = this.transport.car * 0.2;
  const totalBike = this.transport.bike * 0.2;
  const totalPublicTransport = this.transport.publicTransport * 0.2;
  const totalWalk = this.transport.walk * 0.2;
  
  const totalPaper = this.waste.paper * 0.1;
  const totalPlastic = this.waste.plastic * 0.2;
  const totalGlass = this.waste.glass; // Assuming this value already represents CO2 kg
  
  // Sum all components for total emission
  const totalEmission = 
    totalElectricity + totalGas + totalWater +
    totalCar + totalBike + totalPublicTransport + totalWalk +
    totalPaper + totalPlastic + totalGlass;

  this.totalCarbonEmission = totalEmission;
  return totalEmission;
};

const CarbonFootprint = mongoose.model(
  "CarbonFootprint",
  carbonFootprintSchema
); //creates a carbonfoortprint table
module.exports = CarbonFootprint;
