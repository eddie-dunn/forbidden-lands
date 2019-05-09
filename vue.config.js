const path = require("path")

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: "less-loader",
        },
      ],
    },
    resolve: {
      alias: {
        Style: path.resolve(__dirname, "src/assets/style/"),
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
  devServer: {
    // open: process.platform === 'darwin',
    host: "0.0.0.0",
    port: 3000, // CHANGE YOUR PORT HERE!
    // https: false,
    // hotOnly: false,
  },
}
