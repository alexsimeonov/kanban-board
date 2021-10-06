import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from '../components/header';
import Column from '../components/column';
import { actionCreators } from '../state/index';
import Modal from '../components/modal';

const Home = styled.div`
  background-color: #BFC3BA;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 70px);
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  min-height: 760px;
  background-color: transparent;
  margin: 20px;
  overflow-x: scroll;
`;

const CreateColumnContainer = styled.div` 
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 10px;
`;

const ColumnNameInput = styled.input`
  color: #565254;
  width: 200px;
  height: 30px;
  margin-right: 15px;
  margin-left: 35px;
  background-color: transparent;
  border: 1px solid #565254;
  border-radius: 5px;

  ::placeholder {
    color: #565254;
  }
`;

const AddButton = styled.button`
  border: 1px solid #565254;
  border-radius: 5px;
  background-color: transparent;
  width: 100px;
  height: 33px;
  cursor: pointer;
  color: #565254;
  border-color: #565254;
  margin-left: 10px;
`;

const HomePage = React.memo(({
  columns, getColumns, addColumn, getCards,
}) => {
  const [columnNameInput, setColumnNameInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const cardStatusOptions = columns.map((col) => col.name);

  useEffect(() => {
    getColumns();
    getCards();
  }, []);

  const enterColumnNameInput = (event) => {
    setColumnNameInput(event.target.value);
  };

  const addCardStatusOption = (name) => {
    if (columns.map((col) => col.name).includes(name)) {
      cardStatusOptions.push(name);
    }
  };

  const addNewColumnHandler = (name) => {
    addColumn(name);
    setColumnNameInput('');
    addCardStatusOption(name);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => setShowModal(false);

  return (
    <div>
      <Header />
      <Home>
        <CreateColumnContainer>
          <ColumnNameInput type="text" placeholder="Enter Column Name..." onChange={enterColumnNameInput} value={columnNameInput} />
          <AddButton onClick={() => addNewColumnHandler(columnNameInput)}>
            Add Column
          </AddButton>
          <AddButton onClick={showModalHandler}>
            Add Card
          </AddButton>
        </CreateColumnContainer>
        <ColumnsContainer>
          {
            columns
              .map((column) => (<Column key={column.id} name={column.name} id={column.id} />))
          }
        </ColumnsContainer>
        <Modal show={showModal} hideModalHandler={hideModalHandler} />
      </Home>
    </div>
  );
});

HomePage.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  getColumns: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ columns: state.columns, cards: state.cards });

const mapDispatchToProps = (dispatch) => ({
  getColumns: () => dispatch(actionCreators.getColumns()),
  addColumn: (name) => dispatch(actionCreators.addColumn(name)),
  getCards: () => dispatch(actionCreators.getCards()),
  getCardById: (id) => dispatch(actionCreators.getCardById(id)),
  addCard: (
    title,
    description,
    status,
  ) => dispatch(actionCreators.addCard(title, description, status)),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
