import React, { useEffect } from 'react';
import Note from '../../components/Note';
import noteService from '../../components/services/note';
import Alert from '../../components/StyledElements/Alert';
import { Main, NoteItems } from './NotesElements';

const Notes = ({
  notes,
  user,
  children,
  message,
  severity,
  handleNotes,
  getLocalDate,
  compare
}) => {

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
    <Main>
      <Alert severity={severity} message={message}>{message}</Alert>
      {children}
      <NoteItems>
        {notes.map(note =>
          <Note
            key={note.id}
            note={note}
            getLocalDate={getLocalDate}
          />
        )}
      </NoteItems>
    </Main>
  );
};

export default Notes;