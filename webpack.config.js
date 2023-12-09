const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.ts', // Your entry point, adjust as necessary
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js', // Output file
    path: path.resolve(__dirname, 'dist'), // Adjust the output directory as necessary
    clean: true,
  },
  target: 'node', // Important for bundling Node.js apps
};
