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

module.exports = function(msg,isTag){
	var query;
	if(!isTag)
		query = cont;
	else{
		spl = cont.split(" ");
		query = getQuery(spl,isTag);
	}

	if(query){
		/*axios.request({
			//current weather
	        url: 'http://api.wit.ai/message?q=' + query,
	        method: 'GET',
	        headers: {
	          Authorization: 'Bearer ' + process.env.WIT_TOKEN,
	          Accept: 'application/json'
	        }
		}).then(function(response){
			console.log(response.data);
			console.log(response.data.entities.intent);
		}).catch(function(fail){
			msg.reply('Un problème est survenu (La ville est peut être erroné ou incorrect)');
		});*/
		client.message(query,{})
		.then((data) => {
			console.log("GOT IT => " + JSON.stringify(data));
		})
		.catch(console.error);
	}
}