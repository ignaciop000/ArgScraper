const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.garbarino.com')
	.find('.gb-menu-n1')
	.set('name', '.gb-category-text')
	.set('href', '.gb-category-submenu a@href')
	//.log(console.log)
	.data(function(data) {
		console.log(data);
		
	})
