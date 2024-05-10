const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const { connect } = require("http2");
const PORT = 3000; 
const geocode = require("./utill/geocode");
const weather = require("./utill/weather");


const partialpath = path.join(__dirname,"templets/partial");
const viewspath = path.join(__dirname,"templets/views");

app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialpath);

app.get('/',(req,resp)=>{
    resp.render("index")
})

app.get('/home',(req,resp)=>{
    resp.render("home", {"name":"shradhdha"})
})
app.get('/about',(req,resp)=>{
    resp.render("about")
})
app.get('/contact',(req,resp)=>{
    resp.render("contact")
})
app.get('/weather',(req,resp)=>{

    const location = req.query.location
    geocode.geocodedata(location,(data,err)=>{

        if(err)
            console.log(err);
           
        
        weather.weatherdata(data.lat,data.lng, (result,err)=>{
    
            resp.send({
            
            "City" : result.city,
            "Lat" : data.lat,
            "Lng" : data.lng,
            "Temp" : result.temp,
            "Pressure" : result.pressure,
            "Humidity" : result.humidity
            
            });
        })   
    
    })
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})

