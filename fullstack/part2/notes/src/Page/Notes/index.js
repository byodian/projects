import React, { useEffect } from 'react';
import Note from '../../components/Note';
import Header from '../../components/Header/NotesPage';
import noteService from '../../components/services/note';
import Sidebar from '../../components/Siderbar';
import Alert from '../../components/StyledElements/Alert';
import {
  Main,
  NoteItems
} from './NotesElements';

const Notes = ({
  notes,
  user,
  children,
  open,
  message,
  handleOpen,
  toggleImportanceOf,
  handleLogout,
  handleNotes,
  getLocalDate
}) => {

  const compare = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    if (a.date > b.date) {
      return -1;
    }

    return 0;
  };

  useEffect(async () => {
    try {
      const initialNotes = await noteService.getAll();
      handleNotes(initialNotes
        .filter(n => n.user.username === user.username)
        .sort(compare));
    } catch(error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Sidebar isOpen={open} handleOpen={handleOpen}/>
      <Header
        handleLogout={handleLogout}
        handleClick={handleOpen}
      />
      <Main>
        <Alert error message={message}>{message}</Alert>
        {children}
        <NoteItems>
          {notes.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              getLocalDate={getLocalDate}
            />
          )}
        </NoteItems>
      </Main>
    </>
  );
};

export default Notes;