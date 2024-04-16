const axios = require("axios");

const weatherdata = (lat, lng) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=1b274b6a8139a5eeae5571f298f7258e`)
            .then(response => {
                const data = response.data.main;
                const temp = data.temp;
                const pressure = data.pressure;
                const humidity = data.humidity;
                const city = response.data.name;
                resolve({ city, temp, pressure, humidity, lat, lng });
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports = { weatherdata };
