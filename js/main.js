
const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon =  document.getElementById('nombrePokemon');
const botonBuscar = document.getElementById('buscarPokemon');
const botonBorrar = document.getElementById('borrarPokemon');
const appNode = document.getElementById('app');

//se busca para pc
botonBuscar.addEventListener('click', insertarPokemon)
//se busca para Celular
botonBuscar.addEventListener('touchstart', insertarPokemon)

botonBorrar.addEventListener('click', borrarPokemon)
botonBorrar.addEventListener('touchstart', borrarPokemon)


function insertarPokemon(){
    window.fetch(`${url}${pokemon.value.toLowerCase()}`)
    .then(response => {
        if (response.status == 4004) {
            alert("este pokemon no esta disponible, intentar con otro");
        }else{
            return response.json()
        }
    })
    .then(responseJSON =>{
        const allItems = []
        const resultado = []

        for (let pokemonInfo in responseJSON){
            resultado.push([pokemonInfo , responseJSON[pokemonInfo]])
        }
        console.table(resultado);
        //creando la img

        const pokemonImagen = document.createElement('img')
        pokemonImagen.src = resultado[14][1].front_default

        //Nombre + ID
        const pokemonNombre = document.createElement('h2')
        pokemonNombre.innerText = `N.${resultado[6][1]} 
        ${resultado[10][1]}  `
        
        //TIpo de pokemon
        const pokemonTipo = document.createElement('h2');
        pokemonTipo.innerText = `Tipo: ${resultado[16][1][0].type.name} `

        //contenedor
        const container = document.createElement('div');
        container.append(pokemonImagen,pokemonNombre,pokemonTipo)
        allItems.push(container)

        appNode.append(...allItems)
        // Estilo de pokedesJS
        container.style.backgroundColor="rgb(233, 230, 230)";
        container.style.borderRadius="5px";
        container.style.height="25rem";
        container.style.width="18rem";
        container.style.marginLeft="11%";
        container.style.marginTop="3%";
        pokemonImagen.style.width="300px";
        pokemonImagen.style.height="300px";
        pokemonImagen.style.marginTop="-30px";
        pokemonTipo.style.fontFamily='Roboto', sans-serif;
        pokemonTipo.style.fontSize="12px";

        
    })
}

function borrarPokemon(){
    let allPokemon = appNode.childNodes //lista de nodos
    allPokemon = Array.from(allPokemon)

    allPokemon.forEach(pokemon =>{
        pokemon.remove(pokemon)
    })
}


//scroll Infinito

