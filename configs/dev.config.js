const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  productionSourceMap: true,
  configureWebpack: {
    devtool: "source-map",
  },
  chainWebpack: (config) => {
    config.entryPoints.clear();
    config.entry("dev").add("./tests/main.js");
  },
});
