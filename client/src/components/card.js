import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdUndo, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import { actionCreators } from '../state/index';

const CardContainer = styled.div`
width: 90%;
height: 150px;
background-color: transparent;
border: 1px solid #0EB1D2;
margin-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
`;

const Row = styled.div`
margin: 5px;
display: flex;
justify-content: space-between;
align-items: center;
`;

const Title = styled.input`
background-color: transparent;
width: 50%;
height: 15px;
border: 1px solid #0EB1D2;
`;

const Description = styled.textarea`
background-color: transparent;
width: 95%;
height: 40px;
resize: none;
border-color: #0EB1D2;
`;

const Status = styled.select`
width: 50%;
cursor: pointer;
min-width: 100px;
border-color: #0EB1D2;
background-color: transparent;
`;

const UndoIcon = styled(MdUndo)`
width: 20px;
height: 20px;
color: #0EB1D2;
`;

const DeleteIcon = styled(MdDelete)`
width: 20px;
height: 20px;
color: #0EB1D2;
`;

const ActionButton = styled.button`
background-color: transparent;
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border: 1px solid #0EB1D2;
`;

const Card = ({
  title,
  description,
  status,
  columns,
  cards,
  id,
  editCard,
  deleteCard,
}) => {
  const [newCardTitle, setNewCardTitle] = useState(title);
  const [newCardDescription, setNewCardDescription] = useState(description);
  const [newCardStatus, setNewCardStatus] = useState(status);

  const deleteCardHandler = () => {
    deleteCard(id);
  };

  const editCardHandler = () => {
    editCard(id, newCardTitle, newCardDescription, newCardStatus);
  };

  const undoCardHandler = () => {
    editCard(id, newCardTitle, newCardDescription, newCardStatus, '?undo=true');
    const editedCard = cards.find((card) => card.id === id);
    setNewCardTitle(editedCard.title);
    setNewCardDescription(editedCard.description);
    setNewCardStatus(editedCard.status);
  };

  const changeCardStatusHandler = (action) => {
    setNewCardStatus(action.target.selectedOptions[0].value);
  };

  return (
    <CardContainer>
      <Row>
        <Title type="text" placeholder="Enter Card Title..." value={newCardTitle} onChange={(event) => setNewCardTitle(event.target.value)} onBlur={editCardHandler} />
        <ActionButton onClick={undoCardHandler}>
          <UndoIcon />
        </ActionButton>
        <ActionButton onClick={deleteCardHandler}>
          <DeleteIcon />
        </ActionButton>
      </Row>
      <Row>
        <Description
          value={newCardDescription}
          onChange={(event) => setNewCardDescription(event.target.value)}
          onBlur={editCardHandler}
        />
      </Row>
      <Row>
        <Status
          value={newCardStatus}
          selectedOptions={[newCardStatus]}
          onChange={(event) => changeCardStatusHandler(event)}
          onBlur={editCardHandler}
        >
          {
            columns.map((col) => (<option key={col.id}>{col.name}</option>))
          }
        </Status>
      </Row>
    </CardContainer>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ columns: state.columns, cards: state.cardsData.cards });
const mapDispatchToProps = (dispatch) => ({
  editCard: (
    id,
    title,
    description,
    status,
    query,
  ) => dispatch(actionCreators.editCard(id, title, description, status, query)),
  deleteCard: (id) => dispatch(actionCreators.deleteCard(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
