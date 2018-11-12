const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/styles.css`);

//js
const main = fs.readFileSync(`${__dirname}/../client/js/main.js`);
const classes = fs.readFileSync(`${__dirname}/../client/js/classes.js`);
const loader = fs.readFileSync(`${__dirname}/../client/js/loader.js`);
const interaction = fs.readFileSync(`${__dirname}/../client/js/interaction.js`);
const utilities = fs.readFileSync(`${__dirname}/../client/js/utilities.js`);
const stateManager = fs.readFileSync(`${__dirname}/../client/js/stateManager.js`);
const player =  fs.readFileSync(`${__dirname}/../client/js/player.js`);
const enemy =  fs.readFileSync(`${__dirname}/../client/js/enemy.js`);
const grid =  fs.readFileSync(`${__dirname}/../client/js/grid.js`);

//media
const termite = fs.readFileSync(`${__dirname}/../client/media/termite.png`);


const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStyles = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(styles);
  response.end();
};

const getJS = (request, response, path) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript'});

  switch(path){
    case '/js/main.js':
      response.write(main);
      break;
    case '/js/classes.js':
      response.write(classes);
      break;
    case '/js/loader.js':
      response.write(loader);
      break;
    case '/js/interaction.js':
      response.write(interaction);
      break;
    case '/js/utilities.js':
      response.write(utilities);
      break;
    case '/js/stateManager.js':
      response.write(stateManager);
      break;
    case '/js/player.js':
      response.write(player);
      break;
    case '/js/enemy.js':
      response.write(enemy);
      break;
    case '/js/grid.js':
      response.write(grid);
      break;
  }

  response.end();
}

const getSprites = (request, response, path) => {
  response.writeHead(200, { 'Content-Type': 'image/png'});

  switch(path){
    case '/media/termite.png':
      response.write(termite);
      break;
  }

  response.end();
}

module.exports = {
  getIndex,
  getStyles,
  getJS,
  getSprites
};
