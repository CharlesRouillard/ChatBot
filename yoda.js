var axios = require('axios');

module.exports = function(msg, isTag){
	var sentence = undefined;
	spl = cont.split(" ");
	if(isTag)
	{
		if(spl.length == 3)
			sentence = spl[2];
	}
	else{
		if(spl.length == 2)
			sentence = spl[1];
	}

	if(sentence){
		axios.request({
		    url: 'https://yoda.p.mashape.com/yoda?sentence=' + sentence,
		    method: 'GET',
		    headers: {
		    	'X-Mashape-Key': process.env.YODA_TOKEN,
		      	Accept: 'text/plain'
	   		}
		}).then(function(response){
			msg.reply(response.data);
		}).catch(console.log);
	}
	else{
		msg.reply('Commande météo incorrect. Je comprend seulement : !yoda <sentence>\nJe comprend également : !blague, !meteo <city>, !iss et !image <query>');
	}
}
