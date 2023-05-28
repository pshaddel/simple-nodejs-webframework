const { FastFramework } = require("./lib");
const bodyParser = require('body-parser');

const app = FastFramework();

app.use('/user', 'POST', (req, res, next) => {
    console.log("body before:", req.body);
    next();
});

app.use(null, null, bodyParser.json());

app.use('/user', 'POST', (req, res) => {
    console.log("body after:", req.body);
    res.json({});
});

app.use('/users', 'GET', (req, res, next) => {
    console.log('authrized the user...');
    next();
})
app.use('/users', 'GET', (req, res, next) => {
    console.log('logged the user...');
    next();
})
app.use('/users', 'GET', (req, res, next) => {
    console.log('prepating the list of users...');
    res.json({ list: ['user1', 'user2'], count: 2 });
})

app.use('/otherRoute', 'GET', (req, res, next) => {
    console.log('other route');
    res.end('other info');
})


app.use(null, null, (req, res) => {
    console.log('not_found');
    res.end('NOT_FOUND')
})

app.listen(8000);




// function authorizationMiddleware(req, res) {
//     const isAuthorizedUser = authorizeRequest(req);
//     if (!isAuthorizedUser) {
//         // return some bad error
//         res.send(...);
//         // How to tell next functions that we already send the request to the user?
//     } else {
//         // What to do? should go to the next function
//     }
// }
// function bodyParserMiddleware(req, res) {
//     bodyParser(req);
// };
// function logger(req) {
//     console.log(req);
// };
// function updateUser(req, res) {
//     updateUser(req);
//     res.end();
// }
// authorizationMiddleware(req, res);
// bodyParserMiddleware(req, res);
// logger(req, res);
// updateUser(req, res);