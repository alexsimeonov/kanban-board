/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import PropsTypes from 'prop-types';
import { useForm } from 'react-hook-form';
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
  min-height: 320px;
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

const ErrorSpan = styled.span`
  color: red;
  font-size: 15px;
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
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (columns.length) {
      setStatusValue(columns[0].name);
    }
  }, [columns]);

  const onSubmit = () => {
    addCard(titleValue, descriptionValue, statusValue);
    hideModalHandler();
    setTitleValue('');
    setDescriptionValue('');
    setStatusValue('');
  };

  const changeCardTitleHandler = (event) => {
    setTitleValue(event.target.value);
  };

  const changeCardDescriptionHandler = (event) => {
    setDescriptionValue(event.target.value);
  };

  const changeCardStatusHandler = (event) => {
    setStatusValue(event.target.selectedOptions[0].value);
  };

  const closeModalHandler = () => {
    hideModalHandler();
    setTitleValue('');
    setDescriptionValue('');
    setStatusValue('');
    clearErrors();
  };

  return show ? (
    <ModalContainer>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <ModalTitle>Create Card</ModalTitle>
            <CloseButton onClick={closeModalHandler}>
              <CloseIcon />
            </CloseButton>
          </Row>
          <Row>
            <Title
              placeholder="Enter Card Title..."
              {...register('title', { required: true, value: titleValue, onChange: (event) => changeCardTitleHandler(event) })}
            />
          </Row>
          <Row>
            { errors.title?.type === 'required' && <ErrorSpan>Card title is required.</ErrorSpan> }
          </Row>
          <Row>
            <Description
              placeholder="Enter Card Description..."
              {...register('description', { required: true, value: descriptionValue, onChange: (event) => changeCardDescriptionHandler(event) })}
            />
          </Row>
          <Row>
            { errors.description?.type === 'required' && <ErrorSpan>Card description is required.</ErrorSpan> }
          </Row>
          <BottomRow>
            <Status
              placeholder="Choose Card Status..."
              {...register('status', { required: true, onChange: (event) => changeCardStatusHandler(event) })}
            >
              {
                columns.map((col) => (<option key={col.id}>{col.name}</option>))
              }
            </Status>
            { errors.status?.type === 'required' && <ErrorSpan>Card status is required.</ErrorSpan> }
          </BottomRow>
          <BottomRow>
            <CreateButton type="submit">
              Create Card
            </CreateButton>
          </BottomRow>
        </form>
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
