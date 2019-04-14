window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let tempSection=document.querySelector(".temperature");
    const temperatureSpan=document.querySelector(".temperature span");
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>{
            // console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/c4f0765ba0a3909ea792bb334a5f694b/${lat},${long}`;

            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                 // short of data.currently.temperature;
                const {temperature,summary,icon} = data.currently;
                //set DOM Elements from the API
                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent=summary;
                locationTimezone.textContent=data.timezone;
                //Formula for conversion
                let celsius=(temperature-32)*(5/9);
                //set Icon
                setIcons(icon,document.querySelector(".icon"));
                
                //change temp to celsius/farenheit
                tempSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent=="F"){
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent=Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent=temperature;
                    }
                })
            });
        });
    }

    function setIcons(icon,iconID){
        const skycons=new Skycons({color:"white"});
        const currrentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currrentIcon]);
    }
});