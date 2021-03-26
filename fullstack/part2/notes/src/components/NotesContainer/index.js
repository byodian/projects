import React from 'react';
import Header from '../Header/NotesPage';
import Sidebar from '../Siderbar';
import Modal from '../Modal';
import FloatingButton from '../FloatingButton';

const NotesContainer = (props) => {
  const { open, handleOpen, handleLogout, createNote, message, severity, show, handleShow } = props;
  return (
    <>
      <Sidebar isOpen={open} handleOpen={handleOpen}/>
      <Header
        handleLogout={handleLogout}
        handleClick={handleOpen}
      />
      {props.children}
      <Modal
        createNote={createNote}
        message={message}
        severity={severity}
        show={show}
        handleShow={handleShow}
      ></Modal>
      <FloatingButton handleClick={handleShow}></FloatingButton>
    </>
  );
};

export default NotesContainer;
