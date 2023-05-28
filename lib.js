const http = require('node:http');

function FastFramework() {
    // An array for keeping the middlewares
    const middlewares = [];
    const server = http.createServer((req, res) => {
        res.json = function(data) {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(data));
        }
        let middlewareCounter = 0;
        function nextFunction() {
            while(middlewareCounter < middlewares.length) {
                console.log("Next Function While Loop- Current Counter:", middlewareCounter);
                if (match(req, middlewares[middlewareCounter])) {
                    return middlewares[middlewareCounter++].handler(req, res, nextFunction);
                } else {
                    middlewareCounter++
                }
            }
            // If we are here then no middleware matched!!!!
        }
        nextFunction();
    });
    // A method that we can add middelwares
    server.use = function use(url, method, handler) {
        middlewares.push({
          url,
          method,
          handler
        })
    }
    return server;
}

// if the request is a match for the middleware or not
function match(req, { url, method }) {
    if(!url && !method) return true;
    if (req.method !== method) return false;
    if (req.url !== url) return false;
    return true;
}

module.exports = { FastFramework }