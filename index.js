var dsl2ReactComponent = require('./lib/processor');
var Util = require('./lib/util');
 
module.exports = function extractReactComponent(html, options) {
    
    options = options || {};

    return dsl2ReactComponent(html, options);
}