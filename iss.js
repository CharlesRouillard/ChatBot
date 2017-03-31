var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;
var sharp = require("sharp");

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
    			/*sharp(resp.config.url)
    				.overlayWith("sat.png")
    				.then(function(outputBuffer){
    					console.log(outputBuffer);
					});*/
				sharp('sat.png')
				  .resize(100, 100)
				  .toFile('output.png', function(err) {
				    // output.jpg is a 300 pixels wide and 200 pixels high image
				    // containing a scaled and cropped version of input.jpg
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