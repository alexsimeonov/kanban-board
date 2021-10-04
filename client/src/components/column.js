import React from 'react';
import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 700px;
  margin: 15px;
  background-color: transparent;
  border: 2px solid #F7F3E3;
`;

const Title = styled.h2`
  color: #F7F3E3;
  align-self: flex-start;
  margin-left: 10px;
`;

const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const MoreIcon = styled(MdMoreHoriz)`
  color: white;
  width: 25px;
  height: 25px;
`;

const ColumnHeaderContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const CardsContainer = styled.div`
  width: 90%;
  height: 90%;
  background-color: #F7F3E3;
  margin-bottom: 15px;
`;

function Column() {
  return (
    <Container>
      <ColumnHeaderContainer>
        <Title>To Do</Title>
        <MoreButton>
          <MoreIcon />
        </MoreButton>
      </ColumnHeaderContainer>
      <CardsContainer />
    </Container>
  );
}

export default Column;
