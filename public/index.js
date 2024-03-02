$(document).ready(function () {
  $("#burger").click(function () {
    $("#sidebar").toggleClass("sidebar-open");
    $(".container").toggleClass("container-shift");
    $("#burger").toggleClass("cross");
  });
});

$("#searchCity").keypress(function (event) {
  if (event.which === 13) {
    event.preventDefault();
    if ($("#searchCity").val() === "") {
      alert("Please enter a city");
    } else {
      city = $("#searchCity").val();
      fetchData(city);
    }
  }
});
// const key = "CPFSV8JM96NUGHLF4WPXHZH43";
// const key = "883VRQQVX6F2DB3K29TR7K9XR";
async function fetchData(city = "Lucknow") {
  const key = "FP6U7553EBYTTFR8MDSEG4LCB";
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=${key}&contentType=json`
  );
  const data = await response.json();
  console.log(data);
  const {
    conditions,
    datetime,
    feelslike,
    humidity,
    pressure,
    sunrise,
    sunset,
    temp,
    visibility,
    winddir,
    windspeed,
    tempmax,
    tempmin,
    description,
  } = data.days[0];

  $("#address").text(data.resolvedAddress);
  $("#temp").html(temp + "°C");
  $("#weatherIcon").attr("src", `icons/${conditions}.png`);
  $("#conditions").text(conditions);
  $("#dateTime").text(`Time: ${datetime}`);
  $("#wind").html(
    "<strong>Wind: </strong>" + windspeed + " km/h - " + winddir + "°"
  );
  $("#humidity").html("<strong>Humidity: </strong>" + humidity + "%");
  $("#pressure").html("<strong>Pressure: </strong>" + pressure + " hPa");
  $("#visibility").html(`<strong>Visibility: </strong>${visibility} km`);
  $("#sunrise").html(`<strong>Sunrise: </strong>${sunrise}`);
  $("#sunset").html(`<strong>Sunset: </strong>${sunset}`);
  $("#feelslike").html("<strong>Feels Like: </strong>" + feelslike + "°C");

  $("#sunrise2").html(`<strong>Sunrise: </strong>${sunrise}`);
  $("#sunset2").html(`<strong>Sunset: </strong>${sunset}`);
  $("#max-temp").html("<strong>Max Temp: </strong>" + tempmax + "°C");
  $("#min-temp").html("<strong>Min Temp: </strong>" + tempmin + "°C");
  $("#desc").text(description);

  $("#tableBody").html(
    data.days[0].hours.map((hour) => {
      return `<tr><td>${hour.datetime}</td><td>${hour.temp}°C</td><td>${hour.humidity}%</td><td>${hour.pressure} hPa</td><td>${hour.visibility} km</td><td>${hour.conditions}</td><td>${hour.windspeed} km/h - ${hour.winddir}°</td></tr><tr>`;
    })
  );
}

fetchData();

const printContent = () => {
  const header = document.querySelector(".header");
  header.style.visibility = "hidden";
  window.print();
  header.style.visibility = "visible";
};

const logo = document.querySelector(".logo");
logo.addEventListener("click", function (event) {
  const navbar = document.querySelector(".navbar");
  event.preventDefault();
  navbar.classList.toggle("close");
});
