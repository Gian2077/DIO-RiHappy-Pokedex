const pokeApi = {}

//Converte detalhes da PokeAPI para um modelo customizado de detalhes sobre o pokemon
function convertToPokeModel(pokeDetail)
{
    //retorna uma instancia nova do pokemon com as informações do modelo customizado 
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//Recebe função para pegar os detalhes do pokemon em formato json
pokeApi.getPokemonDetail = (pokemon) => 
{
    //Transforma lista de pokemons em uma nova lista de promessas com uma lista contendo os detalhes do pokemon
    return fetch(pokemon.url)
            .then((response) => response.json())
            //Retorna Modelo Pokemon customizado
            .then(convertToPokeModel)
}

//pokeApi.getPokemons é uma requisição HTTP para buscar a lista de pokemons na API PokeAPI
pokeApi.getPokemons = (offset = 0, limit = 5) => 
{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    //Cria uma Promise e recebe os dados da URL
    // return fetch busca a lista de pokemons na API
    return fetch(url)
        //Converte a lista de pokemons para json
        .then((response) => response.json())
        //Armazena os resultados do corpo do json
        .then((jsonBody) => jsonBody.results)
        //Converte o resultado encontrado em uma lista de busca dos detalhes
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //Espera todas as Promises na lista de requisições para os detalhes dos pokemons serem resolvidas
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        //Retorna erros no Console
        .catch((error) => console.error(error))
}