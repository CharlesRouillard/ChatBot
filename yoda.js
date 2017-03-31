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

module.exports = function(msg, isTag){
	var cmd,query;
	spl = cont.split(" ");
	if(isTag)
	{
		cmd = spl[1];
	}
	else{
		cmd = spl[0]
	}
	
	if(cmd == '!yoda' && query != ""){
		query = getQuery(spl,isTag);
		axios.request({
		    url: 'https://yoda.p.mashape.com/yoda?sentence=' + query,
		    method: 'GET',
		    headers: {
		    	'X-Mashape-Key': process.env.YODA_TOKEN,
		      	Accept: 'text/plain'
	   		}
		}).then(function(response){
			msg.reply(response.data);
		}).catch(function(fail){
			msg.reply('Erreur lors de l\'éxécution de la commande !yoda');
		});
	}
	else{
		msg.reply('Commande !yoda incorrect. Je comprend seulement : !yoda <sentence>\nJe comprend également : !blague, !meteo <city>, !iss et !image <query>');
	}
}
