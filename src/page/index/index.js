'use strict'
 require('./index.css');
 
 
 var _mm = require('util/mm.js');
 _mm.request({
	url:'/product/list.do?keyword=1',
	 success: function(res){
		 console.log("这是我们从网络接口中获取的数据：",res);
	 },
	 error:function(errMsg){
		 console.log(errMsg);
	 }
 });