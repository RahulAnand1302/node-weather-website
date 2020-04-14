const request = require('request')
const f2c = require('fahrenheit-to-celsius')

const forecast = (latitude , longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5c348cb4d3cff3f1dd2689163e523bf1/' + longitude + ',' + latitude
    
    request({url, json: true}, (error,{body}) => { //body used as shorthand for response.body
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find forecast. Try another search')
        }else{
            callback(undefined, 
                //response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.'
                //Object Destructuring
                body.daily.data[0].summary + ' It is currently ' + Math.round(f2c(body.currently.temperature)) + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            )
        }
    })
}

module.exports = forecast