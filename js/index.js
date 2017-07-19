var API_KEY = "cbd51bedb802c8e486a12ffafa80c3a9";
var cel = false;
var wd;

function displayTemp(fTemp, c) {
  if (c) return Math.round((fTemp - 32) * (5 / 9)) + "&deg C";
  return Math.round(fTemp) + "&deg F";
}

function render(wd, cel) {
  console.log(wd);
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTemp(wd.main.temp, cel);
  var high = wd.main.temp_max;
  var low = wd.main.temp_min;
  var icon = wd.weather[0].icon;

  $("#currentLocation").html(currentLocation);
  $("#currentWeather").html(currentWeather);
  $("#currentTemp").html(currentTemp);

  var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
  $('#currentTemp').prepend('<div><img class="wicon" src="' + iconSrc + '"></div>');
}

$(function() {

  var loc;
  $.getJSON('https://ipinfo.io', function(d) {
    loc = d.loc.split(",");
    console.log(loc);

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' +
      loc[0] + '&lon=' + loc[1] + '&appid=' + API_KEY,
      function(apiData) {
        wd = apiData;

        render(apiData, cel);

        $('#toggle').click(function() {
          cel = !cel;
          render(wd, cel);
        })
      })

    // call the weather API

  })
})