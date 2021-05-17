const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3a6b435d84250f67ed2ced35e923305b&query='+ latitude +','+ longitude +'&units=m'
    request({ url: url, json: true }, (error,response) => {
        if(error) {
            callback('unable to connect', undefined)
        } else if(response.body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast



// const url = 'http://api.weatherstack.com/current?access_key=3a6b435d84250f67ed2ced35e923305b&query=37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('unable to connect')
//     } else if(response.body.error) {
//         console.log('unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
//     }
// })