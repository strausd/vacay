const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common(), {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true,
		port: 8000,
		host: '0.0.0.0',
		publicPath: '/dist/',
		lazy: false
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'process.env.URL': JSON.stringify('http://localhost:3000/')
		})
	]
});