'use strict'

var parse5 = require('parse5'); 
var dslAttr2ReactJsx  = require('./attr');
var formatJsx = require('./jsx');
var Util = require('./util');

var api = { 
    walk: function (html) {
        return traverse(html)
    } 
}
var componentTypes = {};

/** @private */
function traverse (html) {
    var document = parse5.parse(html);  
    childrenMap.bind(document)(); 
    return {
      htmlJsx: formatJsx(parse5.serialize(document)),
      components:  componentTypes
    };
 } 


 
/**遍历节点*/
function childrenMap() {  
    this.childNodes && 
    this.childNodes.length &&
    this.childNodes.forEach(function(item) {   
     item = dslAttr2ReactJsx(item);
     var object = Util.objectKeys(item.types);
     if ( object.key && object.value ) {
        componentTypes[object.key] = object.value
     }
     if (item.item && item.item.childNodes && item.item.childNodes.length) {
       childrenMap.bind(item.item)();
     } 
   });
 }
 
  
  
module.exports = function (tree) {
    tree.walk = api.walk
}
module.exports.walk = api.walk