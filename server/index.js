var express = require('express');
var app = express();

app.use(express.static('image'))

app.get('/api', (req, res) => {
	figures = []
	for(let i = 1; i<16; i++) {
		figures[i] = "http://localhost:3000/fig" +i+".png"
	}
	res.send({"figures": figures})
})




app.get('/api/predict', (req, res) =>  {
	let apiData = {}
	let apiDatum

	var spawn = require("child_process").spawn;
	var process = spawn('python',["./predicting.py",
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
		apiDatum = data.toString()
	} )

	process.on('close', () => {
		apiDatum = apiDatum.split(":")
		apiData[apiDatum[0]] = apiDatum[1]
		console.log(apiData[apiDatum[0]])
		res.send(apiData)
		});
		
})

let port = 2001
app.listen(port, function() {
	console.log('server running on port ' + port);
} )
