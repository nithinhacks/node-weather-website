const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibml0cm9tYW4iLCJhIjoiY2tvbXZhaTJhMDk5MDJvcW5ndHJvcTVjaSJ9.yW6qIWtXBZEiDagPkAY_jw&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if(response.body.features.length === 0) {
            callback('no location found', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode



// geocoding 

// const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibml0cm9tYW4iLCJhIjoiY2tvbXZhaTJhMDk5MDJvcW5ndHJvcTVjaSJ9.yW6qIWtXBZEiDagPkAY_jw&limit=1'

// request({ url: url1, json: true }, (error, response) => {

//     if (error) {
//         console.log('unable to connect')
//     } else if (response.body.features.length === 0) {
//         console.log('no location found')
//     } else {
//         console.log('lat & lon: '+ response.body.features[0].center[1]+' & '+ response.body.features[0].center[0])
//     }
// })