const http = require('http');
const server = http.createServer(function (req, res) {
    if (req.url === '/api/login') {
        res.end('{ll: 22}');
    }
});
server.listen(8080, function () {
    console.log('listen to 8080');
});