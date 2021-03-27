import React from 'react';
import { FloatingContainer, FloatingActionButton } from './FloatingElements';
import { PlusIcon } from '../StyledElements/Icon';

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