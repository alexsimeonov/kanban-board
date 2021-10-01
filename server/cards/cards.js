const errors = require("restify-errors");
const uuid = require("uuid");

const badRequestErrorMessage = "Invalid card id.";
const cardsData = [];

const getCardById = (id) => {
  return cardsData.find((card) => card.id === id);
};

const createCard = (cardData) => {
  const card = { id: uuid.v4(), ...cardData, history: [] };
  cardsData.push(card);
  return card;
};

const editCard = (id, cardData) => {
  let card = getCardById(id);

  if (!card) {
    return null;
  }

  const latestCardHistory = {
    title: card.title,
    description: card.description,
    status: card.status,
  };

  const editedCard = Object.assign(card, cardData);
  editedCard.history.push(latestCardHistory);

  return editedCard;
};

const undoCardChanges = (id) => {
  let card = getCardById(id);

  if (!card) {
    return null;
  }

  card = Object.assign(card, card.history[card.history.length - 1]);
  card.history.pop();
  return card;
};

const deleteCard = (id) => {
  const cardToDelete = getCardById(id);

  if (!cardToDelete) {
    return null;
  }

  cardsData.splice(cardsData.indexOf(cardToDelete), 1);

  return cardsData;
};

module.exports = (server) => {
  server.get("/cards", (req, res, next) => {
    res.send(cardsData);
    next();
  });

  server.get("/cards/:id", (req, res, next) => {
    const card = getCardById(req.params.id);

    if (card) {
      res.send(card);
      next();
    }

    return next(new errors.BadRequestError(badRequestErrorMessage));
  });

  server.post("/cards", (req, res, next) => {
    const card = createCard(req.body);

    res.send(card);
    next();
  });

  server.put("/cards/:id", (req, res, next) => {
    if (req.getQuery()) {
      undoCardChanges(req.params.id);
      res.send(getCardById(req.params.id));
      return next();
    }

    const editedCard = editCard(req.params.id, req.body);

    if (editedCard) {
      res.send(editedCard);
      next();
    }

    return next(new errors.BadRequestError(badRequestErrorMessage));
  });

  server.del("/cards/:id", (req, res, next) => {
    const updatedCardsData = deleteCard(req.params.id);

    if (updatedCardsData) {
      res.send(updatedCardsData);
      next();
    }

    return next(new errors.BadRequestError(badRequestErrorMessage));
  });
};