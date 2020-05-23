const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=98805871ef56f6f3fd9643f35866d29c&query=' + longitude +',' + latitude + '&units=m'
    request({url, json:true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        }else if(body.error) {
            callback('Unable to find location, Try another search', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + ' ' + body.current.temperature)
        }
    })
}

module.exports = forecast
