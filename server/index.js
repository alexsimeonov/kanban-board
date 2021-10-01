const restify = require("restify");

const server = restify.createServer();

const port = 3000;
const url = `http://localhost:${port}`;

server.listen(port, () => {
  console.log(`Server listening on ${url}.`);
});
