const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const columnsService = require('./columns/columns');
const cardsService = require('./cards/cards');

const server = restify.createServer();
const port = 3000;
const url = `http://localhost:${port}`;

server.use(
  restify.plugins.bodyParser({
    mapParams: true,
  }),
);

server.use(restify.plugins.queryParser());

const cors = corsMiddleware({
  origins: ['http://localhost:3001'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.listen(port, () => {
  console.log(`Server running on ${url}.`);
});

columnsService(server);
cardsService(server);
