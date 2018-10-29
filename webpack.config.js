const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/static',
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        port: 9000,
        after:
            function(app,server) {
                console.log("%c The server is live on port 9000 \n\n", "color: red");
            }
    }
}