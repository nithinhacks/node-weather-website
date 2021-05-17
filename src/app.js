const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

const viewpath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)

app.get('', (req,res) =>{
    res.render('index', {
        title: 'weather app',
        name: 'nithin'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about',
        name: 'nithin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'nithin'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'cloudy',
    //     location: 'visakhapatnam',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'nithin',
        errorMessage: 'help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nithin',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('server is up in port '+port)
})