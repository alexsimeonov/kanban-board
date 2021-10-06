import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { actionCreators } from '../state/index';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: #0EB1D2;
  color: #F7F3E3;
`;

const CardsFilterInput = styled.input`
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

const Header = ({ filterCards }) => {
  const [inputValue, setInputValue] = useState('');

  const inputValueChangedHandler = (value) => {
    setInputValue(value);
    filterCards(value);
  };

  return (
    <Container>
      <Logo>Kanban Board</Logo>
      <CardsFilterInput
        type="text"
        value={inputValue}
        placeholder="Filter cards by title..."
        onChange={(event) => inputValueChangedHandler(event.target.value)}
      />
    </Container>
  );
};

Header.propTypes = {
  filterCards: PropsTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  filterCards: (value) => dispatch(actionCreators.filterCards(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
