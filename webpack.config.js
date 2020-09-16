const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = (env, argv) => {
    const params = dotenv.config({ path: path.resolve(__dirname, `./src/environments/${argv.mode}.env`) }).parsed;
    const processEnv = {};
    Object.keys(params).forEach(key => processEnv[`process.env.${key}`] = JSON.stringify(params[key]));

    return {
        entry: './src/index.ts',
        target: 'node',
        externals: [
            nodeExternals()
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.DefinePlugin(processEnv),
            new NodemonPlugin()
        ]
    }
};