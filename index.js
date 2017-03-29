const Discord = require("discord.js");
var express = require('express');
const client = new Discord.Client();

function responseToDM(msg){
	cont = msg.content.toLowerCase();
	if(cont.includes("bonjour") || cont.includes('salut') || cont.includes('hello') || cont.includes('hi')){
		msg.reply('Hey ! Que puis-je faire pour vous ?');
	}
	else{
		msg.reply('Je n\'ai pas compris votre demande');
	}
}

function responseToTag(msg){
	cont = msg.content.toLowerCase();
	msg.reply('Cool ton tag !');
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
	if(msg.channel.type === 'dm' && !msg.author.bot){
		//this is a direct message, response
		responseToDM(msg);
	}
	else if(msg.channel.type === 'text'){
		if(msg.mentions.users.get(client.user.id) != undefined){
			//on a été tagué
			responseToTag(msg);
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