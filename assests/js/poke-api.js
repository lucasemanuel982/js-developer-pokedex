const pokeApi = {}

class Pokemon {
    name;
    number;
    type;
    types = [];
    ability;
    abilities = [];
    photo;
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokeDetail.abilities.map((abilitySlot) =>abilitySlot.ability.name )
    const [ability] = abilities

    pokemon.types = types
    pokemon.type = type
    pokemon.ability = ability
    pokemon.abilities = abilities
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch (pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`


    return fetch(url)
        .then((response) => response.json()) 
        .then((jsonBody) => jsonBody.results) 
        .then((pokemonList) => pokemonList.map((pokeApi.getPokemonDetail) ))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}