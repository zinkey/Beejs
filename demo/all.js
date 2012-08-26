/*beejs auto creator*/
(function(){var map={};var def=function(name,fn){map[name]=fn;};var require=function(name){var exports={};map[name](exports);return exports;};
def("increment",function(exports){var add = require('math').add; exports.increment = function(val){ return add(val, 1); };});
def("math",function(exports){exports.add = function() { var sum = 0, i = 0, args = arguments, l = args.length; while (i < l) { sum += args[i++]; } return sum; };});
var inc = require('increment').increment; var a = 1; alert(inc(a));
})();
