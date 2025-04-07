const fortune = require('./lib/fortune')
const express = require('express')
const app = express()
const expressHaandlebars = require('express-handlebars')
const port = process.env.PORT || 3000

// configura o view engine Handlebars
app.engine('handlebars', ExpressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) =>{
    res.render('about', { fortune: fortune.getFortune() })
})

// página 404 personalizada
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// página 500 personalizada
app.use((err, re, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};`
    + 'press Ctrl-C to terminate.'
))