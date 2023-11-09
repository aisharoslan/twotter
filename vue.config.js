// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/base.scss";'
        // it isn't hot loaded in vuejs, it's only loaded once, so need to stop the task and start again
      }
    }
  }
}