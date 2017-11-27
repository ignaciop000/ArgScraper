const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.compumundo.com.ar')
	.find('.cp-menu-n1')
	.set('name', '.cp-category-text')
	.set('href', '.cp-category-submenu a@href')
	//.log(console.log)
	.data(function(data) {
		console.log(data);
		
	})
