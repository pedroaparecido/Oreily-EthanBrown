const express = require('express')

const app = express()
const expressHaandlebars = require('express-handlebars')
const port = process.env.PORT || 3000

const fortunes = [
    'Conquer your fears of they will conquer you.',
    'Rivers need springs.',
    'Do not fear what you dont know.',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.'
]

// configura o view engine Handlebars
app.engine('handlebars', ExpressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', { fortune: randomFortune })
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