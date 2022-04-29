// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const card = document.querySelector(".countries-container");

let countries = [];

const fetchCountries = async (e) => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));

  console.log(countries);
};

const displayCountries = async () => {
  await fetchCountries();

  card.innerHTML = countries.map((country) => {
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
  }).join("");
};

displayCountries();
