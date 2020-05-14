const request = require('postman-request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoibG9vdHBpeiIsImEiOiJja2E1cTd0NHIwMzRoM25venlwZnRodXo2In0.5OyG3CrihY31p-Fn4tttAg&limits=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect Internet', undefined)
        } else if (body.features.length === 0) {
            callback('Please check your query', undefined)
        } else {
                const longitude = body.features[0].center[1]
                const laditude = body.features[0].center[0]
                const location = body.features[0].place_name
            callback(undefined, {
                longitude,
                laditude,
                location
            })
        }
    })
}

module.exports = geocode