import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/header';
import Column from '../components/column';

const Home = styled.div`
  background-color: #F7F3E3;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  border: 1px solid #0EB1D2;
  background-color: transparent;
  margin: 20px;
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
`;

const HomePage = React.memo(() => {
  const [columns, setColumns] = useState([]);
  let columnNameInput = '';

  const getColumns = () => axios.get('http://localhost:3000/columns').then((res) => {
    setColumns(res.data);
  }).catch((err) => console.log(err));

  const addColumn = (name) => axios.post('http://localhost:3000/columns', {
    name,
  }).then(() => {
    columnNameInput = '';
  }).catch((err) => console.log(err));

  useEffect(() => {
    getColumns();
  }, []);

  const changeColumnNameInput = (event) => {
    columnNameInput = event.target.value;
  };

  return (
    <div>
      <Header />
      <Home>
        <CreateColumnContainer>
          <ColumnNameInput type="text" placeholder="Enter Column Name..." onChange={changeColumnNameInput} />
          <CreateColumnButton onClick={() => addColumn(columnNameInput)}>
            Add Column
          </CreateColumnButton>
        </CreateColumnContainer>
        <ColumnsContainer>
          {
            columns.map((column) => (
              <Column key={column.id} title={column.name} />
            ))
          }
        </ColumnsContainer>
      </Home>
    </div>
  );
});

export default HomePage;
