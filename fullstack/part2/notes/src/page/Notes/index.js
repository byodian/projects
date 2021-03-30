import React, { useEffect } from 'react';
import Note from '../../components/Note';
import noteService from '../../components/services/note';
import Alert from '../../components/StyledElements/Alert';
import { NoteItems } from './NotesElements';

const Notes = ({
  notes,
  user,
  children,
  message,
  severity,
  handleNotes,
  getLocalDate,
  compare,
  toggleLikeOf,
  deleteNoteOf
}) => {

  useEffect(async () => {
    console.log(user);
    try {
      const initialNotes = await noteService.getNotesByUser(user.username);
      handleNotes(initialNotes.notes.sort(compare));
    } catch(error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Alert severity={severity} message={message}>{message}</Alert>
      {children}
      <NoteItems>
        {notes.map(note =>
          <Note
            key={note.id}
            note={note}
            getLocalDate={getLocalDate}
            toggleLike={(event) => {
              event.stopPropagation();
              toggleLikeOf(note.id);
            }}
            deleteNote={(event) => {
              event.stopPropagation();
              deleteNoteOf(note.id);
            }}
          />
        )}
      </NoteItems>
    </>
  );
};

export default Notes;