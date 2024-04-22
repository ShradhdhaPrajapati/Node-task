var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "UXF2OHQ2WjBMT1Y5Q05MQzVhNE1sT3VJSk02Y3BaNzlRNHRVMHRjZA==");
    
    var requestOptions = {
       method: 'GET',
       headers: headers,
       redirect: 'follow'
    };
    
//country data
const getAllCountries = ()=>{
 
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.json())
    .then(result=>{

        var options = "";
        for(var i=0;i<result.length;i++)
        {
            options = options+"<option value="+result[i].iso2+">"+result[i].name+"</option>"
        }
        country.innerHTML=options

    })
    .catch(error => console.log('error', error));
}

//for state data

var countrycode
const getallState = (ccode)=>{

    countrycode = ccode
    fetch(`https://api.countrystatecity.in/v1/countries/${ccode}/states`, requestOptions)
    .then(response => response.json())
    .then(result=>{

        var options = "";
        for(var i=0;i<result.length;i++)
        {
            options = options+"<option value="+result[i].iso2+">"+result[i].name+"</option>"
        }
        state.innerHTML=options

    })
    .catch(error => console.log('error', error));
}


//city data
var statecode
const getallcity = (scode)=>{

    statecode = scode
    fetch(`https://api.countrystatecity.in/v1/countries/${countrycode}/states/${scode}/cities`, requestOptions)
    .then(response => response.json())
    .then(result=>{

        var options = "";
        for(var i=0;i<result.length;i++)
        {   
          
            options = options+"<option value="+result[i].name+">"+result[i].name+"</option>"
        }
        city.innerHTML=options

    })
    .catch(error => console.log('error', error));
}
   

//country and state by city data

const worldclockdata = (cityname)=>{

    var location = cityname+","+statecode+","+countrycode
    
    
    fetch(`worldclock?city=${location}`).then(data=>{
        return data.json()
    }).then(result=>{     

        mycity.innerHTML = result.City
        mydate.innerHTML=result.date
        mytime_24.innerHTML =  result.time_24
        mytimezone.innerHTML =result.timezone  

    }).catch(err=>{
        console.log(err);
    })


}