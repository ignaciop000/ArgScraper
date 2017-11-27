const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.rodo.com.ar')
	.find('li .level0')
	.set('name', 'a')
	//.set('href', 'a@href')
	.data(function(data) {
		console.log(data);
		
	})
