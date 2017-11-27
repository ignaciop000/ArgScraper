const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.musimundo.com')
	.get('ul .sub')
	.find('li')
	.set('name', 'a')
	.set('href', 'a@href')
	.data(function(data) {
		console.log(data);
		
	})
