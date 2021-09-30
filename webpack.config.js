const path = require('path')

module.exports = {
	entry: './lib/slider/slider-open-builder.js',
	optimization: {
		minimize: false
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
						loader: 'babel-loader'
				}
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'runtime'),
		filename: 'slider-open_bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 1234,
		https: true,
	},
}