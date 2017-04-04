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
		client.message(query,{})
		.then((data) => {
			console.log(data);
		})
		.catch(console.error);
	}
}