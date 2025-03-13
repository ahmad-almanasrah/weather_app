function fetchW() {
    fetch("http://127.0.0.1:5000/weather")
        .then(response => response.json())
        .then(data => {
            const cityElement = document.createElement("div");
            const chanceOfRain = document.createElement("div");
            const temp = document.createElement("div");
            const icon = document.createElement("img");
            const parent = document.getElementById("currentHourDiv");


            temp.textContent = data.current_temp + "°";
            chanceOfRain.textContent = "Chance of rain: " + data.chance_of_rain + "%";
            cityElement.textContent = data.city;

            const condition = data.current_condition.toLowerCase();
            if (condition.includes("partly cloudy") || condition.includes("overcast"))
                icon.src = 'assets/partly cloudy.png';
            else if (condition.includes("clear"))
                icon.src = 'assets/sunny.png';
            else
                icon.src = 'assets/rainy.png';


            icon.classList.add("icon");
            temp.classList.add("temp");
            chanceOfRain.classList.add("chanceOfName");
            cityElement.classList.add("cityName");

            parent.appendChild(icon);
            parent.appendChild(temp);
            parent.appendChild(chanceOfRain);
            parent.appendChild(cityElement);


        })
}

fetchW();