const path = require('path') //This is a Node library being imported

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/scripts'), //this resolves the absolute path
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/',
        open: true
    },
    devtool: 'source-map'
}

// /home/tsaphkiel/Documents/Programming/Javascript Bootcamp/boilerplate