# financial-planning-tool
Just because I can.

ASSIGNMENT

Extra Exercise for the Awesome
NOTE: When done right this can be a great 'portfolio item'. Who doesn't want to hire a developer who made a good looking financial planning tool just because he/she could...

Phase #1
Create a web form where people can input their retirement plans
Requirements:
* The page uses a framework like bootstrap/materialize
* The user can input all variables used in the compound interest exercise
* The form uses POST as a method for security reasons

Vragen op eerste gezicht:
- web form en post: werken met pug
- opzoeken of bootstrap gewoon in pug past
- gebruiken van de app van de vorige opdracht
- weer even bootstrap doorlezen

Workflow:
- make a repository
- .gitignore voor modules / ds store (gebruik ik wel modules?)
- handmatig .gitignore toevoegen (ivm onzichtbaar)
- npm init
- npm install express pug body-parser –-save
- touch app.js
- mkdir views
- touch views/index.pug
- touch views/inputplan.pug
- touch data.json
- bootstrap 'downloaden'/uit andere opdracht halen

in app.js:
- zet de vaste waarden bovenin
- zet de local port onderin
- app get index --> pagina zichtbaar krijgen
- app get inputplan --> pagina zichtbaar krijgen
- app post inputplan --> pagina input kunnen verwerken

in index.pug
- bootstrap template
- linkjes maken

in inputplan.pug
- bootstrap template
- form invullen, vergelijkbaar met de voorgaande naam-email-opdracht
- in form: let op datatype

in data.json:
- hoeft geen database op te bouwen, dus een leeg array met leeg object?


Phase #2
After the user submits the form, display their retirement statistics
Requirements:
* After submitting the form, nodejs calculates the pension statistics and pug displays them
* The results are personalised (e.g. "Hello Mentor! Your retirement options look like this:")
* All scenarios (optimistic, neutral, pessimistic) are displayed

Phase #3
The user predicts a x% (for example 5%) increase of invested income every year, add this to your app

Phase #4
The interest of invested money fluctiates randomly between the pessimistic and optimistic values each year. Add a 'simulate reality' option to your form that calculates a possible pension based on these random values.

Phase #5
The S&P 500 is an index fund known by investors worldwide. Create a separate page that allows you to calculate how much money you would have retired with if you invested in the S&P 500 from 1950 to 2015. You will need this historical data: http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
The form on the page should allow you to fill in all the usual values, but the interest rates are instead based on the historical data.

Phase #UB3RL33T
Modify this whole app to run client side, so purely in chrome.