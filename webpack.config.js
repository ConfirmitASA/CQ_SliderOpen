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
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'runtime'),
		filename: 'slider-open_bundle.js'
	},
	target: ['web', 'es5'],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 1234,
		https: true,
	},
}