var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;

module.exports = function(msg,isTag){
	axios.request({
        url: 'https://api.wheretheiss.at/v1/satellites/25544',
        method: 'GET'
	}).then(function(response){

    	lat = response.data.latitude;
    	lon = response.data.longitude;

    	axios.request({
    		url: 'http://staticmap.openstreetmap.de/staticmap.php?center=' + lat + ',' + lon + '&zoom=3&size=400x300&maptype=mapnik&markers=' + lat + ',' + lon + ',ltblu-pushpin',
    		method: 'GET'
    	}).then(function(resp){
    		msg.reply(resp.config.url);
    	}).catch(console.log)

	}).catch(console.log);
}