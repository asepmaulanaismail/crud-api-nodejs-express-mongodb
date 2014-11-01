/**
 * Car
 *
 * @module      :: Model
 * @description :: Represent data model for the Cars
 * @author      :: Asep Maulana Ismail
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Car = new Schema({

  model:    {
    type    : String,
    require : true
  },
  year:   {
    type: String,
    require : true
  },
  color:   {
    type: String,
    require : true
  },
  price :   {
    type    : Number,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

Car.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});

module.exports = mongoose.model('Car', Car);