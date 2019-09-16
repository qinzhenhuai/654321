
// module.exports = {
// 	entry:'./src/page/index/index.js',
// 	output: {
// 		path:'/Users/lenovo i5/Desktop/H5/H5/dist',
// 		filename:'main.js'
// 	}
// }
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('Html-webpack-plugin');


var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name){
	return {
		//对那个文件进行打包
		template:'./src/view/'+name+'.html',
		//打包以后的路径和文件
		filename:'view/'+name+'.html',
		//自动注入
		inject:true,
		//哈希值
		hash:true,
		//有哪些打包后的js文件需要被注入到html文件
		chunks:['common',name]
	}
}

var config = {
	entry:{
		'common':['./src/page/common/index.js'],
		'index':'./src/page/index/index.js',
		'user-login':'./src/page/user-login/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/dist',
		filename:'js/[name].js'
	},
	externals:{
		'jquery':'window.jQuery'
	},
	// optimization:{
	// 	//抽取公共模块
	// 	splitChunks:{
	// 		//缓存组
	// 		cacheGroups:{
	// 			//commons
	// 			commons:{
	// 				name:'base',
	// 				chunks:'initial',
	// 				minChunks:2,
	// 				minSize:0
	// 			}
	// 		}
	// 	}
	// },
	module:{
		rules:[
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader"
				})
				
			},
			{
				test:/\.(gif|png|jpg|woff|svg|eotttf).??.*$/,
				loader:'url-loader?limit=100&name=resource/[name].[ext]'
			}
			
		]
	},
	plugins:[
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login'))
	]
}
//如果是开发环境，那么添加一个数组元素
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports = config;