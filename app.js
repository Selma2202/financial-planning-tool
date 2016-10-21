'use strict' //making sure new terms are readable

//including necessary modules and setting up of the file
const express = require ('express')
const fs = require ('fs')
const bodyParser = require('body-parser') //al in twee tutorials gezien dat het gebruikt wordt, dus gebruiken
const app = express ()

//this one is generally used, not the json one (for full disclosure left at bottom document)
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/static"))

app.set ('view engine', 'pug')
app.set ('views', __dirname + '/views')


//Create an index landing page:
app.get ('/index', (request, response) => {
	response.render('index')
	console.log('\nThe browser will now display the homepage.')
})

//Create a page that has a form that allows for input.
app.get ('/inputplan', (request, response) => {
	response.render('inputplan')
})

// route 5: takes in the post request from the 'inputplan' form, then adds the user to the users.json file. Once that is complete, redirects to a page thanking you.

app.post ('/inputplan', (req, resp) => {
	//console.log('debugging 1')

	fs.readFile( __dirname + '/data.json', 'utf8', (error, data) => {
		if (error) throw error

			console.log(data)
			let parsedData = JSON.parse(data)//parse data so there can be objects added to the data
			console.log(parsedData)//shows in the console the data without the new object

			parsedData.push(
				{"firstName": req.body.firstName, 
				"lastName": req.body.lastName, 
				"myAge": req.body.myAge,
				"country": req.body.country,
				"countryOrigin": req.body.countryOrigin,
				"situation": req.body.situation})

			console.log(parsedData) //YES OMG HET NIEUWE OBJECT KOMT ERIN TE STAAN (shows in the console the data with the new object)

			fs.writeFile(__dirname + '/data.json', JSON.stringify(parsedData, null, '\t'), (err) => {//by inserting the stringify in the spot where normally the data would be, it will immediately take the right data. Together with writefile, this will save the data to the new (replaced) json file data.json
				if (err) throw err;
				console.log('It\'s saved!');//informative for terminal readers
			});

			resp.redirect('thanksforadding')//it does not first have to parse the new written data again, since only one item was added.
		})
})






//what localhost can this app be found
app.listen (8000, () => {
	console.log('We are listening on port 8000')
})