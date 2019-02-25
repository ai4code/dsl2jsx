var api = require('./api');

function dsl2ReactComponent(tree) {  
    return api.walk(tree)    
}
  
module.exports = dsl2ReactComponent;