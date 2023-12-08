import './style.css';

async function getWeatherData(query) {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=ca6267a41fb3444db0b205826230712&q=' + query, {mode: 'cors'} );
        const weatherData = await response.json();
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
            wind_dir: weather.wind_dir
        }
        return weatherData;
    }
    catch (error) {
        console.log('error cleaning');
    }

    

}


async function addToDom(query) {
    try {
        const weather = await cleanWeatherData(query);
        console.log(weather);

        iconDiv.src = weather.icon;
        locationDiv.innerHTML = "Location: " + weather.location;
        weatherDiv.innerHTML = "Weather: " + weather.condition;
        temperatureDiv.innerHTML = "Temperature: " + weather.temp_f;
        
    }
    catch (error) {
        console.log('error getting object')
    }
}

const searchBar = document.querySelector('#search-bar');

const searchBtn =document.querySelector('.search-btn');
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addToDom(searchBar.value);

})


const locationDiv = document.querySelector('.location');
const weatherDiv = document.querySelector('.weather');
const temperatureDiv = document.querySelector('.temperature');
const iconDiv = document.querySelector('.weather-icon');

addToDom('50401');



