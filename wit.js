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
	spl = cont.split(" ");
	query = getQuery(spl,isTag);
	if(query){
		axios.request({
			//current weather
	        url: 'http://api.wit.ai/message?q=' + query,
	        method: 'GET',
	        headers: {
	          Authorization: 'Bearer ' + process.env.WIT_TOKEN,
	          Accept: 'application/json'
	        }
		}).then(function(response){
			console.log(response);
		}).catch(function(fail){
			msg.reply('Un problème est survenu (La ville est peut être erroné ou incorrect)');
		});
	}
}