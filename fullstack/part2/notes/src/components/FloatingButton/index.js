import React from 'react';
import { FloatingContainer, FloatingActionButton, PlusIcon } from './FloatingElements';

const FloatingButton = ({ handleClick }) => {

  return (
    <FloatingContainer>
      <FloatingActionButton onClick={handleClick}>
        <PlusIcon></PlusIcon>
      </FloatingActionButton>
    </FloatingContainer>
  );
};

export default FloatingButton;