const webpack = require("webpack")
const path = require("path")

module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/fl/cc" : "/",
  publicPath: process.env.NODE_ENV === "production" ? "/forbidden-lands/" : "/",
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: "less-loader",
        },
        {
          test: /player_handbook_png-\d*\.png/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                fallback: {
                  loader: "file-loader",
                  options: {
                    name: "img/[name].[ext]",
                  },
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        Style: path.resolve(__dirname, "src/assets/style/"),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __APP_VERSION__: JSON.stringify(
          "v" +
            require("./package.json").version +
            "_b" +
            new Date().toISOString()
        ),
      }),
    ],
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
    svgSprite: {
      // from https://github.com/swisnl/vue-cli-plugin-svg-sprite#options
      /*
       * The directory containing your SVG files.
       */
      dir: "src/assets/icons",
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: "img/icons.[hash:8].svg", // or 'img/icons.svg' if filenameHashing == false
        // spriteFilename: "img/icons.svg", // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true,
      },
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000, // CHANGE YOUR PORT HERE!
    // https: false,
    // hotOnly: false,
  },

  chainWebpack: (config) => {
    config.module
      .rule("svg-sprite")
      .use("svgo-loader")
      .loader("svgo-loader")
  },
}
