const axios = require('axios');

async function getTimeForLocation(location) {
    return new Promise (async(resolve,reject)=>{

     const apiKey = '2c5ca7ae01e344c79b4fee5d6a1b8acc'; 
    const url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${location}`;

    try {
        const response = await axios.get(url);
        dt = response.data
       

        resolve({
            city: dt.geo.location,
            date: dt.date_time_ymd,
            time_24: dt.time_24,
            timezone: dt.timezone,
            date_time_wti:dt.date_time_wti
        });
    } catch (error) {
        console.error('Error fetching time:', error.message);
        throw error;
    }
})
}

module.exports = {getTimeForLocation};