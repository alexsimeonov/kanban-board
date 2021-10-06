import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import PropsTypes from 'prop-types';
import { actionCreators } from '../state/index';

const Container = styled.div`
  width: 500px;
  height: 300px;
  border: 1px solid #0EB1D2;
`;

const ModalTitle = styled.h1`
  color: #0EB1D2;
`;

const Row = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: 1px solid #0EB1D2;
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CreateButton = styled.button`
  background-color: transparent;
  border: 1px solid #0EB1D2;
  width: 50%;
  height: 30px;
  cursor: pointer;
`;

const CloseIcon = styled(MdClose)`
  color: #0EB1D2;
  width: 80%;
  height: 80%;
`;

const Title = styled.input`
background-color: transparent;
width: 100%;
height: 15px;
border: 1px solid #0EB1D2;
`;

const Description = styled.textarea`
background-color: transparent;
width: 100%;
height: 40px;
resize: none;
border-color: #0EB1D2;
`;

const Status = styled.select`
width: 100%;
cursor: pointer;
border-color: #0EB1D2;
background-color: transparent;
`;

const BottomRow = styled(Row)`
  justify-content: center;
`;

const Modal = ({ columns, addCard, hideModalHandler }) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const addCardHandler = () => {
    addCard(titleValue, descriptionValue, statusValue);
    hideModalHandler();
  };

  const changeCardStatusHandler = (event) => {
    setStatusValue(event.target.selectedOptions[0].value);
  };

  return (
    <Container>
      <Row>
        <ModalTitle>Create Card</ModalTitle>
        <CloseButton onClick={hideModalHandler}>
          <CloseIcon />
        </CloseButton>
      </Row>
      <Row>
        <Title placeholder="Enter Card Title..." value={titleValue} onChange={(event) => setTitleValue(event.target.value)} />
      </Row>
      <Row>
        <Description placeholder="Enter Card Description..." value={descriptionValue} onChange={(event) => setDescriptionValue(event.target.value)} />
      </Row>
      <Row>
        <Status
          value={statusValue}
          onChange={(event) => changeCardStatusHandler(event)}
          selectedOptions={[statusValue]}
        >
          {
            columns.map((col) => (<option key={col.id}>{col.name}</option>))
          }
        </Status>
      </Row>
      <BottomRow>
        <CreateButton onClick={addCardHandler}>
          Create Card
        </CreateButton>
      </BottomRow>
    </Container>
  );
};

Modal.propTypes = {
  columns: PropsTypes.arrayOf(PropsTypes.object).isRequired,
  addCard: PropsTypes.func.isRequired,
  hideModalHandler: PropsTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ columns: state.columns });
const mapDispatchToProps = (dispatch) => ({
  addCard: (
    title,
    description,
    status,
  ) => dispatch(actionCreators.addCard(title, description, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
