
 /*样式处理 */ 
 var StyleParser = function(rawStyle) {
    this.parse(rawStyle);
  };
  
  StyleParser.prototype = {
    /**
     * Parse the specified inline style attribute value
     * @param {string} rawStyle Raw style attribute
     */
    parse: function(rawStyle) {
      this.styles = {};
      rawStyle.split(';').forEach(function(style) {
        style = style.trim();
        var firstColon = style.indexOf(':');
        var key = style.substr(0, firstColon);
        var value = style.substr(firstColon + 1).trim();
        if (key !== '') {
          this.styles[key] = value;
        }
      }, this);
    },
    /**
    * Convert the style information represented by this parser into a JSX
    * string
    *
    * @return {string}
    */
   toJSXString: function() {
     var output = [];
     for (var key in this.styles) {
       if (!this.styles.hasOwnProperty(key)) {
         continue;
       }
       output.push(this.toJSXKey(key) + ': ' + this.toJSXValue(this.styles[key]));
     }
     return output.join(', ');
   },
   /**
    * Convert the CSS style key to a JSX style key
    *
    * @param {string} key CSS style key
    * @return {string} JSX style key
    */
   toJSXKey: function(key) {
     return hyphenToCamelCase(key);
   },
  
   /**
    * Convert the CSS style value to a JSX style value
    *
    * @param {string} value CSS style value
    * @return {string} JSX style value
    */
   toJSXValue: function(value) {
     if (isNumeric(value)) {
       // If numeric, no quotes
       return value;
     } else {
       // Proably a string, wrap it in quotes
       return '\'' + value.replace(/'/g, '"') + '\'';
     }
   }
  }
   
   /**
   * Convert a hyphenated string to camelCase.
   */
  function hyphenToCamelCase(string) {
    return string.replace(/-(.)/g, function(match, chr) {
      return chr.toUpperCase();
    });
  }
  
  /**
   * Determines if the specified string consists entirely of numeric characters.
   */
  function isNumeric(input) {
    return input !== undefined
      && input !== null
      && (typeof input === 'number' || parseInt(input, 10) == input);
  }


  module.exports = StyleParser;