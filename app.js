/*eslint-env node*/

//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').__express); //两个下划线
app.get("/lftest",function(req,res){

console.log("I add a router");

res.send("this is my test")


})

app.get('/lftestPG', function(req, res) {
        console.log('enter a ejs page');
    res.render('test', {
        mytitle : "lvfei_bluemixProject"
    });
    })


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
