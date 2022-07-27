const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemoImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttomPrev = document.querySelector(".btn-prev");
const buttomNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const Data = await APIResponse.json();
    return Data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = " ";
  const Data = await fetchPokemon(pokemon);

  if (Data) {
    pokemoImage.style.display = 'block';
    pokemonName.innerHTML = Data.name;
    pokemonNumber.innerHTML = Data.id;
    pokemoImage.src =
      Data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = "";
    searchPokemon = Data.id;
  } else {
    pokemoImage.style.display = 'none';
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = "0";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttomPrev.addEventListener("click", () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
}
});

buttomNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
