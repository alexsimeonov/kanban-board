/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from '../state/index';
import Card from './card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  height: 700px;
  margin: 20px;
  background-color: transparent;
  border: 1px solid #0EB1D2;
`;

const Title = styled.input`
  color: #0EB1D2;
  background-color: transparent;
  border: none;
  align-self: flex-start;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DeleteIcon = styled(MdDelete)`
  color: #0EB1D2;
  width: 20px;
  height: 20px;
`;

const ColumnHeaderContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const CardsContainer = styled.div`
  width: 90%;
  height: 90%;
  background-color: transparent;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
`;

const Column = ({
  // eslint-disable-next-line no-unused-vars
  name, id, editColumn, deleteColumn, cards,
}) => {
  const [newColumnName, setNewColumnName] = useState(name);

  const changeNameHandler = (value) => {
    setNewColumnName(value);
  };

  const editColumnHandler = () => {
    editColumn(id, newColumnName);
  };

  const deleteColumnHandler = () => {
    deleteColumn(id);
  };

  return (
    <Container>
      <ColumnHeaderContainer>
        <Title type="text" value={newColumnName} onChange={(event) => changeNameHandler(event.target.value)} onBlur={editColumnHandler} />
        <DeleteButton onClick={deleteColumnHandler}>
          <DeleteIcon />
        </DeleteButton>
      </ColumnHeaderContainer>
      <CardsContainer>
        {/* {
          // eslint-disable-next-line react/prop-types
          cards.map((card) => {
            return (<Card title={card.title} description={card.description} status={card.status} />);
          })
        } */}
        <Card title="Test" description="Some description." status="Done" />
      </CardsContainer>
    </Container>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  editColumn: (id, name) => dispatch(actionCreators.editColumn(id, name)),
  deleteColumn: (id) => dispatch(actionCreators.deleteColumn(id)),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(Column);
