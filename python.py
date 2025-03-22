from flask import Flask,request, jsonify
import requests
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)

@app.route('/weather', methods=['GET'])
def get_weather():
    # data = request.json  
    # city = data.get("city", "POST")  

    url = "http://api.weatherapi.com/v1/forecast.json?key=27f718bd98e0475e95d135306251303&q=zarqa&days=7&aqi=no&alerts=no"
    response = requests.get(url).json()
    
    data = {
        "city":response["location"]["name"],
        "country":response["location"]["country"],
        "current_temp":round(response["current"]["temp_c"]),
        "chance_of_rain":response["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"],
        "current_is_day":response["current"]["is_day"],
        "current_condition":response["current"]["condition"]["text"],
        "feels_like":round(response["current"]["feelslike_c"]),
        "max_temp":round(response["forecast"]["forecastday"][0]["day"]["maxtemp_c"]),
        "min_temp":round(response["forecast"]["forecastday"][0]["day"]["mintemp_c"])
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

