import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: #0EB1D2;
  color: #F7F3E3;
`;

const CardsFilter = styled.input`
  background-color: transparent;
  border: none;
  margin-right: 20px;
  width: 300px;
  
  ::placeholder {
    color: #F7F3E3;
  }
`;

const Logo = styled.h2`
  margin: 35px;
`;

const Header = () => (
  <Container>
    <Logo>Kanban Board</Logo>
    <CardsFilter type="text" placeholder="Filter cards by title..." />
  </Container>
);

export default Header;
