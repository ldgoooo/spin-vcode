const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    framework: ['react','react-dom'],
  },
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 
          'style-loader', 
          'css-loader' 
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
	      use: {
	        loader: 'url-loader',
	        options: {
	          name: '[name].[ext]',
	          outputPath: 'images/',
	          limit: 8192,
	        },
	      }
	    },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/'
          }
        }
      }
    ]
  },
  plugins: [
    //...
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
   ],
  
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  }
}