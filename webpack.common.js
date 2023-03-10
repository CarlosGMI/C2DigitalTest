const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	stats: 'minimal',
	entry: {
		main: path.resolve(__dirname, './src/main.js'),
	},
	output: {
		path: path.resolve(__dirname, './shopify/assets/'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['*', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src/'),
			'@shopify-directory': path.resolve(__dirname, './shopify/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
			...(() => {
				const rules = [];

				const loaders = [{ test: /\.(css|postcss)$/i }, { test: /\.s[ac]ss$/i, loader: 'sass-loader' }];

				loaders.forEach((element, index) => {
					rules.push({
						test: element.test,
						use: [MiniCssExtractPlugin.loader, 'css-loader'],
					});

					if (element.loader) rules[index].use.push(element.loader);
				});

				return rules;
			})(),
		],
	},
	plugins: [
		/**
		 * see: https://github.com/johnagan/clean-webpack-plugin
		 */
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				// NOTE: Paths here are relative to `output: {path: PATH_NAME}` above.
				// Use ! to ignore.

				// Clean out all compiled assets from /src (see entry config above)
				'main.js',
				'main.css',

				// Ignore user-defined assets
				// NOTE: Adding or removing a file here? Make sure to also update .gitignore asset unignore.
				// Example "!ico-select-menu.svg.liquid",
				'!.gitkeep',
			],
		}),
		/**
		 * docs: https://webpack.js.org/plugins/mini-css-extract-plugin
		 */
		new MiniCssExtractPlugin({
			filename: './[name].css',
			chunkFilename: '[id].css',
		}),
	],
};
