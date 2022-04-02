const { defineConfig } = require("@vue/cli-service");
const Configs = require(`./configs/${process.env.BUILD_ENV || "lib"}.config.js`);

module.exports = defineConfig({
  transpileDependencies: true,
  ...Configs,
});
