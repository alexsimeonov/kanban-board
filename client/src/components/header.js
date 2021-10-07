import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { actionCreators } from '../state/index';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
  background-color: #565254;
  color: white;
`;

const CardsFilterInput = styled.input`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 5px;
  margin-right: 20px;
  width: 300px;
  height: 30px;
  
  ::placeholder {
    color: white;
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
