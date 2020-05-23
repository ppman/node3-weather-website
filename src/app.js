const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hanlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Amir'
    })
})
app.get('', (req, res) =>{
    res.render('index' ,{
        title: 'Weather app',
        name: 'Amir'
    })
})

app.get('/help', (req, res) =>{
    res.render('help' ,{
        title: 'helpppp',
        name: 'Amir',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Error! you need to add address!!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: 'Error!' + error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send([{
                forecast: forecastData,
                location: location,
                address: req.query.address
            }])
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('404' ,{
        title: 'Help',
        errorMessage: 'Help article not found',
        name:'Amir'
    })
})
app.get('*', (req, res) => {
    res.render('404' ,{
        title: '404',
        errorMessage: 'Page not found',
        name:'Amir'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
