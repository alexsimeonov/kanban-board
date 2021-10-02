const restify = require("restify");
const columnsService = require("./columns/columns");
const cardsService = require("./cards/cards");

const server = restify.createServer();
const port = 3000;
const url = `http://localhost:${port}`;

server.use(
  restify.plugins.bodyParser({
    mapParams: true,
  })
);
server.use(restify.plugins.queryParser());

server.listen(port, () => {
  console.log(`Server running on ${url}.`);
});

columnsService(server);
cardsService(server);
