'use strict'
var _mm = {
	
	request : function(param){
		//保存this,防止this指针指向不明
		var _this = this;
		$.ajax({
			type	    : param.method      ||  'get',
			url		    : param.url	        ||  '',
			dataType    : param.type        ||  'json',
			data        :		param.data	||  '',
			success : function(res){
				if(0 === res.status){
					//请求成功
					typeof param.success === 'function' && param.success(res.data,res.msg);

				}else if(10 === res.status){
					//没有登录状态，统一去登录
					_this.doLogin();
				}else if(1 === res.status){
					//出现报错
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error : function(err){
				typeof param.error === 'function' && param.error(res.statusText);
			}
		});
	},
	//统一跳转到登录页面
	doLogin: function(){
		window.location.href = './user-login.html?redirect' +
		encodeURIComponent(window.location.href);
	}
};
//导出
module.exports = _mm;