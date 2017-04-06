var axios = require('axios');
var meteo = require("./meteo.js");
const {Wit, log} = require("node-wit");

const client = new Wit({accessToken: process.env.WIT_TOKEN});

function getQuery(spl,isTag){
	var query = "";
	for(var i = 2;i<spl.length;i++){
		query += spl[i] + " ";
	}
	return query;
}

function exec(data,isTag,msg){
	var resp = "";
	var intent = data.entities.intent[0].value;
	if(intent){
		if(intent == "hello"){
			resp = "Bien le bonjour, humain ! Je suis BuckowskyBot ! Un bot discord qui comprend plusieurs commandes : \n- !blague - Permet d'afficher une Chuck Norris fact !\n- !image <string> - Qui permet d'afficher une image en relation avec <string>\n- !meteo <city> - Permet d'afficher la température actuelle de <city>\n- !iss - Affiche une carte du monde avec la position actuelle de l'ISS\n- !yoda <quote> - Petit délire... Transforme n'importe quelle phrase en une phrase façon Maitre Yoda !"
		}
		else if(intent == "temps" && data.entities.location[0].value){
			if(data.entities.location[0].value){
				if(isTag)
					meteo(msg,"@BuckowskyBot#7984 !meteo " + data.entities.location[0].value);
				else
					meteo(msg,"!meteo " + data.entities.location[0].value)	
			}
			else{
				msg.reply("Executer la commande !meteo suivi du nom de votre ville !");
			}
		}
	}
	else{
		resp = "Desolé humain, je ne comprend pas ta requète !"
	}
	return resp;
}

module.exports = function(msg,isTag){
	var query;
	if(!isTag)
		query = cont;
	else{
		spl = cont.split(" ");
		query = getQuery(spl,isTag);
	}

	if(query){
		client.message(query,{})
		.then((data) => {
			console.log(data.entities);
			resp = exec(data,isTag,msg);
			msg.reply(resp);
		})
		.catch(console.error);
	}
}