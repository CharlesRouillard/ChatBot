var express = require('express');
var Bot = require('./bot.js');



var bot = new Bot({
	token: process.env.DISCORD_TOKEN
})

bot.connect();

var app = express();
app.listen(process.env.PORT || 5000);
console.log("server launch on port " + process.env.PORT);