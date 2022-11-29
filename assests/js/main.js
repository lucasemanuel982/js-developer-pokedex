const limit = 5
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

const pokemonOL = document.getElementById("pokemonList")

const loadMoreButton = document.getElementById("loadMoreButton")

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type} ${pokemon.ability}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
        <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}" 
                     alt="${pokemon.name}">
                </>
            </div>
        </li>
        `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


const maxRecords = 15


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords){
        const newLimit = maxRecords -offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit);

    }

})

