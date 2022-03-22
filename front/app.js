const urlConsoles = 'http://localhost:8000/api/consoles/';
const urlGames = 'http://localhost:8000/api/games/';
let consoles = [];
let games = [];

window.onload = async () => {
    init();
}

const init = async () => {
    await getConsoles();
    await getGames();
    printConsoles();
}

const getConsoles = async () => {
    const result = await fetch(urlConsoles);
    const resultjs = await result.json();
    consoles = [...resultjs] 
}

const getGames = async () => {
    const result = await fetch(urlGames);
    const resultjs = await result.json();
    games = [...resultjs]
}

const searchGame = async () =>{
    const valueInput = document.querySelector('.input');
    const filterGames = games.filter(game => (game.name.toUpperCase().includes(valueInput.value.toUpperCase())));
    if (!filterGames.length) {
        document.querySelector('input').value = '';
        window.alert('Ese juego no esta en la lista')
    }   else {
            const gamesList = document.createElement('ul');
            gamesList.className = 'filteredGames'
            const main = document.querySelector('main');
            main.innerHTML = '';
            main.className = 'mainOthers';
            main.appendChild(gamesList)
            for (const game of filterGames) {
                const gameItem = document.createElement('li');
                gameItem.className = 'gameItem';
                gameItem.id = `g${game._id}`
                document.querySelector('.filteredGames').appendChild(gameItem);
                gameItem.innerHTML += `
                    <div class="gameImg">
                    <img src="${game.img}" alt="${game.name}">
                    </div>

            `
            document.querySelector(`#g${game._id}`).addEventListener('click', () => paintGame(game._id));
            }
            document.querySelector('input').value = '';
        }
}

const printConsoles = async () => {
    const listConsoles = document.createElement('ul');
    listConsoles.className = 'consolesList';
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.appendChild(listConsoles);
    main.className = 'consolesMain';
    for (const console of consoles) {
        const consoleItem = document.createElement('li');
        consoleItem.className = 'consoleItem';
        consoleItem.id = `c${console._id}`
        consoleItem.innerHTML = `
            <div onclick="printConsole(${console._id})" class="consoleImg"><img src="${console.img}" alt="${console.name}"> </div>
            <div class="consoleTxt"><h2> ${console.name} </h2> </div>
        `
        document.querySelector('.consolesList').appendChild(consoleItem);
        document.querySelector(`#c${console._id}`).addEventListener('click', () => paintConsole(console._id));
    }
}

const paintConsole = async (id) => {
    for (const console of consoles) {
        if(console._id == id) {
            document.querySelector('main').innerHTML = '';
            const consoleDiv = document.createElement('div');
            consoleDiv.className = 'consoleDiv';
            document.querySelector('main').appendChild(consoleDiv);
            document.querySelector('main').className = 'mainOthers'
            consoleDiv.innerHTML = 
            `<div class="consoleSpecifications">
                <div class="bigConsoleImg">
                    <img src="${console.img}" alt="${console.name}">
                </div>
                <div class="bigConsoleTxt">
                    <p><b>Nombre:</b> ${console.name}</p>
                    <p><b>Año de fabricación:</b> ${console.fabrication}</p>
                    <p><b>Fabricante:</b> ${console.maker}</p>
                    <p><b>Precio:</b> ${console.price}</p>
                    <p><b>Tipo:</b> ${console.type}</p>
                </div>
            </div>
            <div class="consoleGames">
                <ul class="gamesList">
                </ul>
            </div>
            `
            for (const videogame of console.videogames) {
                const game = document.createElement('li');
                document.querySelector('.gamesList').appendChild(game);
                game.className = 'videogame';
                game.id = `g${videogame._id}`
                game.innerHTML = 
                `<div class="videogameImg">
                    <img src="${videogame.img}" alt="${videogame.name}">
                </div>
            `
            document.querySelector(`#g${videogame._id}`).addEventListener('click', () => paintGame(videogame._id));
            }
        }
    }
    
    
}

const paintGame = async (id) => {
    /* const game = await getGame(id); */
    for (const game of games) {
        if(game._id == id) {
            document.querySelector('main').innerHTML = '';
            const gameDiv = document.createElement('div');
            gameDiv.className = 'gameDiv';
            document.querySelector('main').appendChild(gameDiv);
            gameDiv.innerHTML =
            `<div>
                <img src="${game.img}" alt="${game.name}">
            </div>
            <div class="gameText">
                <p><b>Nombre:</b> ${game.name}</p>
                <p><b>Precio:</b> ${game.price}</p>
                <p id="platforms"><b>Plataformas:</b> </p>
                <p><b>Descripción:</b> ${game.description}</p>
            </div>
            `
            for (const platform of game.platform) {
                document.querySelector('#platforms').innerHTML += `${platform} `
            }
        }
    }
    
}

const filterByCategorie = async (categorie) => {
    const main = document.querySelector('main');
    main.className= 'mainOthers'
    main.innerHTML= '';
    const filterTitle = document.createElement('div');
    filterTitle.className = 'filterTitle'
    main.appendChild(filterTitle);
    filterTitle.innerHTML = `<h1>${categorie}</h1>`
    const gamesList = document.createElement('ul');
    gamesList.className = 'filteredGames'
    main.appendChild(gamesList);
    for (const game of games) {
        if (game.categories.includes(categorie)) {
            const gameItem = document.createElement('li');
            gameItem.className = 'gameItem';
            gameItem.id = `g${game._id}`;
            document.querySelector('.filteredGames').appendChild(gameItem);
            gameItem.innerHTML += `
                <div class="gameImg">
                <img src="${game.img}" alt="${game.name}">
                </div>
    
        `
        document.querySelector(`#g${game._id}`).addEventListener('click', () => paintGame(game._id));
        }
    }
}

const filterByPlatform = async (platform) => {
    const main = document.querySelector('main');
    main.className= 'mainOthers'
    main.innerHTML= '';
    const filterTitle = document.createElement('div');
    filterTitle.className = 'filterTitle'
    main.appendChild(filterTitle);
    filterTitle.innerHTML = `<h1>${platform}</h1>`
    const gamesList = document.createElement('ul');
    gamesList.className = 'filteredGames'
    main.appendChild(gamesList);
    for (const game of games) {
        if (game.platform.includes(platform)) {
            const gameItem = document.createElement('li');
            gameItem.className = 'gameItem';
            gameItem.id = `g${game._id}`;
            document.querySelector('.filteredGames').appendChild(gameItem);
            gameItem.innerHTML += `
                <div class="gameImg">
                <img src="${game.img}" alt="${game.name}">
                </div>
    
        `
        document.querySelector(`#g${game._id}`).addEventListener('click', () => paintGame(game._id));
        }
    }
}

