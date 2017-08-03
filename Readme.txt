Author: Arun Belwal
Email id : arun.belwal@tcs.com

1) You will need to install several packages for this setup. We will need some of the babel plugins so let's first install babel by running the following code in command prompt window.

C:\Users\username>npm install -g babel
C:\Users\username>npm install -g babel-cli

2)Create Root Folder
The root folder will be named CurrencyConvertor and we will place it on Desktop. After the folder is created we need to open it and create empty package.json file inside by running npm init from the command prompt and follow the instructions.

C:\Users\username\Desktop>mkdir reactApp
C:\Users\username\Desktop\CurrencyConvertor>npm init

3)Add Dependencies and plugins
We will use webpack bundler in these tutorials so let's install webpack and webpack-dev-server.

C:\Users\username>npm install webpack --save
C:\Users\username>npm install webpack-dev-server --save
C:\Users\username\Desktop\CurrencyConvertor>npm install react --save
C:\Users\username\Desktop\CurrencyConvertor>npm install react-dom --save

we will need some babel plugins so let's install it too.

C:\Users\username\Desktop\CurrencyConvertor>npm install babel-core
C:\Users\username\Desktop\CurrencyConvertor>npm install babel-loader
C:\Users\username\Desktop\CurrencyConvertor>npm install babel-preset-react
C:\Users\username\Desktop\CurrencyConvertor>npm install babel-preset-es2015

4) Let's create several files that we need. You can add it manually or you can use command prompt inside CurrencyConvertor folder.

index.html
touch App.jsx
touch main.js
touch webpack.config.js

5)Set Compiler, Server and Loaders
Open webpack-config.js file and add the code below. We are setting webpack entry point to be main.js. Output path is the place where bundled app will be served. We are also setting development server to 8084 port. You can choose any port you want. And lastly, we are setting babel loaders to search for js files and use es2015 and react presets that we installed before.

webpack.config.js
var config = {
   entry: './main.js',
	
   output: {
      path:'./',
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
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;

Open the package.json and delete "test" "echo \"Error: no test specified\" && exit 1" inside "scripts" object.we will add the start command instead.

"start": "webpack-dev-server --hot"
Now we can use npm start command to start the server. --hot command will add live reload after something is changed inside our files so we don't need to refresh the browser every time we change our code.

6) The setup is finished and we can start the server by running:

C:\Users\username\Desktop\CurrencyConvertor>npm start