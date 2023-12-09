import './style.css';


const domEditor = (function() {
    let data = {};
    let day = 0;

    const locationDiv = document.querySelector('.location');
    const conditionDiv = document.querySelector('.condition');
    const temperatureDiv = document.querySelector('.temperature');
    const iconDiv = document.querySelector('.weather-icon');

    const updateValues = () => {
        locationDiv.textContent = data.location;
        conditionDiv.textContent = data.condition;
        temperatureDiv.textContent = data.temp_f
        iconDiv.src = data.icon;

        day = data.is_day;
    }

    function updateData(dataObj) {
        data = dataObj;
        console.log(data);
        updateValues();
    }

    const getData = () => {
        console.log(data);
    }

    return{updateData, getData};

})();


async function getWeatherData(query) {
    try {
        // const response = await fetch('https://api.weatherapi.com/v1/current.json?key=ca6267a41fb3444db0b205826230712&q=' + query + '&days=3&aqi=no&alerts=yes', {mode: 'cors'} );
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=ca6267a41fb3444db0b205826230712&q=' + query + '&days=3&aqi=no&alerts=yes', {mode: 'cors'} );

        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
        
    }
    catch (error) {
        console.log("error");
    }
}

async function cleanWeatherData(query) {
    try {
        const weatherObj = await getWeatherData(query);
        const weather = weatherObj.current;
        const weatherData = {
            location: weatherObj.location.name + " " + weatherObj.location.region,
            condition: weather.condition.text,
            icon: './icon' + weather.condition.icon.substring(34),
            temp_f: weather.temp_f,
            temp_c: weather.temp_c,
            uv: weather.uv,
            wind_dir: weather.wind_dir,
            wind_kph: weather.wind_kph,
            wind_mph: weather.wind_mph,
            humidity: weather.humidity,
            is_day: weather.is_day
        }
        return weatherData;
    }
    catch (error) {
        console.log('error cleaning');
    }

    

}


async function storeWeatherData(query) {
    try {
        const cleanData = await cleanWeatherData(query)
        domEditor.updateData(cleanData);
    }
    catch (error) {
        console.log('error storing data');
    }
}


const searchBar = document.querySelector('#search-bar');
const searchBtn =document.querySelector('.search-btn');
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    storeWeatherData(searchBar.value);;
})

