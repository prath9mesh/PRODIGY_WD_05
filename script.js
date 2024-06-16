document.getElementById('theme-switch').addEventListener('change', function() {
    if (this.checked) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

function enableDarkMode() {
    document.body.classList.add('dark');
    saveThemePreference('dark');
}

function enableLightMode() {
    document.body.classList.remove('dark');
    saveThemePreference('light');
}

function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
        document.getElementById('theme-switch').checked = true;
    } else {
        enableLightMode();
        document.getElementById('theme-switch').checked = false;
    }
}

function fetchWeatherData(location) {
    const apiKey = '5e02fd6dfeb1e3e7fbc35b2c7a3108c0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                displayError('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('Ouch! ,An error occurred, Please Enter Correct Location ');
        });
}

function displayWeatherData(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherIcon = getWeatherIcon(data.weather[0].id);
    document.getElementById('weather-icon').className = `wi ${weatherIcon}`;
    document.getElementById('weather-icon').style.display = 'block';

    document.getElementById('error-message').textContent = '';
}

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return 'wi-thunderstorm';
    } else if (weatherId >= 300 && weatherId < 500) {
        return 'wi-sprinkle';
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'wi-rain';
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'wi-snow';
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'wi-fog';
    } else if (weatherId === 800) {
        return 'wi-day-sunny';
    } else if (weatherId > 800 && weatherId < 900) {
        return 'wi-cloudy';
    } else {
        return 'wi-na';
    }
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('location').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
    document.getElementById('weather-icon').style.display = 'none';
}

document.getElementById('fetch-weather').addEventListener('click', function() {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        displayError('Please enter a location');
    }
});

loadThemePreference();
