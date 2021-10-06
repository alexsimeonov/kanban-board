import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from '../components/header';
import Column from '../components/column';
import { actionCreators } from '../state/index';
import Modal from '../components/modal';

const Home = styled.div`
  background-color: #F7F3E3;
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
  border: 1px solid #0EB1D2;
  background-color: transparent;
  margin: 20px;
  overflow-x: scroll;
`;

const CreateColumnContainer = styled.div` 
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const ColumnNameInput = styled.input`
  color: #0EB1D2;
  width: 200px;
  margin-right: 15px;
  background-color: transparent;
  border: none;

  ::placeholder {
    color: #0EB1D2;
  }
`;

const AddButton = styled.button`
  border: 1px solid black;
  background-color: transparent;
  width: 100px;
  height: 20px;
  cursor: pointer;
  color: #0EB1D2;
  border-color: #0EB1D2;
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

  if (!showModal) {
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
              // eslint-disable-next-line max-len
              columns.map((column) => (<Column key={column.id} name={column.name} id={column.id} />))
            }
          </ColumnsContainer>
        </Home>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Home>
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
