const handlers = require('./lib/handlers')
const fortune = require('./lib/fortune')
const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT || 3000

// configura o view engine Handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', handlers.home)

app.get('/about', handlers.about)

// página 404 personalizada
app.use(handlers.notFound)

// página 500 personalizada
app.use(handlers.serverError)

if (require.main === module) {
    
app.listen(port, () => console.log(
    `Express started on http://localhost:${port};`
    + 'press Ctrl-C to terminate.'
))
} else {
    module.exports = app
}