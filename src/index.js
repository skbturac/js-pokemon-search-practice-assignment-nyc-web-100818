document.addEventListener('DOMContentLoaded', () => {
  //YOUR CODE HERE
  const searchBox = document.getElementById('pokemon-search-input')
  const pokemonContainer = document.querySelector('#pokemon-container center')
  const pokemonURL = 'http://localhost:3000/pokemon'

  let allPokemonData = []

  fetch(pokemonURL, { method: 'GET' })
    .then(function(responseObject) {
      console.log(responseObject)
      return responseObject.json()
    })
    .then(function(parsedPokemonJSON) {
      allPokemonData = parsedPokemonJSON
      console.table(parsedPokemonJSON)

      parsedPokemonJSON.forEach(function(pokemonObj) {
        pokemonContainer.innerHTML += `
        <div class="pokemon-container">
        <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pokemonObj.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img data-id="${pokemonObj.id}" data-action="flip" class="toggle-sprite" src="${pokemonObj.sprites.front}">
            </div>
          </div>
        </div>
      </div>`
    }) //parsedPokemonJSON.forEach(function(pokemonObj) ENDS HERE

    }) //.then(function(parsedPokemonJSON) ENDS HERE

    searchBox.addEventListener('input', function(event) {
      const userSearchTerm = event.target.value
      const filteredPokemon = allPokemonData.filter(function(pokemonObjec) {
        return pokemonObjec.name.includes(userSearchTerm)
      })
      const pokemonHTML = filteredPokemon.map(function(pokemonObject) {
        return `
        <div class="pokemon-container">
        <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pokemonObject.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img data-id="${pokemonObject.id}" data-action="flip" class="toggle-sprite" src="${pokemonObject.sprites.front}">
            </div>
          </div>
        </div>
      </div>`
    }).join('') // filteredPokemon.map(function(pokemonObject) ENDS HERE
      pokemonContainer.innerHTML = pokemonHTML
    }) //searchBox.addEventListener('input', function(event) ENDS HERE

    pokemonContainer.addEventListener('click', function(event) {
      if (event.target.dataset.action === 'flip') {
        const clickedPokemon = allPokemonData.find(function(pokemonObjectt) {
          return pokemonObjectt.id == event.target.dataset.id
        })
        if (event.target.src === clickedPokemon.sprites.front) {
          event.target.scr = clickedPokemon.sprites.back
        } else {
          event.target.scr = clickedPokemon.sprites.front
        }
      }
    })

}) //document.addEventListener('DOMContentLoaded', () ENDS HERE
