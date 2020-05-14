const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Directories
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Express config: setup handlebars engine and change dir
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static page
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        condition: "Sunny",
        name: "ME"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        about: "ME",
        name: "ME"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        help: "911",
        name: "ME"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address argument."
        })
    }
    geocode(req.query.address, (error, { longitude, laditude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, laditude, (error, { summary, temperature } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location: req.query.address,
                summary,
                temperature
            })
        })        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'No page found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port: 3000')
})