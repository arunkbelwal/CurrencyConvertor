var config = {
   entry: './main.js',
	
   output: {
      path:'/',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8084
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
		 {
		  test: /\.scss$/,
		  loader: 'style-loader'
		}, {
		  test: /\.scss$/,
		  loader: 'css-loader',
		  query: {
			modules: true,
			localIdentName: '[name]__[local]___[hash:base64:5]'
		  }
		},{ test: /\.scss$/,
            loader: "sass-loader"
          }
      ]
   }
}

module.exports = config;