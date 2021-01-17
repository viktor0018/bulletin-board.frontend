const { API_URL: api } = process.env;

console.log("api", api);

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        //target: "https://api",
        target: api,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
