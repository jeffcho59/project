var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Both Sexes Schema
 */
var BothSchema = new Schema({
  Country: String,  
  Life1990: String,
  LIfe2000: String,
  Life2006: String,
});

mongoose.model('Both', BothSchema);
