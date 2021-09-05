const main = ()=>{
    const mainContainer = document.querySelector('.pokemon-container');
    //botones para paginación
    const prev = document.querySelector('#previous');
    const next = document.querySelector('#next');

    //botones para el cambio en generacion
    const gens = document.querySelectorAll('.gens');
    //arreglo para el cambio de generaciones
    const pokeregionOffset = [1,152,252,387,494,650,722,810];
        
    //valores base de paginacion
    let offset = 1;
    let limit = 8;
    //eliminador de nodos
    const rmChildNodes = (parent)=>{
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    //cambiador de offset
    const offsetHandler = (newValue)=>{
        offset = newValue;
        rmChildNodes(mainContainer);
        fetchPokemons(offset,limit);
    }
    //Se añaden los eventlisteners a cada generacion
    gens.forEach((gen,i)=>gen.addEventListener('click',()=>{
        offsetHandler(pokeregionOffset[i]);
    }));

    //se asigna un eventlistener para el cambio de valor en paginacion
    prev.addEventListener('click',()=>{
        if(offset!=1) offsetHandler(offset-9);
    });
    next.addEventListener('click',()=>{
        offsetHandler(offset+9);
    });
    const fetchPoke = (id)=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=> res.json()).then(data=>createPokeCard(data));
    }

    const fetchPokemons = (offset,limit)=>{
        for (let i = offset; i <= offset+limit; i++) {
            fetchPoke(i);       
        }
    };

    const createPokeCard=(pokemon)=>{
        //Se crea la card
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        //Se crea el contenedor de la imagen
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        //Se crea la etiqueta de la imagen con su src
        const image = document.createElement('img');
        image.src = pokemon.sprites.front_default;
        //Se añade la imagen a su contenedor
        imgContainer.appendChild(image);
        //Se crea el parrafo del numero del pokemon
        const pokeNumber = document.createElement('p');
        pokeNumber.textContent = `#${pokemon.id.toString().padStart(3,0)}`;
        //Se crea el parrafo del nombre
        const pokeName = document.createElement('p');
        pokeName.classList.add('name');
        pokeName.textContent = pokemon.name;
        card.appendChild(imgContainer);
        card.appendChild(pokeNumber);
        card.appendChild(pokeName);

        mainContainer.appendChild(card);
    }
    
    fetchPokemons(offset,limit);
}

document.addEventListener('DOMContentLoaded',main);