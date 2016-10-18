/*jshint esversion: 6 */
'use strict'

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const pug = require('pug');
const fs = require('file-system');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';
var userName ="";



app.get('/fetchRegisteredUserData', function(req, res){
	userName = req.query.username;
	mongoClient.connect(url, function (error, db) {
		if (error) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {

			var collection = db.collection('users');

			//collection.drop();
			// var user1 = {name: 'sagar', password:"SA88**ar"};
			// var user2 = {name: 'Ramesh', password:"RA55%%sh"};
			// var user3 = {name: 'Mahesh', password:"MA44$$sh"};

			// collection.insert([user1, user2, user3], function (err, result) {
			// 	if (err) {
			// 	console.log(err);
			// 	} else {
			// 	console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
			// 	}
			// 	db.close();
			// });	

			collection.find({ name: userName }).toArray(function (err, result) {

				var data ="";
				if (err) {
					data = err;
				} else if (result.length) {
					data = result;
					
				} else {
					data = 'No document(s) found with defined "find" criteria!';
				}
				 res.send(data);
				db.close();
			});
		}

	});
});

router.get('/', function(request, response){
	'use strict';
	const compiledFunction = pug.compileFile('components/login/login.pug');

	fs.writeFile('components/login/login.html', compiledFunction({}), function(err) {
            if(err) {
				 console.log(err);
			}else{
				response.sendFile(path.resolve('components/login/login.html'));
			}

    });  
});

router.get('/login', function(request, response){
	'use strict';
	const compiledFunction = pug.compileFile('components/login/login.pug');

	fs.writeFile('components/login/login.html', compiledFunction({}), function(err) {
            if(err) {
				 console.log(err);
			}else{
				response.sendFile(path.resolve('components/login/login.html'));
			}

    });  
});

router.get('/home', function(request, response){
	'use strict';
	const compiledFunction = pug.compileFile('components/home/home.pug');

	fs.writeFile('components/home/home.html', compiledFunction({}), function(err) {
            if(err) {
				 console.log(err);
			}else{
				response.sendFile(path.resolve('components/home/home.html'));
			}

    });  
});

app.use(express.static(path.join(__dirname, '')));
app.use('/', router);

app.listen(3000);

console.log('open: http://127.0.0.1:3000/');
