const Discord = require("discord.js");
var express = require('express');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
	if(msg.channel.type === 'dm' && !msg.author.bot){
		//this is a direct message, response
		msg.reply('El pueblo unido jamas sera vencido');
	}
	else if(msg.channel.type === 'text'){
		if(msg.mentions.users.get(client.user.id) != undefined){
			//on a été tagué
			msg.reply('D\'ou tu me tagues ???');
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