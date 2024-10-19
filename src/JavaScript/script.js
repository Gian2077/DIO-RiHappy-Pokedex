//Armazena a <ol> com o ID pokemonsOl na constante pokemonsOl
const pokemonsOl = document.getElementById('pokemonsOl')
const loadMoreButton = document.getElementById('loadMore')

const limit = 10
let offset = 0;
const maxRecords = 151

function convertPokemonLi(pokemon)
{
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>`
}

//Carrega pokemons na pagina HTML
function loadPokemon(offset, limit)
{
    //.then((pokemonList =[])) recebe a lista de pokemons em um Array chamado pokemonList
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => 
    {
        const newHTML = pokemonList.map(convertPokemonLi).join('')
        pokemonsOl.innerHTML += newHTML
    })
}

//Tras o conteudo da pagina pela primeira vez sem a necessidade de apertar o botão Load More
loadPokemon(offset, limit)

loadMoreButton.addEventListener('click', () =>
{
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords)
    {
        const newLimit = maxRecords - offset
        loadPokemon(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else
    {
        loadPokemon(offset, limit)
    }
})