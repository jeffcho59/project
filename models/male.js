var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Male Schema
 */
var MaleSchema = new Schema({
  Country: String,  
  Life1990: String,
  LIfe2000: String,
  Life2006: String,
});

mongoose.model('Male', MaleSchema);
