//path provee utilidades para trabajar con archivos y directorios
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.js", //cual es el punto de entrada de la aplicación
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: [".js"],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/ /*Busque los archivos con extensión .mjs y .js*/,
                exclude: /node_modules/ /*Excuir node_modules*/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader',
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/i,  // Tipos de fuentes a incluir
                type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
                generator: {
                  filename: 'assets/fonts/[name].[contenthash][ext][query]',  // Directorio de salida
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html', //toma el template y lo transforma en dist en el archivo ./index.html 
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { //mover toda la carpeta images, también se pueden mover solo un archivo
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: "assets/images" //ruta dentro de dist
                }
            ]
        }),
        new Dotenv(),
    ],
};
