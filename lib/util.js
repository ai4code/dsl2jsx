var DOMParser = require('xmldom').DOMParser;

module.exports = {
    /**
     * 获取body内容体
     * @param {*} html 
     */
    getBody: function(html) {
        return html ? /<body[^>]*>([\s\S]*)<\/body>/.
        exec(html)[1] : ''
    },

    /**
     * 获取tempplate body
     * @param {*} mark 
     */
    getTemplateBody: function(html) {
        var parse  = new DOMParser();

        var dom = parse.parseFromString('<div>'+html+'</div>', 'text/xml');

        var keywordList = dom.getElementsByTagName('Template');
      
        // return (keywordList && keywordList.length) ? Array.from(keywordList).map(dom => dom.innerHTML) : null
    }, 

    /**
     * 获取ListViewBody体
     * @param {*} mark 
     */
    getListViewBody: function(html) {
        return html ? /<ListView[^>]*>([\s\S]*)<\/ListView>/.
        exec(html)[1] : ''
    },

    /**
     * 遍历对象key value
     * @param {*} object 
     */
    objectKeys: function (object) {
        var newMap = {};
        for (var pop in object) {
            newMap['key'] = pop;
            newMap['value'] = object[pop];
            break;
        }
        return newMap;
    }
}