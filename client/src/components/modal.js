import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import PropsTypes from 'prop-types';
import { actionCreators } from '../state/index';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0,0,0,0.5);
`;

const ModalBody = styled.div`
  width: 500px;
  height: 270px;
  border: 1px solid #565254;
  border-radius: 5px;
  background-color: #BFC3BA;
  opacity: 1;
`;

const ModalTitle = styled.h2`
  color: #565254;
`;

const Row = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CreateButton = styled.button`
  background-color: transparent;
  border: 1px solid #565254;
  border-radius: 5px;
  width: 50%;
  height: 30px;
  cursor: pointer;
`;

const CloseIcon = styled(MdClose)`
  color: #565254;
  width: 80%;
  height: 80%;
`;

const Title = styled.input`
background-color: transparent;
width: 100%;
height: 20px;
border: 1px solid #565254;
border-radius: 5px;
`;

const Description = styled.textarea`
background-color: transparent;
width: 100%;
height: 40px;
resize: none;
border-color: #565254;
border-radius: 5px;
`;

const Status = styled.select`
width: 60%;
cursor: pointer;
border: none;
background-color: transparent;
`;

const BottomRow = styled(Row)`
  justify-content: center;
`;

const Modal = ({
  columns,
  addCard,
  hideModalHandler,
  show,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const addCardHandler = () => {
    addCard(titleValue, descriptionValue, statusValue);
    hideModalHandler();
    setTitleValue('');
    setDescriptionValue('');
    setStatusValue('');
  };

  const changeCardStatusHandler = (event) => {
    setStatusValue(event.target.selectedOptions[0].value);
  };

  const closeModalHandler = () => {
    hideModalHandler();
    setTitleValue('');
    setDescriptionValue('');
    setStatusValue('');
  };

  return show ? (
    <ModalContainer>
      <ModalBody>
        <Row>
          <ModalTitle>Create Card</ModalTitle>
          <CloseButton onClick={closeModalHandler}>
            <CloseIcon />
          </CloseButton>
        </Row>
        <Row>
          <Title placeholder="Enter Card Title..." value={titleValue} onChange={(event) => setTitleValue(event.target.value)} />
        </Row>
        <Row>
          <Description placeholder="Enter Card Description..." value={descriptionValue} onChange={(event) => setDescriptionValue(event.target.value)} />
        </Row>
        <BottomRow>
          <Status
            value={statusValue}
            onChange={(event) => changeCardStatusHandler(event)}
            selectedOptions={[statusValue]}
          >
            {
              columns.map((col) => (<option key={col.id}>{col.name}</option>))
            }
          </Status>
        </BottomRow>
        <BottomRow>
          <CreateButton onClick={addCardHandler}>
            Create Card
          </CreateButton>
        </BottomRow>
      </ModalBody>
    </ModalContainer>
  ) : null;
};

Modal.propTypes = {
  columns: PropsTypes.arrayOf(PropsTypes.object).isRequired,
  addCard: PropsTypes.func.isRequired,
  hideModalHandler: PropsTypes.func.isRequired,
  show: PropsTypes.bool.isRequired,
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
