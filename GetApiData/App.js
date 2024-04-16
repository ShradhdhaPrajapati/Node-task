const geocode = require("./Geocode");
const weather = require("./weather");

const city = process.argv[3];

if (!city) {
    console.log("City name required");
    process.exit; 
}

new Promise((resolve, reject) => {
    geocode.geocodedata(city)
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
})
    .then(data => {
        return new Promise((resolve, reject) => {
            weather.weatherdata(data.lat, data.lng)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    })
    .then(result => {
        console.log(`
            City: ${result.city}
            Lat: ${result.lat}
            Lng: ${result.lng}
            Temp: ${result.temp}
            Pressure: ${result.pressure}
            Humidity: ${result.humidity}
        `);
    })
    .catch(error => {
        console.error("Error:", error);
    });
