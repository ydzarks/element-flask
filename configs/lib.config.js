const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  productionSourceMap: false,
  css: { extract: true },
  configureWebpack: {
    output: {
      library: "ElementFlask",
      libraryExport: "default",
    },
    externals: [
      {
        vue: {
          commonjs: "vue",
          commonjs2: "vue",
          root: "Vue",
        },
      },
      /^element-ui(\/|$)/,
    ],
  },
});
