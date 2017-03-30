var axios = require('axios');

module.exports = function(msg,isTag){
	var image = undefined;
	spl = cont.split(" ");
	if(isTag)
	{
		if(spl.length == 3)
			image = spl[2];
	}
	else{
		if(spl.length == 2)
			image = spl[1];
	}

	if(image){
		axios.request({
	        url: 'https://api.imgur.com/3/gallery/search?q=' + image,
	        method: 'GET',
	        headers: {
	          Authorization: 'Client-ID 08e9a17be2c957b',
	          Accept: 'application/json'
	        }
		}).then(function(response){
			var low = 0;
			var high = response.data.data.length-1;
			var rand = Math.floor((Math.random() * high) + low);
			/*msg.reply({
				'embed': {
					title: response.data.data[rand].title,
					'image':{
						'url': response.data.data[rand].link,
					}
				}
			})*/
			msg.reply(response.data.data[rand].link);
		}).catch(function(fail){
			msg.reply('Erreur lors de l\'éxécution de la commande !image <query>');
		});
	}
	else{
		msg.reply('Commande météo incorrect. Je comprend seulement : !image <query>\nJe comprend également : !blague, !meteo <city>, !iss et !yoda <sentence>');
	}
}
