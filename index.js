
const card = document.querySelector(".countries-container");

let countries = [];
let inputResult = "";
let inputValueRange = "250";

const fetchCountries = async (e) => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
};

const displayCountries = async () => {
  await fetchCountries();

  card.innerHTML = countries
    .slice(0, inputValueRange)
    .filter((country) =>
      country.translations.fra.common.toLowerCase().includes(inputResult)
    )

    .map((country) => {
      let flag = country.flags.png;
      let name = country.translations.fra.common;
      let population = country.population;

      capitale = country.capital
        ? (capitale = country.capital[0])
        : (capitale = "Aucune");

      return `
    <li class="card">
        <img src="${flag}">
        <h2>${name}</h2>
        <p>Capital = ${capitale}</p>
        <p>Population = ${population} hab</p>
    `;
    })
    .join("");
};

inputSearch.addEventListener("input", (e) => {
  inputResult = e.target.value;
  displayCountries();
});

inputRange.addEventListener("input", (e) => {
  document.getElementById("rangeValue").innerText = e.target.value;
  inputValueRange = Number(e.target.value);
  displayCountries();
});

displayCountries();
