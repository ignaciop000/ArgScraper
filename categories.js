const osmosis = require('osmosis');
const fs = require('fs');
var request = require('request');
/*
osmosis
    .get('www.google.com')
    .set({'Title': 'title'})  
    .data(console.log)  
	
osmosis
    .get('https://www.google.co.in/search?q=analytics')
    .find('#botstuff')
    .set({'related': ['.card-section .brs_col p a']})
    .data(function(data) {
        console.log(data);
    })

osmosis
   .get('https://www.google.co.in/search?q=analytics')
   .paginate('#navcnt table tr > td a[href]', 5)
   .find('#botstuff')
   .set({'related': ['.card-section .brs_col p a']})
   .data(console.log)
   .log(console.log) 
   .error(console.error) 
*/
/*
let savedData = [];
osmosis
   .get('http://apps.shopify.com/categories/sales')
   .find('.resourcescontent ul.app-card-grid')
   .follow('li a[href]')
   .find('.resourcescontent')
   .set({
       'appname': '.app-header__details h1',
       'email': '#AppInfo table tbody tr:nth-child(2) td > a'
    })
   .log(console.log)   // enable logging to see what is does.
   .data(function(data) {
      console.log(data);
      savedData.push(data);
   })
   .done(function() {
      fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
        if(err) console.error(err);
        else console.log('Data Saved to data.json file');
      })
   });
*/


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
			var saved = fs.writeFileSync('categories.json', JSON.stringify(listCategories), 'utf8');
			//console.log(JSON.stringify(listCategories));
		});
	});
});
/*
osmosis
   .get('http://www.fravega.com')
   .find('.home_catDestacadas__btn')
   .set('location')
   .log(console.log)
   .data(function(data) {
      console.log(data);      
   })
*/


