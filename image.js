var axios = require('axios');

function getQuery(spl,isTag){
	var query = "";
	if(isTag){
		for(var i = 2;i<spl.length;i++){
			query += spl[i] + " ";
		}
	}
	else{
		for(var i = 1;i<spl.length;i++){
			query += spl[i] + " ";
		}
	}
	return query;
}

module.exports = function(msg,isTag){

	var cmd,query;
	spl = cont.split(" ");

	if(isTag)
	{
		cmd = spl[1];
	}
	else{
		cmd = spl[0]
	}

	if(cmd == "!image" && query){
		query = getQuery(spl,isTag);
		axios.request({
	        url: 'https://api.imgur.com/3/gallery/search?q=' + query,
	        method: 'GET',
	        headers: {
	          Authorization: 'Client-ID ' + process.env.IMGUR_TOKEN,
	          Accept: 'application/json'
	        }
		}).then(function(response){
			var low = 0;
			var high = response.data.data.length-1;
			var rand = Math.floor((Math.random() * high) + low);
			msg.reply(response.data.data[rand].link);
		}).catch(function(fail){
			msg.reply('Erreur lors de l\'éxécution de la commande !image <query> (Image introuvable ou API hors ligne)');
		});
	}
	else{
		msg.reply('Commande image incorrect. Je comprend seulement : !image <query>\nJe comprend également : !blague, !meteo <city>, !iss et !yoda <sentence>');
	}
}
