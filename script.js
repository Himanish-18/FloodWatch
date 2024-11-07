async function fetchWeather() {
    const city = document.getElementById("citySelect").value;
    if (city === "none") {
        document.getElementById("weatherDetails").classList.add("hidden");
        return;
    }

    const apiKey = "ba5a8cd1f3216cbd44c918f8952e99e4";  // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        // Extract necessary details
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Update HTML elements
        document.getElementById("cityName").textContent = city;
        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("description").textContent = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
        document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeed} km/h`;

        document.getElementById("weatherDetails").classList.remove("hidden");

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
    }
}
