const axios = require("axios");

const geocodedata = (city) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=2260aa7118184cc18eab9d4f006c4ab1`)
            .then(response => {
                const data = response.data.results[0].geometry;
                const lat = data.lat;
                const lng = data.lng;
                resolve({ lat, lng });
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports = { geocodedata };
