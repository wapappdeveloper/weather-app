(function () {
    let tempConsole = document.getElementById('temp-console');
    tempConsole.style.display = 'none';
    console.log('weather app initiated');

    /**
     * @name kelvinToCelcius
     * @description convert kelvin temperature to Celcius
     * @param {*} valNum 
     * @returns 
     */
    function kelvinToCelcius(valNum) {
        valNum = parseFloat(valNum);
        return valNum - 273.15;
    }

    /**
     * @name weatherFunction
     * @description take coordinates of location and call api to get info
     */
    function weatherFunction() {
        navigator.geolocation.getCurrentPosition(function (position) {

            var currentLat = position.coords.latitude;
            var currentLon = position.coords.longitude;

            var APIkey = "e3f56fc0e0b6c6bde655980748da537b";

            var getURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + currentLat + "&lon=" + currentLon + "&APPID=" + APIkey;

            callAPI((response) => {
                let obj = JSON.parse(response);
                console.log(obj);
                console.log(obj.name, obj.sys.country);
                console.log(obj.weather[0].main, kelvinToCelcius(obj.main.temp));
                let city = obj.name;
                let country = obj.sys.country;
                let temp = kelvinToCelcius(obj.main.temp);
                temp = Math.ceil(temp);
                let climate = obj.weather[0].main;
                let loader = document.getElementById('loader');
                loader.style.display = 'none';
                feedContent(city, country, temp, climate);
                tempConsole.style.display = 'block';
            }, getURL);
        });
    };

    /**
     * @name callAPI
     * @description take url of api and send http request
     * @param {Function} callback
     * @param {String} url
     */
    function callAPI(callback, url) {
        var xobj = new XMLHttpRequest();
        xobj.open('GET', url, true);

        xobj.setRequestHeader("Access-Control-Allow-Origin", "*")
        xobj.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
        xobj.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
        // xobj.setRequestHeader('Access-Control-Allow-Origin', '*');
        xobj.setRequestHeader('Content-Type', 'application/json');
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    /**
     * @name feedContent
     * @description change the inner text of elements with data
     * @param {String} cityName
     * @param {String} countryName
     * @param {Number} tempValue
     * @param {String} climateStatus
     */
    function feedContent(cityName, countryName, tempValue, climateStatus) {
        let city = document.getElementById('city');
        let country = document.getElementById('country');
        let temp = document.getElementById('temp-value');
        let climate = document.getElementById('climate');
        city.innerText = cityName;
        country.innerText = countryName;
        temp.innerText = tempValue;
        climate.innerText = climateStatus;
    }

    weatherFunction();

})();