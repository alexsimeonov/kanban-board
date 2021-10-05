import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from '../components/header';
import Column from '../components/column';
import { actionCreators } from '../state/index';

const Home = styled.div`
  background-color: #F7F3E3;
  display: flex;
  justify-content: center;
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
  overflow: scroll;
`;

const CreateColumnContainer = styled.div` 
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const ColumnNameInput = styled.input`
  color: black;
  width: 200px;
  margin-right: 15px;
  background-color: transparent;
`;

const CreateColumnButton = styled.button`
  border: 1px solid black;
  background-color: transparent;
  width: 100px;
  height: 20px;
  cursor: pointer;
`;

// eslint-disable-next-line react/prop-types
const HomePage = React.memo(({ columns, getColumns, addColumn }) => {
  const [columnNameInput, setColumnNameInput] = useState('');

  useEffect(() => {
    getColumns();
  }, []);

  const enterColumnNameInput = (event) => {
    setColumnNameInput(event.target.value);
  };

  const addNewColumnHandler = (name) => {
    addColumn(name);
    setColumnNameInput('');
  };

  return (
    <div>
      <Header />
      <Home>
        <CreateColumnContainer>
          <ColumnNameInput type="text" placeholder="Enter Column Name..." onChange={enterColumnNameInput} value={columnNameInput} />
          <CreateColumnButton onClick={() => addNewColumnHandler(columnNameInput)}>
            Add Column
          </CreateColumnButton>
        </CreateColumnContainer>
        <ColumnsContainer>
          {
            // eslint-disable-next-line react/prop-types
            columns.map((column) => (<Column key={column.id} name={column.name} id={column.id} />))
          }
        </ColumnsContainer>
      </Home>
    </div>
  );
});

const mapStateToProps = (state) => ({ columns: state.columns });

const mapDispatchToProps = (dispatch) => ({
  getColumns: () => dispatch(actionCreators.getColumns()),
  addColumn: (name) => dispatch(actionCreators.addColumn(name)),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
