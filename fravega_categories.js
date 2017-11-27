const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');

request('https://www.fravega.online/airtable/appmoF9qZ9JocJmvZ/category', function (error, response, body) {
	if (error) {
		console.log(error);
		return;
	}
	if (response.statusCode != 200) {
		console.log('statusCode:', response && response.statusCode); 
		console.log(body);
		return;
	}
	let categories = JSON.parse(body);
	request('https://www.fravega.online/airtable/appmoF9qZ9JocJmvZ/subcategory', function (error, response, body) {
		if (error) {
			console.log(error);
			return;
		}
		if (response.statusCode != 200) {
			console.log('statusCode:', response && response.statusCode); 
			console.log(body);
			return;
		}
		let subCategories = JSON.parse(body);
		request('https://www.fravega.online/airtable/appmoF9qZ9JocJmvZ/subsubcategory', function (error, response, body) {
			if (error) {
				console.log(error);
				return;
			}
			if (response.statusCode != 200) {
				console.log('statusCode:', response && response.statusCode); 
				console.log(body);
				return;
			}
			let subSubCategories = JSON.parse(body);			
			var mapSubSubCategories = {};
			var mapSubCategories = {};
			var listCategories = [];
			subSubCategories.results.forEach(function(item) {
				mapSubSubCategories[item.id] = {'id':item.id,'name':item.name,'href':item.href};
			});
			subCategories.results.forEach(function(item) {
				mapSubCategories[item.id] = {'id':item.id,'name':item.name,'href':item.href, 'subCategories':[]};
				if (item.children) {					
					item.children.forEach(function(child) {
						var ssCat = mapSubSubCategories[child];
						if (ssCat) { 
							mapSubCategories[item.id].subCategories.push(ssCat);
						} else {
							console.log('ERROR - SubSubCategoria No Encontrada');
						}
					});
				}
			});
			categories.results.forEach(function(item) {
				var obj = {'id':item.id,'name':item.name, 'subCategories':[]};
				if (item.children) {					
					item.children.forEach(function(child) {
						var ssCat = mapSubCategories[child];
						if (ssCat) { 
							obj.subCategories.push(ssCat);
						} else {
							console.log('ERROR - SubCategoria No Encontrada');
						}
					});
				}
				listCategories.push(obj);
			});
			var saved = fs.writeFileSync('fravega_categories.json', JSON.stringify(listCategories), 'utf8');
		});
	});
});

