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

	console.log(query);

	if(cmd == "!meteo" && query == undefined){
		/*commande correct*/
		query = getQuery(spl,isTag);
		axios.request({
			//current weather
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
		msg.reply('Commande météo incorrect. Je comprend seulement : !meteo <city>\nJe comprend également : !blague, !image <query>, !iss et !yoda <sentence>');
	}
}