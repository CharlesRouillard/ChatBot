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
            try{
                download(resp.config.url, 'map.png', function(){
                  sharp("map.png")
                    .overlayWith("sat.png")
                    .sharpen()
                    .withMetadata()
                    .jpeg({quality: 100})
                    .toBuffer()
                    .then(function(outputBuffer){
                        /*send image*/
                        var out = outputBuffer;
                        if(isTag){
                            msg.channel.sendFile(out,"ISSMap.jpeg","ISS en direct !",function(err,mess){
                                if(err){
                                    msg.reply('Erreur lors de l\'éxécution de la commande !iss');
                                    console.log(err + ' ' + mess);
                                }
                            });
                        }
                        else{
                            msg.author.sendFile(out,"ISSMap.jpeg","ISS en direct !",function(err,mess){
                                console.log(mess);
                                if(err){
                                    msg.reply('Erreur lors de l\'éxécution de la commande !iss');
                                    console.log(err + ' ' + mess);
                                }
                            });
                        }                       
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