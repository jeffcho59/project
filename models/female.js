var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Female Schema
 */
var FemaleSchema = new Schema({
  Country: String,  
  Life1990: String,
  LIfe2000: String,
  Life2006: String,
});

mongoose.model('Female', FemaleSchema);
