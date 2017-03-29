const Discord = require("discord.js");
var express = require('express');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
	if(msg.channel.DMChannel.type === 'dm'){
		//this is a direct message, response
		msg.reply('El pueblo unido jamas sera vencido');
	}
	else if(msg.channel.TextChannel.type === 'text'){
		console.log("=================================== " + client.user.id);
		if(msg.mentions.users.get(client.user.id) != undefined){
			//on a été tagué
			msg.reply('D\'ou tu me tagues ???');
		}
	}
});

client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
});

client.login(process.env.DISCORD_TOKEN);

var app = express();
app.listen(process.env.PORT || 5000);