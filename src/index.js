let form = document.querySelector(".temp-form");
let input = document.querySelector(".form-control");
let city = document.querySelector(".city");
let currentLocationBtn = document.querySelector(".location");
let liDate = document.querySelector(".date");
let weatherIcon = document.querySelector(".temp-icon");
let apiKey = `ac790ft09bcaba4543326a24oe917e8b`;
let weatherEndpoint = `https://api.shecodes.io/weather/v1/current`;
let tempElement = document.querySelector(".temperature");
let conditionElement = document.querySelector(".condition");
let humidityElement = document.querySelector(".description li:nth-child(1)");
let windElement = document.querySelector(".description li:nth-child(2)");


form.addEventListener("submit", function (event) {
    event.preventDefault();
    city.innerHTML = input.value;
});

function showWeather(response) {
    let temperature = Math.round(response.data.temperature.current);
    city.innerHTML = `${response.data.city}, ${response.data.country}`;
    tempElement.innerHTML = temperature;

    let condition = response.data.condition.description;
    conditionElement.innerHTML = condition;

    let iconUrl = response.data.condition.icon_url;
    weatherIcon.setAttribute("src", iconUrl);

    let humidity = response.data.temperature.humidity;
    let wind = response.data.wind.speed;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `Wind: ${wind}km/h`;
    
    let currentTimestampinSeconds = response.data.time;
    let currentTimestampinMilliseconds = currentTimestampinSeconds * 1000;
    let currentDate = new Date(currentTimestampinMilliseconds).toLocaleDateString(`en-US`, { weekday: `long`, hour12: false, hour: `numeric`, minute: `numeric` });
    liDate.textContent = currentDate;
}

function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector(".form-control");
    let city = input.value.trim();
    let apiUrl = `${weatherEndpoint}?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let apiUrl = `${weatherEndpoint}?lat=${lat}&lon=${long}&key=${apiKey}&units=metric`;
            axios.get(apiUrl).then(showWeather);
        },
        function (error) {
            alert(`Could not retrieve location. Error message: ${error.message}`);
        }
    );
}

form.addEventListener("submit", searchCity);
currentLocationBtn.addEventListener("click", getCurrentLocationWeather);

let celsiusBtn = document.querySelector("#celsius-btn");
let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
let temperatureElement = document.querySelector(".temperature");

function convertToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

function convertToCelsius(temperature) {
    return (temperature - 32) * 5 / 9;
}

function updateTemperatureUnits(event) {
    let currentTemperature = Number(temperatureElement.textContent);
    if (event.target.id === "celsius-btn") {
        temperatureElement.textContent = Math.round(convertToCelsius(currentTemperature));
    } else if (event.target.id === "fahrenheit-btn") {
        temperatureElement.textContent = Math.round(convertToFahrenheit(currentTemperature));
    }
}

window.addEventListener("load", getCurrentLocationWeather);
celsiusBtn.addEventListener("click", updateTemperatureUnits);
fahrenheitBtn.addEventListener("click", updateTemperatureUnits);