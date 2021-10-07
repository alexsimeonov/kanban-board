import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdUndo, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import { actionCreators } from '../state/index';

const CardContainer = styled.div`
width: 97%;
height: 170px;
background-color: white;
border: 1px solid #565254;
border-radius: 5px;
margin-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
`;

const Row = styled.div`
margin: 5px;
display: flex;
justify-content: space-evenly;
align-items: center;
`;

const Title = styled.input`
background-color: transparent;
width: 80%;
height: 15px;
border: none;
`;

const Description = styled.textarea`
background-color: transparent;
width: 88%;
height: 40px;
resize: none;
margin-bottom: 10px;
`;

const Status = styled.select`
width: 50%;
cursor: pointer;
min-width: 100px;
border: none;
background-color: transparent;
`;

const UndoIcon = styled(MdUndo)`
width: 20px;
height: 20px;
color: #565254;
`;

const DeleteIcon = styled(MdDelete)`
width: 20px;
height: 20px;
color: #565254;
`;

const ActionButton = styled.button`
background-color: transparent;
width: 25px;
height: 25px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border: none;
`;

const SaveChangesButton = styled.button`
  width: 50%;
  height: 30px;
  border: 1px solid #565254;
  border-radius: 5px;
  background-color: transparent;
  color: #565254;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
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
        <Title
          type="text"
          placeholder="Enter Card Title..."
          value={newCardTitle}
          onChange={(event) => setNewCardTitle(event.target.value)}
        />
        <ActionButton onClick={undoCardHandler}>
          <UndoIcon />
        </ActionButton>
        <ActionButton onClick={deleteCardHandler}>
          <DeleteIcon />
        </ActionButton>
      </Row>
      <Description
        value={newCardDescription}
        placeholder="Enter Card Description..."
        onChange={(event) => setNewCardDescription(event.target.value)}
      />
      <Row>
        <Status
          value={newCardStatus}
          selectedOptions={[newCardStatus]}
          onChange={(event) => changeCardStatusHandler(event)}
        >
          {
            columns.map((col) => (<option key={col.id}>{col.name}</option>))
          }
        </Status>
      </Row>
      <SaveChangesButton onClick={editCardHandler}>
        Save Changes
      </SaveChangesButton>
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
