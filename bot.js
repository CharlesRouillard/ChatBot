const Discord = require("discord.js");
var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;
var blague = require('./blague.js');
var meteo = require('./meteo.js');
var image = require('./image.js');
var iss = require('./iss.js');
var yoda = require('./yoda.js');

module.exports = function(params){
    var self = this;
	self.bot = null;

	self.connect = function(){
        self.bot = new Discord.Client();
        self.bot.login(params.token);
        self.bot.on('ready', self.onReady);
        self.bot.on('message', self.onMessage);
        self.bot.on('presenceUpdate',self.onPresenceUpdate);
    }

    self.onReady = function(){
        console.log(`Logged in as ${self.bot.user.username}!`);
    }

    self.onMessage = function(msg){
        if(msg.channel.type === 'dm' && !msg.author.bot){
			//this is a direct message, response
			self.response(msg,false);
		}
		else if(msg.channel.type === 'text'){
			if(msg.mentions.users.get(self.bot.user.id) != undefined){
				//on a été tagué
				self.response(msg,true);
			}
		}
    }

    self.onPresenceUpdate = function(oldMember, newMember){
    	if(newMember.user.username == 'bramas' && newMember.presence.status == 'online'){
			newMember.sendMessage("Bonjour maitre, je suis le bot de Charles et David, que puis-je faire pour vous aujourd'hui ?");
		}
    }

    self.response = function(msg,isTag){
		cont = msg.content.toLowerCase();
		if(cont.includes('!blague')){
			blague(msg);
		}
		else if(cont.includes('!meteo')){
			meteo(msg,isTag)
		}
		else if(cont.includes('!image')){
			image(msg,isTag);
		}
		else if(cont.includes('!iss')){
			iss(msg,isTag);
		}
		else if(cont.includes('!yoda')){
			yoda(msg,isTag);
		}
		else{
			/*if(cont.includes("bonjour") || cont.includes('salut') || cont.includes('hello') || cont.includes('hi')){
				msg.reply('Hey ! Que puis-je faire pour vous ?');
			}
			msg.reply('Je n\'ai pas compris votre demande ! Je comprend !blague, !meteo <city>, !image <query>');*/
		}
	}
}
