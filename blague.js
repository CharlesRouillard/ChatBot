var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;

module.exports = function(msg){
	axios.request({
        url: 'http://www.chucknorrisfacts.fr//api/get?data=tri:alea;nb:1;type:txt',
        method: 'GET'
	}).then(function(response){
    	msg.reply(et.decode(response.data[0].fact));
	}).catch(console.log);
}