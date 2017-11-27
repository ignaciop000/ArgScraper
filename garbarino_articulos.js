const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

osmosis
	.get('http://www.garbarino.com')
	.find('.gb-menu-n1')
	.set('category','.gb-category-text')
	.follow('.gb-category-submenu a@href')
	.find('.gb-list-cluster')
	.set('href', 'a@href')
	.set('name', '.gb-list-cluster-title')
	.set('price', '.gb-list-cluster-prices-current')
	//.log(console.log)
	.data(function(data) {
		console.log(data);		
	})
