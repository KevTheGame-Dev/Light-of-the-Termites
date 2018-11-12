const http = require('http');
const url = require('url');
const fileHandler = require('./fileResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedURL = url.parse(request.url);
  console.log(parsedURL);
  let temp = parsedURL.query;
  let params = {};
  if (temp != null) {
    temp = temp.split('=');
    params = { videoID: `${temp[1]}` };
    console.log(params);
  }

  switch (parsedURL.pathname) {
    case '/':
      fileHandler.getIndex(request, response);
      break;
    case '/styles.css':
      fileHandler.getStyles(request, response);
      break;
    case '/js/main.js':
    case '/js/classes.js':
    case '/js/loader.js':
    case '/js/interaction.js':
    case '/js/utilities.js':
    case '/js/stateManager.js':
    case '/js/player.js':
    case '/js/enemy.js':
    case '/js/grid.js':
      fileHandler.getJS(request, response, parsedURL.pathname);
      break;
    case '/media/termite.png':
      fileHandler.getSprites(request, response, parsedURL.pathname);
      break;
    default:
      fileHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
