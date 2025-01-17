import  path from 'path';
import  webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from 'dotenv-webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

type Mode = "development" | "production";

interface EnvVariables {
    NODE_ENV: Mode;
    port: number;
}

export default (env: EnvVariables) => {
    const isDev = env.NODE_ENV === "development";

    const config: webpack.Configuration = {
        mode: env.NODE_ENV ?? 'development',
        entry: path.resolve(__dirname, './src/index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, './public/index.html')}),
            new Dotenv({
                path: `.env.${env.NODE_ENV}`, // Загружаем соответствующий .env файл
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'tonconnect-manifest.json'), to: path.resolve(__dirname, 'build/tonconnect-manifest.json') }
                ]
            }),
            new webpack.ProvidePlugin({ // !!!
                Buffer: ['buffer', 'Buffer'],
            }),
            isDev && new webpack.ProgressPlugin(),
            !isDev && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext][query]', // Кастомизация структуры файлов
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader"
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name][ext]'
                    }
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: { // !!!!
                buffer: require.resolve("buffer"),
                // stream: require.resolve("stream-browserify"),
            },
        },
        devtool: isDev && "inline-source-map",
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true,
            allowedHosts: 'all',
        } : undefined,

    }
    return config;
}