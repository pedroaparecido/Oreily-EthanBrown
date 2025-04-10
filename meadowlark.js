const handlers = require('./lib/handlers')
const fortune = require('./lib/fortune')
const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ exteended: true }))
app.use(bodyParser.json())

// configura o view engine Handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', 'handlebars')

app.get('/newsletter', handlers.newsletter)

app.post('/newsletter-signup', handlers.api.newsletterSignup)

app.post('api/newsletter-signup', handlers.newsletterSignup)

app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)

app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

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