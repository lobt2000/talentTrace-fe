const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';

const User = require('./model/user');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/api/user', (req, res) => {
	// res.send('Hello World!')
	mongoose.connect(url,{ useMongoClient: true }, function(err){
		if(err) throw err;
		User.find({}, function(err, user){
			if(err) throw err;
			if(user.length){	
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed',
					data: user
				})
			}
			
		})
	});
});

app.post('/api/user/login', (req, res) => {
	// res.send('Hello World!')
	mongoose.connect(url,{ useMongoClient: true }, function(err){
		if(err) throw err;
		User.find({}, function(err, user){
			if(err) throw err;
			if(user.length){	
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed',
					data: user
				})
			}
			
		})
	});
})

// app.post('/api/user/create', (req, res) => {
// 	mongoose.connect(url, function(err){
// 		if(err) throw err;
// 		const user = new User({
// 			name: req.body.name,
// 			username: req.body.username,
// 			password: req.body.password
// 		})
// 		user.save((err, res) => {
// 			if(err) throw err;
// 			return res.status(200).json({
// 				status: 'success',
// 				data: res
// 			})
// 		})
// 	});
// })

app.listen(3000, () => console.log('Blog server running on port 3000!'))