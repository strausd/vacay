const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
    return {
        entry: './src/app.jsx',
        output: {
            chunkFilename: 'bundle.[name].js',
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public', 'dist'),
            publicPath: 'dist/',
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx'
            ]
        },
        plugins: [
            new ExtractTextPlugin('style.css')
        ]
    };
}