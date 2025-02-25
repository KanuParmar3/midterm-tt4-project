const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	entry: {
		global: path.resolve(__dirname, "global.js"),
		index: path.resolve(__dirname, "index.js"),
		listProduct: "./list-product.js",
		addProducts: "./add-products.js",
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		assetModuleFilename: "assets/[hash][ext][query]", // Ensure images are hashed and put in assets folder
		clean: true, // Clean the dist folder before every build
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								quietDeps: true,
								includePaths: [path.resolve(__dirname, "node_modules")],
							},
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.(png|jpg|gif)$/,
				type: "asset/resource", // Use the new asset module to handle images
				generator: {
					filename: "assets/images/[name][hash][ext][query]", // Place images in assets/images/
				},
			},
			{
				test: /\.(woff(2)?|eot|ttf)$/,
				type: "asset/resource", // Handle fonts
				generator: {
					filename: "assets/fonts/[name][hash][ext][query]", // Place fonts in assets/fonts/
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css", // Extract CSS to a separate file
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
			chunks: ["global", "index"],
			filename: "index.html", // Generate the index.html file
		}),
		new HtmlWebpackPlugin({
			template: "./list-product.html",
			chunks: ["listProduct", "global"],
			filename: "list-product.html", // Generate the list-product.html file
		}),
		new HtmlWebpackPlugin({
			template: "./add-products.html",
			chunks: ["addProducts", "global"],
			filename: "add-products.html", // Add products page (optional)
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [`...`, new CssMinimizerPlugin()],
	},
	devServer: {
		static: path.resolve(__dirname, "dist"), // Ensure the dist folder is being served
		port: 9000,
		open: true,
		hot: true,
	},
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "assets"),
		},
		extensions: [".js", ".scss"],
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development", // Toggle mode based on environment
};
