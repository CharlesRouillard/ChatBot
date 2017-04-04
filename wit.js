var axios = require('axios');
const {Wit, log} = require("node-wit");

const client = new Wit({accessToken: process.env.WIT_TOKEN});

function getQuery(spl,isTag){
	var query = "";
	for(var i = 2;i<spl.length;i++){
		query += spl[i] + " ";
	}
	return query;
}

function exec(data){
	var resp = "";
	if(data.entities.intent[0].value == "hello"){
		resp = "Bien le bonjour, humain ! Je suis BuckowskyBot ! Un bot discord qui comprend plusieurs commandes : \n- !blague - Permet d'afficher une Chuck Norris fact !\n- !image <string> - Qui permet d'afficher une image en relation avec <string>\n- !meteo <city> - Permet d'afficher la température actuelle de <city>\n- !iss - Affiche une carte du monde avec la position actuelle de l'ISS\n- !yoda <quote> - Petit délire... Transforme n'importe quelle phrase en une phrase façon Maitre Yoda !"
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
			resp = exec(data);
			msg.reply(resp);
		})
		.catch(console.error);
	}
}