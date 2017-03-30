var axios = require('axios');

module.exports = function(msg, isTag){
	var cmd = cont.substring(0,5);
	var sentence = cont.substring(6,cont.length);
	console.log(cmd);
	console.log(sentence);
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
		}).catch(console.log);
	}
	else{
		msg.reply('Commande !yoda incorrect. Je comprend seulement : !yoda <sentence>\nJe comprend également : !blague, !meteo <city>, !iss et !image <query>');
	}
}
