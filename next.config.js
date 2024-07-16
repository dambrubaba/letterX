const fs = require("fs");
const path = require("path");

module.exports = {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "myapp.local-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "myapp.local.pem")),
    },
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
};
