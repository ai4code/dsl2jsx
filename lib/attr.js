var $ = require('./constant');
var mark2ReactJsx = require('./mark');
var StyleParser = require('./style');

/**
 * 判断是否存在组件类型属性
 * @param {*} type 
 */
function hasComponentType (attrs) {
    
    var componentType, types = {};
    try{
      attrs 
        && attrs.length
          && attrs.forEach(function(item, index) {
            if (item.name === $.componentType) {
              componentType = item.value;
              types[item.value] = item.value;
              throw new Error('breakForEach');
            }
        })
      }catch(e) { if (e.message !== 'breakForEach') throw e;}

    return {
        has: componentType, 
        types: types
    };
}


/**
 * rest params
 * @param {*} object 
 */
function runFunc(object) { 
  var start;
  var fnName = object.split('(')[0];
  var fns = object.split('(')[1].split(')')[0]; 
  if (fns && fns.indexOf($.method.param) !== -1)  
      start = !start; 

  return (start ? $.method.outerParam : $.method.start).
        concat(fnName).
        concat('(').
        concat(fns).
        concat(')').
        concat($.method.end);
}


/**
* 属性转换
* @param {*} attrs 
*/
function fixAttrs(node) {
  var array = [], attrs = node.attrs;
  attrs && attrs.length && attrs.forEach(function(item, index){
    switch(ifAttrType(item.value)) {  
      case $.event:
          array.push( {
            name: item.name,
            value: runFunc(item.value)
          }) 
      ; break; 
      case $.style: 
          array.push( {
            name: item.name,
            value: $.styleJsx.start.
                concat(new StyleParser(item.value).toJSXString()).
                concat($.styleJsx.end)
          }) 
      ; break; 
      case $.defaultProperty: 
          if(isSpecialAttribute(item.name) && isSpecialComponent(node.nodeName)) {
              item = {
                name: item.name,
                value: $.var.start.concat(item.value).concat($.var.end)
              };
          }else if (isSpecialAttribute(item.name)) {
            item = {
              name: item.name,
              value: $.var.start.concat($.var.outer).concat(item.value).concat($.var.end)
            };
          }
          array.push(item);
      ; break;
    }
  })
  return array;
} 

/**
 * 判断是否特殊组件
 * @param {*} component 
 */
function isSpecialComponent(component) {
  return $.specialComponents.indexOf(component) !== -1 ? true : false;
}


/**
 * 判断是否特殊属性
 * @param {*} attribute 
 */
function isSpecialAttribute(attribute) {
  return $.specialAttributes.indexOf(attribute) !== -1 ? true : false;
}



/**
* 属性类型
* @param {*} attr 
*/
function ifAttrType(attr) {
  return attr.indexOf(':') !== -1 
  ?  $.style 
  : attr.indexOf('(') !== -1 && attr.indexOf(')') !== -1 
  ? $.event : $.defaultProperty;
} 

module.exports = function dslAttr2ReactJsx(item) {
  var attrs =  hasComponentType(item.attrs),
      object = mark2ReactJsx(attrs.has);
   
  if (attrs.has) {
    item.tagName = object.tagName;
    item.nodeName = object.nodeName;
  }    
  item.attrs = fixAttrs(item) || []; 
  return {
    types: attrs.types,
    item: item
  };
}