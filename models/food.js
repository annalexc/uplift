var mongoose = require('mongoose');

var FoodsSchema = mongoose.Schema({
  restriction: {type: String},
  notes: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Food', FoodsSchema);
