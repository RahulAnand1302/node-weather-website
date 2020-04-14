const express = require('express')
const path = require('path')
const hbs = require('hbs')  //only to write partials for advanced templating

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Rahul Anand'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Rahul Anand'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Rahul Anand',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is 22 degree out here',
    //     location: 'Bangalore',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) =>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({        
        products:[]
    })
})

app.get('/help/*' , (req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Rahul Anand',
        errorMessage: 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Rahul Anand',
        errorMessage: 'Page not found'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port)
})