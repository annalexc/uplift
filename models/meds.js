var mongoose = require('mongoose');

var MedsSchema = mongoose.Schema({
  name: {type: String},
  dosage: {type: String},
  sideEffects: {type: String},
  time: {type: String},
  coPay: {type: Number}
}, {timestamps: true});

module.exports = mongoose.model('Meds', MedsSchema);
