import React from 'react';
import styled from 'styled-components';
import { MdUndo, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
width: 90%;
height: 150px;
background-color: transparent;
border: 1px solid #0EB1D2;
margin-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
`;

const Row = styled.div`
margin: 5px;
display: flex;
justify-content: space-between;
align-items: center;
`;

const Title = styled.input`
background-color: transparent;
width: 50%;
height: 15px;
border: 1px solid #0EB1D2;
`;

const Description = styled.textarea`
background-color: transparent;
width: 95%;
height: 40px;
resize: none;
border-color: #0EB1D2;
`;

const Status = styled.select`
width: 50%;
cursor: pointer;
min-width: 100px;
border-color: #0EB1D2;
background-color: transparent;
`;

const UndoIcon = styled(MdUndo)`
width: 20px;
height: 20px;
color: #0EB1D2;
`;

const DeleteIcon = styled(MdDelete)`
width: 20px;
height: 20px;
color: #0EB1D2;
`;

const ActionButton = styled.button`
background-color: transparent;
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border: 1px solid #0EB1D2;
`;

const Card = ({ title, description, status }) => (
  <CardContainer>
    <Row>
      <Title placeholder="Card Title" value={title} onChange={() => {}} />
      <ActionButton>
        <UndoIcon />
      </ActionButton>
      <ActionButton>
        <DeleteIcon />
      </ActionButton>
    </Row>
    <Row>
      <Description value={description} onChange={() => {}} />
    </Row>
    <Row>
      <Status value={status} onChange={() => {}} />
    </Row>
  </CardContainer>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Card;
