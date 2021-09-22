const path = require('path');

module.exports = {
	mode: 'development',
		devtool: 'eval',
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx']
		},
		entry: {
			bundle: ['./src/index.tsx']
		},
		output: {
			filename: 'bundle.js',
				path: path.join(__dirname, 'dist')
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				}
			]
		}
};
