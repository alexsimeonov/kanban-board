import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #0EB1D2;
  color: #F7F3E3;
`;

function Header() {
  return (
    <Container>
      <h1>Kanban Board</h1>
    </Container>
  );
}

export default Header;
