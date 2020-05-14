const request = require('postman-request')

const forecast = (longitude, laditude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e44273a8c1d493b4a47b7bb54550dbdf&query='+longitude+','+laditude+'&units=m'
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect Internet!', undefined)
        } else if (body.error) {
            callback('Please check your query.', undefined)
        } else {
            const summary = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            callback(undefined, {
                summary,
                temperature
            })
        }
    })
}

module.exports = forecast