const express = require("express");
const {
	MongoClient
} = require('mongodb');
const connection = "mongodb://localhost:27017";
const client = new MongoClient(connection);
const testCollection = client.db("test").collection('user');

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("./middleware/auth");

const app = express();

app.get('/api/user', async (req, res) => {
	try {

		const result = await testCollection.find({}).toArray();
		return res.status(200).json(result);
	} catch (e) {
		return res.status(400).send({
			error: 'Smth go wrong '
		})
	}
});

app.post('/api/getToken', async (req, res) => {
	// res.send('Hello World!')
	try {
		console.log(res);
		const result = await testCollection.find({}).toArray();
		console.log(result);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(400).send({
			error: 'Smth go wrong '
		})
	}
})

// app.post('/api/getToken', (req, res) => {
// 	// res.send('Hello World!')
// 	mongoose.connect(url, {
// 		useMongoClient: true
// 	}, function (err) {
// 		if (err) throw err;
// 		User.find({}, function (err, user) {
// 			if (err) throw err;
// 			if (user.length) {
// 				return res.status(200).json({
// 					status: 'success',
// 					data: user
// 				})
// 			} else {
// 				return res.status(200).json({
// 					status: 'fail',
// 					message: 'Login Failed',
// 					data: user
// 				})
// 			}

// 		})
// 	});
// })

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

module.exports = app;