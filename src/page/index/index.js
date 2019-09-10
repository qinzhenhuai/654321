//通过require请求加载cats.js模块
var cats = require('./cats.js');
// var $ = require('jquery');
var common = require('../login/common.js');
require('./index.css')
common();
//打印请求回来的cats
console.log(cats);
$('body').html('羊驼不是草泥马');