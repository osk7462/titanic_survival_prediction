const { Console } = require('console');
var express = require('express');
var app = express();
let port = 4002
route = "http://localhost:" + port
console.log(route)
app.use(express.static('./python/response_data'))

app.get('/api', (req, res) => {
	let response = ""
	var spawn = require("child_process").spawn;
	var process = spawn('python',["./python/titanic.py",
							"get_exploratory_data",
							route
						] );
	process.stdout.on('data', data => {
		response = data.toString()
	} )

	process.on('close', () => {
			res.send(JSON.parse(response))
		});

})




app.get('/api/predict', (req, res) =>  {
	let response = ""
	var spawn = require("child_process").spawn;
	var process = spawn('python',["./python/titanic.py",
							"make_prediction",
							route,
							req.query.v1,
							req.query.v2,
							req.query.v3,
							req.query.v4,
							req.query.v5,
							req.query.v6,
							req.query.v7,
							req.query.v8,
							req.query.v9,
							req.query.v10,
							req.query.v11
						] );
	process.stdout.on('data', data => {
		response = data.toString()
	} )

	process.on('close', () => {
		res.send(JSON.parse(response))
		});
		
})

app.listen(port, function() {
	console.log('server running on port ' + port);
} )
