const Discord = require("discord.js");
var express = require('express');
var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;
const client = new Discord.Client();

function SayJoke(){
	
}

function response(msg){
	cont = msg.content.toLowerCase();
	if(cont.includes("bonjour") || cont.includes('salut') || cont.includes('hello') || cont.includes('hi')){
		msg.reply('Hey ! Que puis-je faire pour vous ?');
	}
	else if(cont == '!blague'){
		axios.request({
	        url: 'http://www.chucknorrisfacts.fr//api/get?data=tri:alea;nb:1;type:txt',
	        method: 'GET'
    	}).then(function(response){
        	msg.reply(et.decode(response.data[0].fact));
    	}).catch(console.log);
	}
	else if(cont.includes('!meteo')){
		city = cont.split(" ")[1];
		axios.request({
	        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + process.env.WEATHER_TOKEN,
	        method: 'GET'
    	}).then(function(response){
    		//console.log(response)
    		var temp = (response.data.main.temp-273.15);
    		temp = Math.round(temp *10)/10;
    		var tempMin = (response.data.main.temp_min-273.15);
    		tempMin = Math.round(tempMin *10)/10;
    		var tempMax = (response.data.main.temp_max-273.15);
    		tempMax = Math.round(tempMax *10)/10;
        	msg.reply("In " + response.data.name + " the current temperature is " + temp + "°C\nThe minimal temperature is " + tempMin + "°C and the maximal is " + tempMax + "°C\n");
    	}).catch(console.log);
	}
	else{
		msg.reply('Je n\'ai pas compris votre demande');
	}
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
	if(msg.channel.type === 'dm' && !msg.author.bot){
		//this is a direct message, response
		response(msg);
	}
	else if(msg.channel.type === 'text'){
		if(msg.mentions.users.get(client.user.id) != undefined){
			//on a été tagué
			response(msg);
		}
	}
});

client.on('presenceUpdate', function(oldMember, newMember) {
	if(newMember.user.username == 'bramas' && newMember.presence.status == 'online'){
		newMember.sendMessage("Bonjour maitre, je suis le bot de Charles et David, que puis-je faire pour vous aujourd'hui ?");
	}
});

client.login(process.env.DISCORD_TOKEN);

var app = express();
app.listen(process.env.PORT || 5000);