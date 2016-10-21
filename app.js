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

// route 5: takes in the post request from the 'inputplan' form, then uses this to calculate. Once that is complete, redirects to a page with the outcome.
// Ik kan nu de (lege) data parsen, vullen, writen en daarvoor berekenen, maar het doel is toch niet om de gegevens op te slaan en database te maken. dus beter kan ik ze alleen importeren en gelijk gebruiken

// help function for later on
let roundDecimal 	= (number) => {
	return Math.round (number * 100 ) / 100
}
let addCommas 		= ( number ) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let prettyNr 		= (number) => {
	return addCommas(roundDecimal (number))
}


app.post ('/inputplan', (req, resp) => {
	//console.log('debugging 1')

// Set end amount prop and calculate total duration
let	endamountPes = req.body.finStartcapital
let endamountAv = req.body.finStartcapital
let endamountOpt = req.body.finStartcapital

console.log (prettyNr(endamountPes) + "aaaa")

let pensionDuration = (req.body.retireAge - req.body.age)

	// Do the interest math
	for (var i = pensionDuration - 1; i >= 0; i--) {//dit is the improved native for loop, efficienter omdat ie niet telkens een external object moet aanspreken om te checken of het nog moet blijven loopen.


		//Add monthly spend to all the scenarios
		endamountPes 	+= (req.body.finMonthlyadd * 12 )
		endamountAv 		+= (req.body.finMonthlyadd * 12 )
		endamountOpt 	+= (req.body.finMonthlyadd * 12 )

		//Calculate the added interest
		endamountPes 	*= req.body.pensionIntPessimistic
		endamountAv 		*= req.body.pensionIntAverage
		endamountOpt 	*= req.body.pensionIntOptimistic

}

endamountPes = (prettyNr(endamountPes))
endamountAv = (prettyNr(endamountAv))
endamountOpt = (prettyNr(endamountOpt))


// console.log(req.body.name)
// console.log(req.body.age)
// console.log(req.body.finStartcapital)
// console.log(req.body.finMonthlyadd)
// console.log(req.body.retireAge)
// console.log(req.body.pensionIntPessimistic)
// console.log(req.body.pensionIntAverage)
// console.log(req.body.pensionIntOptimistic)


resp.render('outputplan', {name: req.body.name, age: req.body.age, finStartcapital: req.body.finStartcapital, finMonthlyadd: req.body.finMonthlyadd, retireAge: req.body.retireAge, pensionIntPessimistic: req.body.pensionIntPessimistic, pensionIntAverage: req.body.pensionIntAverage, pensionIntOptimistic: req.body.pensionIntOptimistic, endamountPes, endamountAv, endamountOpt})


// , {finStartcapital: req.body.finStartcapital}, {finMonthlyadd: req.body.finMonthlyadd}, {retireAge: req.body.retireAge}, {pensionIntPessimistic: req.body.pensionIntPessimistic}, {pensionIntAverage: req.body.pensionIntAverage}, {pensionIntOptimistic: req.body.pensionIntOptimistic}, endamountPes, endamountAv, endamountOpt)

// , {name: req.body.name}, {age: req.body.age}, {finStartcapital: req.body.finStartcapital}, {finMonthlyadd: req.body.finMonthlyadd}, {retireAge: req.body.retireAge}, {pensionIntPessimistic: req.body.pensionIntPessimistic}, {pensionIntAverage: req.body.pensionIntAverage}, {pensionIntOptimistic: req.body.pensionIntOptimistic}, endamountPes, endamountAv, endamountOpt)

	//Welcome customer
	console.log ("Welcome " + req.body.name + " to our pension planner!")
	// console.log ("You are starting with " + customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd)
	// console.log ("When you retire at age " + customer.pension.age + " you will have the following:")
	// //Output data
	// console.log ("In a pessimistic scenario: €" 	+ prettyNr(customer.pension.endamount.pessimistic))
	// console.log ("In a average scenario: €" 		+ prettyNr(customer.pension.endamount.average))
	// console.log ("In a optimistic scenario: €" 		+ prettyNr(customer.pension.endamount.optimistic))
})



	
 





//what localhost can this app be found
app.listen (8000, () => {
	console.log('We are listening on port 8000')
})




//old data
// fs.readFile( __dirname + '/data.json', 'utf8', (error, data) => {
// 		if (error) throw error

// 			console.log(data)
// 			let parsedData = JSON.parse(data)//parse data so there can be objects added to the data
// 			console.log(parsedData)//shows in the console the data without the new object

// 			parsedData.push(
// 				{"firstName": req.body.firstName, 
// 				"lastName": req.body.lastName, 
// 				"myAge": req.body.myAge,
// 				"country": req.body.country,
// 				"countryOrigin": req.body.countryOrigin,
// 				"situation": req.body.situation})

// 			console.log(parsedData) //YES OMG HET NIEUWE OBJECT KOMT ERIN TE STAAN (shows in the console the data with the new object)

// 			fs.writeFile(__dirname + '/data.json', JSON.stringify(parsedData, null, '\t'), (err) => {//by inserting the stringify in the spot where normally the data would be, it will immediately take the right data. Together with writefile, this will save the data to the new (replaced) json file data.json
// 				if (err) throw err;
// 				console.log('It\'s saved!');//informative for terminal readers
// 			});

// 			resp.redirect('thanksforadding')//it does not first have to parse the new written data again, since only one item was added.
// 		})
// })