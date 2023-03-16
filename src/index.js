let form = document.querySelector(".temp-form");
let input = document.querySelector(".form-control");
let city = document.querySelector(".city");
let currentLocationBtn = document.querySelector(".location");
let liDate = document.querySelector(".date");
let currentDate = new Date().toLocaleDateString(`en-US`, { weekday: `long`, hour12: false, hour: `numeric`, minute: `numeric` });
liDate.textContent = currentDate;

form.addEventListener("submit", function (event) {
    event.preventDefault();
    city.innerHTML = input.value;
});

function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    let tempElement = document.querySelector(".temperature");
    tempElement.innerHTML = temperature;
}

function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector(".form-control");
    let city = input.value.trim();
    let apiKey = `0d6ea3645830e009a81b0306f9b9e6b5`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let apiKey = `0d6ea3645830e009a81b0306f9b9e6b5`;
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
            axios.get(apiUrl).then(showWeather);
        },
        function (error) {
            alert(`Could not retrieve location. Error message: ${error.message}`);
        }
    );
}

form.addEventListener("submit", searchCity);
currentLocationBtn.addEventListener("click", getCurrentLocationWeather);