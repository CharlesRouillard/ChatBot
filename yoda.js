var axios = require('axios');

module.exports = function(msg, isTag){
	if(isTag)
	{
		//pas terrible
		var cmd = cont.substring(22,28);
		var sentence = cont.substring(28,cont.length);
	}
	else
	{
		var cmd = cont.substring(0,6);
		var sentence = cont.substring(6,cont.length);
	}
	
	if(cmd == '!yoda '){
		axios.request({
		    url: 'https://yoda.p.mashape.com/yoda?sentence=' + sentence,
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
