import React from 'react';
import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 700px;
  margin: 15px;
  background-color: transparent;
  border: 1px solid #0EB1D2;
`;

const Title = styled.input`
  color: #0EB1D2;
  background-color: transparent;
  border: none;
  align-self: flex-start;
`;

const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const MoreIcon = styled(MdMoreHoriz)`
  color: #0EB1D2;
  width: 20px;
  height: 20px;
`;

const ColumnHeaderContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const CardsContainer = styled.div`
  width: 90%;
  height: 90%;
  background-color: #0EB1D2;
  margin-bottom: 15px;
`;

const Column = ({ title }) => (
  <Container>
    <ColumnHeaderContainer>
      <Title type="text" value={title} />
      <MoreButton>
        <MoreIcon />
      </MoreButton>
    </ColumnHeaderContainer>
    <CardsContainer />
  </Container>
);

Column.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Column;
