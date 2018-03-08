var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		'polyfills': './polyfills.ts',
		'app': './main.ts'
	},
	output: {
		path: __dirname + '/public/build/',
		publicPath: '/build/',
		filename: "[name].js"
	},
	devServer: {
		hot: true,
		inline: true,
		historyApiFallback: true
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module:{
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
					} ,
					'angular2-template-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/,
			path.resolve(__dirname, './app'))
	]
};