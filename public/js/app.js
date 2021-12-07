console.log("client side are up!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationNameParagraph = document.getElementById("location-name");
const forecastParagraph = document.getElementById("forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  search.value = "";

  if (location.length <= 1) {
    return;
  }

  locationNameParagraph.textContent = "Loading...";
  forecastParagraph.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.errorMessage) {
          console.log(data.errorMessage);
        } else {
          locationNameParagraph.textContent = data.location;
          forecastParagraph.textContent = data.forecast;
        }
      });
    }
  );
});
