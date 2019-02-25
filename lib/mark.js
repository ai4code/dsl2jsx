
var $ = require('./constant'); 


/**
 * 标签转换jsx
 * @param {*} type 
 */
function mark2jsx(type) {   
    return   type ?  {
      tagName: 
        type.substring(0,1).toUpperCase() + type.substring(1),
      nodeName: 
        type.substring(0,1).toUpperCase() + type.substring(1)
    } : {
      tagName: $.defaultMark,
      nodeName: $.defaultMark
    }
  }

module.exports = function mark2ReactJsx(type) {
    return mark2jsx(type);
}