import $ from 'jquery';
export const devide = (a,b) => (a / b);


export const mainFunction = () => {

    const DOMstrings = {
        $temp: $('#temp'),
        $degrees: $('#degrees'),
        $background: $('html body, .container-fluid'),
        $location: $('#location'),
        $icon: $('#icon'),
        $description: $('#description'),
        $windSpeed: $('#windSpeed'),
        $humidity: $('#humidity'),
        $details: $('.details')
    };

    const images = {
        winterClouds: "winterClouds.jpeg",
        winterSnow: "winterSnow.jpg",
        winterClear: "winterClear.jpg",
        springClouds: "springClouds.jpg",
        springRain: "spring_rain",
        springRain1: "springRain1.jpg",
        springClear: "springClear1.jpg",
        summerClouds: "summerClouds.jpg",
        summerClouds1: "clouds.jpg",
        summerRain: "summerRain.jpg",
        summerClear: "summerClear.jpg",
        summerThunderstorm: "thunderstorm.jpeg",
        autumnRain: "autumn_rain",
        autumnRain1: "autumnRain2.jpg",
        autumnClouds: "autumnclouds.jpg",
        autumnClear: "autumnClear0.jpg",
        default: "default1.jpg"
    };


    // get geolocation
    async function getGeolocation() {
        try {
            const result = await fetch("https://ipapi.co/json/");
            const geo = await result.json();
            // await console.log(JSON.stringify(geo, null, 2));
            await useGeolocationInfo(geo);
        } catch (error) {
            console.error(error);
            // display information about location being unavailable
            DOMstrings.$temp.text('Location information is unavailable.');
        }
    };

    getGeolocation();

    /* old way ---------
        // let geolocationTimeout = setTimeout(function() {
        //     DOMstrings.$temp.text('Location information is unavailable.');
        // }, 8000);


        // $.getJSON('https://ipapi.co/json/', function(data) {
        //     console.log(JSON.stringify(data, null, 2));
        //     if (data.latitude && data.longitude) {
        //         clearTimeout(geolocationTimeout);
        //         useGeolocationInfo(data);
        //     }
        // });

    ------- */

    async function useGeolocationInfo(json) {

        const info = {
            city: json.city,
            state: json.region_code,
            country: json.country_name,
            lat: json.latitude,
            lon: json.longitude,
        };

        // console.log(info)

        if (info.lat && info.lon) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=e005b47d860a06d7e4e18d731fa3e7a4&lat=${info.lat}&lon=${info.lon}&units=metric`);
                const data = await response.json();

                // console.log(JSON.stringify(data, null, 2));

                if (data.cod === 401) {
                    DOMstrings.$temp.text('Failed to load local weather.');
                }

                info.temp = data.main.temp;
                info.humidity = data.main.humidity;
                info.weather = {
                    main: data.weather[0].main,
                    description: data.weather[0].description, //the one we are using
                    wind: data.wind.speed
                };
                info.icon = data.weather[0].icon;
                info.id = data.weather[0].id;

                // console.log(info)
                displayInfo(info);

            } catch (error) {
                console.error(error);
                DOMstrings.$temp.text('Failed to load local weather.')
            };

        } else {
            DOMstrings.$temp.text('Location information is unavailable.');
        }
    }


    let displayInfo = function(allInfo) {
        // console.log(JSON.stringify(allInfo, null, 2));

        if (allInfo.state) {
            DOMstrings.$location.text(`${allInfo.city}, ${allInfo.state}, ${allInfo.country}`);
        } else {
            DOMstrings.$location.text(`${allInfo.city}, ${allInfo.country}`);
        }

        // changeBackground();

        function changeBackground() {
            function setBackground(urlImage) {
                DOMstrings.$background.css('background-image', 'url("css/gallery/' + urlImage + '")');
            };

            switch (true) {
                // winter clouds
                case (allInfo.temp <= 0 && (allInfo.id >= 801 && allInfo.id <= 804)):
                    setBackground(images.winterClouds);
                    break;

                    // winter snow
                case (allInfo.temp <= 0 && (allInfo.id >= 600 && allInfo.id <= 622)):
                    setBackground(images.winterSnow);
                    break;

                    // winter clear
                case (allInfo.temp <= 0 && allInfo.id == 800):
                case (allInfo.temp <= 0):
                    setBackground(images.winterClear);
                    break;

                    // spring clouds
                case ((allInfo.temp > 15 && allInfo.temp < 23) && (allInfo.id >= 801 && allInfo.id <= 804)):
                    setBackground(images.summerClouds);
                    break;

                    // spring rain
                case ((allInfo.temp > 15 && allInfo.temp < 23) && (allInfo.id >= 200 && allInfo.id <= 531)):
                    setBackground(images.summerRain);
                    break;

                    // spring clear
                case ((allInfo.temp > 15 && allInfo.temp < 23) && allInfo.id === 800):
                case (allInfo.temp > 15 && allInfo.temp < 23):
                    setBackground(images.springClear);
                    break;

                    // summer clouds
                case (allInfo.temp > 23 && (allInfo.id >= 801 && allInfo.id <= 804)):
                    setBackground(images.summerClouds);
                    break;

                    // summer thunderstorm
                case ((allInfo.weather.main.toLowerCase() === "thunderstorm") && (allInfo.temp > 23) && (allInfo.id >= 200 && allInfo.id <= 531)):
                    setBackground(images.summerThunderstorm);
                    break;

                    // summer rain
                case (allInfo.temp > 23 && (allInfo.id >= 200 && allInfo.id <= 531)):
                    setBackground(images.summerRain);
                    break;

                    // summer clear
                case (allInfo.temp > 23 && allInfo.id == 800):
                case (allInfo.temp > 23):
                    setBackground(images.summerClear);
                    break;

                    // autumn rain
                case ((allInfo.temp < 15 && allInfo.temp > 0) && (allInfo.id >= 200 && allInfo.id <= 531)):
                    setBackground(images.autumn_rain);
                    break;

                    // autumn clouds
                case ((allInfo.temp < 15 && allInfo.temp > 0) && (allInfo.id >= 801 && allInfo.id <= 804)):
                    setBackground(images.autumnClouds);
                    break;

                    // autumn clear
                case ((allInfo.temp < 23 && allInfo.temp > 0) && allInfo.id == 800):
                case (allInfo.temp < 23 && allInfo.temp > 0):
                    setBackground(images.autumnClear);
                    break;

                default:
                    setBackground(images.default);
            }
        }

        // display weather details
        DOMstrings.$icon.attr('src', 'https://openweathermap.org/img/w/' + encodeURIComponent(allInfo.icon + '.png'));
        DOMstrings.$description.text(allInfo.weather.description);
        DOMstrings.$windSpeed.text('WS ' + (allInfo.weather.wind).toFixed(2) + ' m/s');
        DOMstrings.$humidity.text(`humidity ${allInfo.humidity}%`);
        DOMstrings.$details.fadeIn(2000).css("display", "flex");

        displayTemp();

        function displayTemp() {

            let F = false;
            let C = convert(allInfo.temp, F);
            DOMstrings.$temp.text(C);
            DOMstrings.$degrees.text('\u2103');

            // convert Celsius and Fahrenheit
            function convert(C, F) {
                if (F) return ((C * 1.8) + 32).toFixed(2);
                return C.toFixed(1);
            }

            // toggle between Celsius and Fahrenheit
            DOMstrings.$degrees.on('click', function() {
                F = !F;
                DOMstrings.$temp.text(convert(allInfo.temp, F));
                if (F) {
                    DOMstrings.$degrees.text('\u2109');
                } else {
                    DOMstrings.$degrees.text('\u2103');
                }
            });
        };
    }
}



