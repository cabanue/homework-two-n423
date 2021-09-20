function getLocation() {
  $("#submit").click(function (e) {
    e.preventDefault();

    let location = $("#location").val();
    let num = $("#forecast-num").val();
    getWeather(location, num);
  });
}

function getWeather(location, num) {
  $.getJSON(
    `https://api.weatherapi.com/v1/forecast.json?key=e0e19f3926894913a98202937211309&q=${location}&days=${num}&aqi=no&alerts=no
      `,
    function (data) {
      console.log(data);
      $("#content #local").html(
        `
        <div class="current">
          <h1 class="city">${data.location.name}, ${data.location.region}</h1>

          <div class="top">
            <div class="condition">
              <img src="${data.current.condition.icon}" /> 
              <p>${data.current.condition.text}</p>

            </div>

            <div class="temp">
              <h3><u> Current Temp </u> </h3> <h3>${data.current.temp_f} &#176F</h3>
              <p><u> Feels Like </u> </p> <p>${data.current.feelslike_f} &#176F</p>
            </div>
            
          </div>
          
          <div class="columns">

            <div class="column">
              <p><u> Humidity </u></p>
              <p>${data.current.humidity}%</p>
              <p><u>Precipitation</u></p> 
              <p>${data.current.precip_in} in.</p>
              <p><u>Pressure</u></p>
              <p>${data.current.pressure_in} inHg</p>
              <p><u>Uv Index</u></p>
              <p> ${data.current.uv}</p>
            </div>

            <div class="column">
              <p><u>Visibility</u></p>
              <p>${data.current.vis_miles} mi</p>
              <p><u> Sunrise </u></p>
              <p>${data.forecast.forecastday[0].astro.sunrise}</p>
              <p><u>Sunrise</u></p>
              <p> ${data.forecast.forecastday[0].astro.sunset}</p>
            </div>

          </div>

        </div>

        <div class="forecast">
          
        </div>
        `
      );

      if (data.forecast.forecastday.length >= 2) {
        $(".forecast").append(`
        <h1>Forecast</h1>
        <div class="days"></div>`);
        for (var i = 1; i < data.forecast.forecastday.length; i++) {
          $(".days").append(`
          <div class="day">
            <h2 class="title">${data.forecast.forecastday[i].date}</h2>
            <div class="information">
              <div class="day-condition">
                <img src="${data.forecast.forecastday[i].day.condition.icon}">
                <p>${data.forecast.forecastday[i].day.condition.text}</p>
              </div>
  
              <div class="day-temp">
                <p><u>High</u></p>
                <p> ${data.forecast.forecastday[i].day.maxtemp_f} &#176F</p>
                <p><u>Low</u></p>
                <p> ${data.forecast.forecastday[i].day.mintemp_f} &#176F</p>
              </div>
            </div>
  
            <div class="day-columns">
              <div class="day-column">
                <p><u>Chance of rain</u></p>
                <p>${data.forecast.forecastday[i].day.daily_chance_of_rain}%</p>
                <p><u>Preciptation</u></p>
                <p> ${data.forecast.forecastday[i].day.totalprecip_in} in.</p>
              </div>
  
              <div class="day-column">
                <p><u>Average Humidity </u></p>
                <p>${data.forecast.forecastday[i].day.avghumidity}%</p>
                <p><u>Uv Index </u></p>
                <p>${data.forecast.forecastday[i].day.uv}</p>
              </div>
  
            </div>
          </div>
          `);
        }
      } else {
      }
    }
  ).fail(function (e) {
    console.log(e);
  });
}

$(document).ready(function () {
  getLocation();
});
