// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const resolveTsconfigPathsToAlias = require("./webpack/resolve-tsconfig-path-to-webpack-alias")
const isProduction = process.env.NODE_ENV == 'production';


const config = {
    target: 'node',
    entry: './src/server.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, isProduction ? 'dist' : 'dev'),
    },

    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],

    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: resolveTsconfigPathsToAlias(),
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
