const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.falabella.com.ar/falabella-ar/')
	.find('.fb-masthead__child-links__item__link js-masthead__child-links__item__link')
	.set('name', 'h4')
	.set('href', 'href')
	.data(function(data) {
		console.log(data);		
	})
