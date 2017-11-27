const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

var categories=fs.readFileSync("fravega_categories.json", 'utf8');
console.log(JSON.parse(categories));
var obj = JSON.parse(categories);
obj.forEach(function(item) {
	item.subCategories.forEach(function(item2) {
		console.log(item2.href);
		osmosis
			.get('http://www.fravega.com'+item2.href)
			.find('.wrapData')
			.set('name', 'a')
			.set('price', '.BestPrice')
			//.log(console.log)
			.data(function(data) {
				console.log(data);      
			})
	});
});


