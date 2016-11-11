const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, "./build/web/index.js"),
    ],
  },
  output: {
    path: path.resolve(__dirname, "./build/public/assets/"),
    publicPath: "/assets/",
    filename: "bundle.js",
  },
  plugins: [new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("development"),
    },
  })],
};
