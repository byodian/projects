import React from 'react';
import { OverlayWrap } from './OverlayElements';

const Overlay = ({ visibility, handleClick }) => {
  return (
    <OverlayWrap isOpen={visibility} onClick={handleClick}></OverlayWrap>
  );
};

export default Overlay;