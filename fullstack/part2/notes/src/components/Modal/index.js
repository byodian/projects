import React from 'react';
import { ModalWrap, ModalContent, IconWrap, ModalCloseIcon } from './ModalElements';
import NoteForm from '../NoteForm';
import Alert from '../StyledElements/Alert';

const Modal = ({ createNote, message, severity, show, handleShow }) => {
  return (
    <ModalWrap show={show}>
      <IconWrap>
        <ModalCloseIcon onClick={handleShow} />
      </IconWrap>
      <ModalContent>
        <Alert severity={severity} message={message}>{message}</Alert>
        <NoteForm createNote={createNote}/>
      </ModalContent>
    </ModalWrap>
  );
};

export default Modal;