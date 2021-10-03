import React from 'react';
import styled from 'styled-components';

import Header from '../components/header';

const Home = styled.div`
  background-color: #F7F3E3;
  display: flex;
  justify-content: center;
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  background-color: #0EB1D2;
  margin: 20px;
`;

function HomePage() {
  return (
    <div>
      <Header />
      <Home>
        <ColumnsContainer />
      </Home>
    </div>
  );
}

export default HomePage;
