const card = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");

let countries = [];
let inputResult = "";
let inputValueRange = "250";
let cards = [];

let sortFunct = "alpha";

const fetchCountries = async (e) => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
};

const displayCountries = async () => {
  await fetchCountries();

  card.innerHTML = countries
    .sort((a, b) => {
      if (sortFunct === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      } else if (sortFunct === "minToMax") {
        return b.population - a.population;
      } else {
        return a.population - b.population;
      }
    })
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
        <h3>${capitale}</h3>
        <p>Population : ${population.toLocaleString()} hab</p>
    `;
    })
    .join("");
};

displayCountries();

inputSearch.addEventListener("input", (e) => {
  inputResult = e.target.value.toLowerCase();
  displayCountries();
});

inputRange.addEventListener("input", (e) => {
  document.getElementById("rangeValue").innerText = e.target.value;
  inputValueRange = Number(e.target.value);
  displayCountries();
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortFunct = e.target.id;
    displayCountries();
  });
});
