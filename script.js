function fetchW(city = "Amman") {
    const apiKey = "27f718bd98e0475e95d135306251303";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=no&alerts=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const parent = document.getElementById("currentHourDiv");
            const rparent = document.getElementById("7dayForcast");
            parent.innerHTML = "";
            rparent.innerHTML = "";

            const cityElement = document.createElement("div");
            const chanceOfRain = document.createElement("div");
            const temp = document.createElement("div");
            const icon = document.createElement("img");

            temp.textContent = Math.round(data.current.temp_c) + "°C";
            chanceOfRain.textContent = "Chance of rain: " + data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
            cityElement.textContent = data.location.name;

            const condition = data.current.condition.text.toLowerCase();
            if (condition.includes("partly cloudy") || condition.includes("overcast"))
                icon.src = 'assets/partly_cloudy.svg';
            else if (condition.includes("clear"))
                icon.src = 'assets/sunny.svg';
            else
                icon.src = 'assets/rainy.png';

            const j = document.createElement("div");
            for (let i = 0; i < 7; ++i) {
                let d = new Date(data.forecast.forecastday[i].date);
                let da = "";
                if (i == 0) da = "Today";
                else {
                    if (d.getDay() == 0) da = "Sun";
                    else if (d.getDay() == 1) da = "Mon";
                    else if (d.getDay() == 2) da = "Tue";
                    else if (d.getDay() == 3) da = "Wed";
                    else if (d.getDay() == 4) da = "Thu";
                    else if (d.getDay() == 5) da = "Fri";
                    else da = "Sat";
                }
                let max = Math.round(data.forecast.forecastday[i].day.maxtemp_c);
                let min = Math.round(data.forecast.forecastday[i].day.mintemp_c);
                j.innerHTML += "<div class='rbarT'><div >" + da + "</div> <div class='rbarTemp'>" + max + "/" + min + "</div></div>";
            }

            icon.classList.add("icon");
            temp.classList.add("temp");
            chanceOfRain.classList.add("chanceOfName");
            cityElement.classList.add("cityName");

            parent.appendChild(icon);
            parent.appendChild(temp);
            parent.appendChild(chanceOfRain);
            parent.appendChild(cityElement);
            rparent.appendChild(j);
        })

}

function getCity() {
    const c = document.getElementById("searchBar");
    const city = c.value.trim();

    if (city) {
        fetchW(city);
    }
}

const c = document.getElementById("searchBar");
c.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getCity();
    }
});


fetchW();
setInterval(() => fetchW(), 3000000);
