const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.ribeiro.com.ar')
	.find('.L1')
	.set('name')
	.set('href', '@href')
	.find('.L2')
	.set('nameSubCategory')
	.set('hrefSubCategory', '@href')
	.find('.L3')
	.set('nameSubSubCategory')
	.set('hrefSubSubCategory', '@href')
	//.log(console.log)
	.data(function(data) {
		console.log(data);
		
	})
