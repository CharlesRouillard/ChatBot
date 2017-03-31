var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;
var sharp = require("sharp");
var fs = require('fs'),
request = require('request');

function download(uri,filename,callback){
	request.head(uri, function(err, res, body){
	    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  	});		
}

module.exports = function(msg,isTag){
	axios.request({
        url: 'https://api.wheretheiss.at/v1/satellites/25544',
        method: 'GET'
	}).then(function(response){

    	lat = response.data.latitude;
    	lon = response.data.longitude;

    	axios.request({
    		url: 'http://staticmap.openstreetmap.de/staticmap.php?center=' + lat + ',' + lon + '&zoom=2&size=400x300&maptype=mapnik&markers=' + lat + ',' + lon + ',ltblu-pushpin',
    		method: 'GET'
    	}).then(function(resp){
    		/*msg.reply(resp.config.url);*/

    		console.log("url is " + resp.config.url);
    		try{
    			download(resp.config.url, 'map.png', function(){
				  sharp("map.png")
    				.overlayWith("sat.png")
    				.sharpen()
					.withMetadata()
					.webp({quality: 90})
					.toBuffer()
    				.then(function(outputBuffer){
    					console.log(outputBuffer);
    					fs.writeFile("final.png",outputBuffer);
					});
				});
    		}
    		catch (e){
    			console.log(e);
    		}
    		
    	}).catch(function(fail){
    		msg.reply('Erreur lors de l\'éxécution de la commande !iss')
    	})

	}).catch(function(fail){
		msg.reply('Erreur lors de l\'éxécution de la commande !iss')
	});
}