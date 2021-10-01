const errors = require("restify-errors");
const uuid = require("uuid");

const badRequestErrorMessage = "Invalid column id.";
const columnsData = [
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

const editColumn = (id, name) => {
  const columnToEdit = columnsData.find((column) => column.id === id);

  if (columnToEdit) {
    columnToEdit.name = name;
  }

  return columnToEdit;
};

const deleteColumn = (id) => {
  const columnToDelete = columnsData.find((column) => column.id === id);

  if (!columnToDelete) {
    return null;
  }

  columnsData.splice(columnsData.indexOf(columnToDelete), 1);

  return columnsData;
};

module.exports = (server) => {
  server.get("/columns", (req, res, next) => {
    res.send(columnsData);
    next();
  });

  server.post("/columns", (req, res, next) => {
    const newColumn = createColumn(req.body.name);
    res.send(newColumn);
    next();
  });

  server.put("/columns/:id", (req, res, next) => {
    const editedColumn = editColumn(req.params.id, req.body.name);

    if (editedColumn) {
      res.send(editedColumn);
      next();
    } else {
      return next(new errors.BadRequestError(badRequestErrorMessage));
    }
  });

  server.del("/columns/:id", (req, res, next) => {
    const updatedColumnsData = deleteColumn(req.params.id);

    if (updatedColumnsData) {
      res.send(updatedColumnsData);
      next();
    } else {
      return next(new errors.BadRequestError(badRequestErrorMessage));
    }
  });
};
