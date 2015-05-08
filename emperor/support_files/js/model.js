/**
 *
 * @author Jamie Morton, Jose Navas Molina, Andrew Hodges & Yoshiki
 *         Vazquez-Baeza
 * @copyright Copyright 2013--, The Emperor Project
 * @credits Jamie Morton, Jose Navas Molina, Andrew Hodges & Yoshiki
 *          Vazquez-Baeza
 * @license BSD
 * @version 0.9.51-dev
 * @maintainer Yoshiki Vazquez Baeza
 * @email yoshiki89@gmail.com
 * @status Development
 *
 */


/**
 *
 * @name Plottable
 *
 * @class Represents a sample and the associated metadata in the ordination
 * space.
 *
 */


/**
 *
 * @name Plottable
 *
 * @class Represents a sample and the associated metadata in the ordination
 * space.
 *
 * @param {name} a string indicating the name of the sample.
 * @param {idx} the index where the object is located in a decomposition model.
 * @param {metadata} an Array of strings with the metadata values.
 * @param {coordinates} an Array of floats indicating the position in space
 *                      where this sample is located.
 * @param {idx} an *optional* integer representing the index where the object
 *              is located in a DecompositionModel.
 * @param {ci} an *optional* Array of floats indicating the confidence
 *             intervals in each dimension.
 *
 **/
function Plottable(name, metadata, coordinates, idx, ci) {
  this.name = name;
  this.metadata = metadata;
  this.coordinates = coordinates;

  this.idx = idx === undefined ? -1 : idx;
  this.ci = ci === undefined ? [] : ci;

  if (this.ci.length !== 0){
    if (this.ci.length !== this.coordinates.length){
      throw new Error("The number of confidence intervals doesn't match with"+
                      " the number of dimensions in the coordinates "+
                      "attribute. coords: " + this.coordinates.length +
                      " ci: " + this.ci.length);
    }
  }
};

/**
 *
 * Helper method to convert a Plottable into a string.
 *
 * @return a string describing the Plottable object.
 *
 */
Plottable.prototype.toString = function(){
  var ret = 'Sample: ' + this.name + ' located at: (' +
            this.coordinates.join(', ') + ') metadata: [' +
            this.metadata.join(', ')+']';

  if (this.idx === -1){
    ret = ret + ' without index';
  }
  else{
    ret = ret + ' at index: ' + this.idx;
  }

  if (this.ci.length === 0){
    ret = ret + ' and without confidence intervals.';
  }
  else{
    ret = ret + ' and with confidence intervals at (' + this.ci.join(', ') +
      ').';
  }

  return ret;
};

/**
 *
 * @name DecompositionModel
 *
 * @class Represents all the information that need to be plotted
 *
 */

/**
 * @name DecompositionModel
 *
 * @class Models all the ordination method data to be plotted
 *
 * @param {name} a string containing the abbreviated name of the ordination
 * method
 * @param {ids} an Array of strings where each string is a sample identifier
 * @param {coords} a 2D Array of floats where each row contains the coordinates
 * of a sample. The rows are in ids order.
 * @param {pct_var} an Array of floats where each position contains the
 * percentage explained by that axis
 * @param {md_headers} an Array of string where each string is a metadata
 * column header
 * @param {metadata} a 2D Array of strings where each row contains the metadata
 * values for a given sample. The rows are in ids order. The columns are in
 * md_headers order.
 *
**/
function DecompositionModel(name, ids, coords, pct_var, md_headers, metadata){
  this.abbreviatedName = name;
  this.ids = ids;
  this.percExpl = pct_var;
  this.md_headers = md_headers;

  if(this.ids.length !== coords.length){
    throw new Error("The number of coordinates differs from the number of " +
                    "smples. Coords: " + coords.length + " samples: " +
                    this.ids.length);
  }

  num_coords = coords[0].length

  this.plottable = new Array(ids.length)
  for (var i = 0; i < ids.length; i++){
    this.plottable[i] = new Plottable(ids[i], metadata[i], coords[i], i)
  }
  // this.edges = [];
  // this.plotEdge = false;
  // this.serialComparison = false;
};

/**
 * Retrieve the plottable object with the given id
 *
 * @param {id} a string with the plottable
 *
 * @return the plottable object for the given id
 *
**/
DecompositionModel.prototype.getPlottableByID = function(id) {
  idx = this.ids.indexOf(id);
  return this.plottable[idx];
};


/**
 *
 * Retrieve all the plottable object with the given ids
 *
 * @param {idArray} an Array of strings where each string is a plottable id
 *
 * @return an Array of plottable objects for the given ids
 *
**/
DecompositionModel.prototype.getPlottableByIDs = function(idArray){
  return _.map(idArray, this.getPlottableByID);
};

/**
 *
 * Retrieve all the plottable object under the metadata header value
 *
 * @param {category} a string with the metadata header
 * @param {value} a string with the value under the metadata category
 *
 * @return an Array of plottable object for the given category value pair
 *
*/
DecompositionModel.prototype.getPlottablesByMetadataCategoryValue = function(
    category, value){
  md_idx = this.md_headers.indexOf(category);
  return _.find(this.plottable, function(pl){
    return pl.metadata[md_idx] === value; });
};

/**
 * Get's a metadata category and returns the unique values on that category
 * @ param {category} a string with the metadata header
 *
 * @ return an Array of meta values under the metadata header
**/
DecompositionModel.prototype.getUniqueValuesByCategory = function(category){
  md_idx = this.md_headers.indexOf(category);
  return _.uniq(
    _.map(this.plottable, function(pl){return pl.metadata[md_idx];}));
};