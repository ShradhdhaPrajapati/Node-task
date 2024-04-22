const express = require('express');
const app = express(); 
const PORT = 8000;
const path = require("path")
const hbs = require("hbs")// using hbs path
const { getTimeForLocation } = require("./utill/worldclock");

const viewpath = path.join(__dirname,"templates/views")
const partialpath = path.join(__dirname,"templates/partials")
const publicpath = path.join(__dirname,"public")

app.use(express.static(publicpath))
app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialpath)

app.get("/", (req, resp) => {
    resp.render("index");
});

app.get("/home",(req,resp)=>{
    // resp.render("home",{"name":"to the worldclockapp"})
    resp.render("home")
})
//timezone code


app.get("/worldclock", async (req, resp) => {
    const location = req.query.city;
    try {
        const result = await getTimeForLocation(location);
        resp.render("index", {
            city: result.city,
            date: result.date,
            time_24: result.time_24,
            timezone: result.timezone
        });
    } catch (error) {
        console.error(error);
        resp.render("home", { error: "Unable to fetch time information" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on : ${PORT}`);
});
