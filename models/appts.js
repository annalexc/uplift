var mongoose = require('mongoose');

var ApptsSchema = mongoose.Schema({
  date: {type: String},
  location: {type: String},
  doctor: {type: String},
  phoneNum: {type: String},
  coPay: {type: Number},
  notes: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Appts', ApptsSchema);
