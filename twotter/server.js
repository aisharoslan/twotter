// runs an express server - for running web servers
// runs the server that looks at production files

const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
// force to use secure version of website

app.use(serveStatic(__dirname + '/dist'));
// looks at build command in package.json - put it in a /dist folder
// serving our production compiled files

app.use(history());
// avoid router history issues

app.listen(process.env.PORT || 5000); // tell app to listen to a port, but heroku tells us, enviornment variable, just use process.env.PORT || 5000 (local)