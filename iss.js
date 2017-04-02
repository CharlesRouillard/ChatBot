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

function getDatetime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var h = today.getHours()+2;
    var m = today.getMinutes();
    var s = today.getSeconds(); 

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy+":" + h + ":" + m + ":" + s;
    return today;
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
                    .png()
                    .toFile("final.png")
                    .then(function(e){
                        /*send image*/
                        //out = outputBuffer;
                        var date = getDatetime();
                        fn = "ISSMap" + date +  ".png";
                        if(isTag){
                            msg.channel.sendFile("final.png",fn,"Position de l\'ISS le " + date,function(err,mess){
                                if(err){
                                    msg.reply('Erreur lors de l\'éxécution de la commande !iss');
                                    console.log(err + ' ' + mess);
                                }
                            });
                        }
                        else{
                            msg.author.sendFile("final.png",fn,"Position de l\'ISS le " + date,function(err,mess){
                                console.log(mess);
                                if(err){
                                    msg.reply('Erreur lors de l\'éxécution de la commande !iss');
                                    console.log(err + ' ' + mess);
                                }
                            });
                        }
                        //delete out;  
                        //delete fn;                   
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