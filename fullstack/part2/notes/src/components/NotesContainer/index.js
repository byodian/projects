import React from 'react';
import Header from '../Header/NotesPage';
import Sidebar from '../Siderbar';
import Modal from '../Modal';
import FloatingButton from '../FloatingButton';
import { Main, Content, ContentWrap } from './NotesContainerElements';

const NotesContainer = (props) => {
  const { open, handleOpen, handleLogout, createNote, message, severity, show, handleShow } = props;
  return (
    <>
      <Header
        handleLogout={handleLogout}
        handleClick={handleOpen}
      />
      <Main>
        <Sidebar isOpen={open} handleOpen={handleOpen}/>
        <ContentWrap isOpen={open}>
          <Content>
            {props.children}
          </Content>
        </ContentWrap>
      </Main>
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
