var $ = require('./constant');
var Util = require('./util');
/**
 * format jsx
 */
module.exports = function formatJsx(html) {

    html = html.replace(/\sstyle="(.+?)"/g, function(attr, styles){ 
        return  " style=" + styles + "";
    }); 

    $.specialAttributes.forEach(function (item, value) {
        var reg = new RegExp("\\s"+ item.toLocaleLowerCase() +'="(.+?)"',"g"); 
        html = html.replace(reg, function(attr, value){ 
            return (' ').concat(item)
                 .concat('=')
                 .concat(value);
         });
    })   

    //style 驼峰处理
    $.prefixStyles.forEach(function(item, index){
        var reg = new RegExp("\\s"+ item.toLocaleLowerCase() +'="(.+?)"',"g"); 
        html = html.replace(reg, function(attr, styles){ 
           return (' ').concat(item)
                .concat('=')
                .concat(styles);
        }); 
    })
    
    //属性驼峰处理
    $.componentCameProperty.forEach(function(item, index){
        var reg = new RegExp("\\s"+ item.toLocaleLowerCase() +'="(.+?)"',"g"); 
        html = html.replace(reg, function(attr, value){ 
           return (' ').concat(item)
                .concat('=')
                .concat("'")
                .concat(value)
                .concat("'");
        }); 
    })

    //事件统一处理转换引号问题
    $.componentMethods.forEach(function(item, index) {
        var reg = new RegExp("\\s"+ item.toLocaleLowerCase() +'="(.+?)"',"g"); 
        html = html.replace(reg, function(attr, value){ 
           return (' ').
                  concat(item).
                  concat('=').
                  concat(value) 
        }); 
    })

    console.log(Util.getTemplateBody(html))

    return Util.getBody(html);
}