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

module.exports = function(msg){
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
					.jpeg({quality: 90})
					.toBuffer()
    				.then(function(outputBuffer){
    					/*send image*/
    					msg.author.sendFile(outputBuffer,"ISSMap.jpeg","ISS en direct !",function(err,mess){
    						if(err)
    							console.log(err);
    						else
    							console.log(mess);
    					})
						/*delete image*/
						fs.unlink("map.png");
					});
				});
    		}
    		catch (e){
    			msg.reply('Erreur lors de l\'éxécution de la commande !iss');
    			console.log(e);
    		}
    		
    	}).catch(function(fail){
    		msg.reply('Erreur lors de l\'éxécution de la commande !iss');
    		console.log(fail);
    	})

	}).catch(function(fail){
		msg.reply('Erreur lors de l\'éxécution de la commande !iss');
		console.log(fail);
	});
}