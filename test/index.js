var dsl2react = require('../index.js');

var dsl = "<div data-type='NavBar' title='NavBar' mode='dark' rightIcon='ellipsis'><div data-type='Popover' id='popover2' data='popData'><div>popover</div></div></div>";

var react = dsl2react(dsl, {});

console.log('运行结果', react.htmlJsx)
