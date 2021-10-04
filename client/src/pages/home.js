import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/header';
import Column from '../components/column';

const Home = styled.div`
  background-color: #F7F3E3;
  display: flex;
  justify-content: center;
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  border: 1px solid #0EB1D2;
  background-color: transparent;
  margin: 20px;
`;

const HomePage = React.memo(() => {
  const [columns, setColumns] = useState([]);

  const getColumns = () => axios.get('http://localhost:3000/columns').then((res) => {
    setColumns(res.data);
  }).catch((err) => console.log(err));

  useEffect(() => {
    getColumns();
  }, []);

  return (
    <div>
      <Header />
      <Home>
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
