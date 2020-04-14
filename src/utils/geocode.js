const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoicmFodWwtYW5hbmQiLCJhIjoiY2s4MWhqem01MG5qajNscnV5eWVhaGJ3OCJ9.LQrF4Fj2YYkAPVKj6Z1pEA&limit=1'
  
    request({url, json: true},(error,{body})=>{
       if (error){
               callback('Unable to connect to geocode service')
       }else if(body.features.length === 0){
               callback('Unable to find location. Try another search')
       }else{
               callback(undefined,{
                   "longitude" : body.features[0].center[1],  //response.body.features[0].center[1],
                   "latitude"  : body.features[0].center[0],
                   "location"  : body.features[0].place_name
               })
       }
   })
   
   }
   
   module.exports = geocode