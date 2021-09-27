const path = require('path');

module.exports = {
	mode: 'development',
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
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
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass')
							}
						}
					]
				}
			]
		}
};
