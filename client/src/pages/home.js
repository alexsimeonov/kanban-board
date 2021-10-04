import React from 'react';
import styled from 'styled-components';

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

const HomePage = () => (
  <div>
    <Header />
    <Home>
      <ColumnsContainer>
        <Column />
      </ColumnsContainer>
    </Home>
  </div>
);

export default HomePage;
