// Fetches current weather and forecast weather data for a given city.
function getWeather() {
    const apiKey = '1bc9445cd07635254608bf102f53dfa8';
     const city = document.getElementById('city').value;


    // Check if city is empty
    if (!city) {
        alert('Please enter the city name');
        return;
    }

    // Construct URLs for current weather and forecast weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayWeather(data);
        })
        .catch((error) => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again');
        });

    // Fetch forecast weather data
    fetch(forecastWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayHourForecast(data.list);
        })
        .catch((error) => {
            console.error('Error fetching forecast weather data:', error);
            alert('Error fetching forecast weather data. Please try again');
        });
}

// Displays the current weather information on the webpage.
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    // Check if the city is not found
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const temperatureHTML = `<p>${temperature}&#176;C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.margin= '10px';

        tempDivInfo.style.color = 'white';


        // Change body image based on weather description
        const body = document.querySelector('body');
        if (description.includes('clear')) {
            body.style.backgroundImage = 'url("https://images.pexels.com/photos/5745683/pexels-photo-5745683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
        } else if (description.includes('clouds')) {
                body.style.backgroundImage = 'url("https://images.pexels.com/photos/20641784/pexels-photo-20641784/free-photo-of-white-dense-cloud-in-sky.jpeg?auto=compress&cs=tinysrgb&w=600")';
        } else if (description.includes('rain')) {
            body.style.backgroundImage = 'url("https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
        } else if (description.includes('thunderstorm')) {
            body.style.backgroundImage = 'url("https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
        } else if (description.includes('snow')) {
            body.style.backgroundImage = 'url("https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=600")';
        } else if (description.includes('dizzel')) {
            body.style.backgroundImage = 'url("https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
        } else if (description.includes('mist')) {
            body.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQGJ8jn0Sbp9_SzqG1AXmj8pAhkZhFuI2wg&s")';
        
        
        } else {
            body.style.backgroundImage = 'linear-gradient(to bottom, rgb(51, 211, 211), rgb(13, 121, 215))';
        }
    }
}

// Displays the hourly forecast weather information on the webpage.
function displayHourForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    // Get the next 8 hours of forecast data
    const next8Hours = hourlyData.slice(0, 8);

    // Iterate over each hour and display the forecast information
    next8Hours.forEach((item) => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="hourly Weather Icon">
            <span>${temperature}&#176;C</span>
            </div>`;
      

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
        
    });
}

// Displays the weather icon on the webpage.
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
    weatherIcon.style.margin = 'auto';
   weatherIcon.style.width='100%';
    weatherIcon.style.height = '100%';
}

showImage(); // Call the showImage() function to display the weather icon.


