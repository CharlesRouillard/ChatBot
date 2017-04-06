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

function exec(data,msg){
	var resp = "";
	var intent = data.entities.intent[0].value;
	if(intent){
		if(intent == "hello"){
			resp = "Bien le bonjour, humain ! Je suis BuckowskyBot ! Un bot discord qui comprend plusieurs commandes : \n- !blague - Permet d'afficher une Chuck Norris fact !\n- !image <string> - Qui permet d'afficher une image en relation avec <string>\n- !meteo <city> - Permet d'afficher la température actuelle de <city>\n- !iss - Affiche une carte du monde avec la position actuelle de l'ISS\n- !yoda <quote> - Petit délire... Transforme n'importe quelle phrase en une phrase façon Maitre Yoda !"
		}
		else if(intent == "temps"){
			if(data.entities.location[0].value){
				var query = data.entities.location[0].value;
				axios.request({
			        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + process.env.WEATHER_TOKEN,
			        method: 'GET'
				}).then(function(response){
					var temp = (response.data.main.temp-273.15);
					temp = Math.round(temp *10)/10;
					var tempMin = (response.data.main.temp_min-273.15);
					tempMin = Math.round(tempMin *10)/10;
					var tempMax = (response.data.main.temp_max-273.15);
					tempMax = Math.round(tempMax *10)/10;
			    	msg.reply("In " + response.data.name + " the current temperature is " + temp + "°C\nThe minimal temperature is " + tempMin + "°C and the maximal is " + tempMax + "°C\n");
				}).catch(function(fail){
					msg.reply('Un problème est survenu (La ville est peut être erroné ou incorrect)');
				});	
			}
			else{
				msg.reply("Executer la commande !meteo suivi du nom de votre ville !");
			}
		}
	}
	else{
		resp = "Desolé humain, je ne comprend pas ta requète !";
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
			resp = exec(data,msg);
			msg.reply(resp);
		})
		.catch(console.error);
	}
}