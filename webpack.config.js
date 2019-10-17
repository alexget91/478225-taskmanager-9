const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      }
    ]
  },
  plugins: [
    // Оставляем только одну локаль
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
};
