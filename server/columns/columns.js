const uuid = require("uuid");

let columnsData = [
  { id: uuid.v4(), name: "To Do" },
  { id: uuid.v4(), name: "In Progress" },
  { id: uuid.v4(), name: "Done" },
];

const createColumn = (name) => {
  const column = {
    id: uuid.v4(),
    name,
  };

  columnsData.push(column);
  return column;
};

const deleteColumn = (id) => {
  columnsData = columnsData.filter((column) => column.id !== id);
  return columnsData;
};

module.exports = (server) => {
  server.get("/columns", (req, res, next) => {
    res.send(columnsData);
    next();
  });

  server.get("/columns/:id", (req, res, next) => {
    res.send(columnsData.find((column) => column.id === req.params.id));
    next();
  });

  server.post("/columns", async (req, res, next) => {
    const newColumn = await createColumn(req.body.name);
    res.send(newColumn);
    next();
  });

  server.del("/columns/:id", (req, res, next) => {
    const updatedColumnsData = deleteColumn(req.params.id);
    res.send(updatedColumnsData);
    next();
  });
};
