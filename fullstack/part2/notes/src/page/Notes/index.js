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
  deleteNoteOf,
  updateTagsOf
}) => {

  useEffect(async () => {
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
            toggleLike={() => toggleLikeOf(note.id)}
            deleteNote={() => deleteNoteOf(note.id)}
            updateTagsOf={updateTagsOf}
          />
        )}
      </NoteItems>
    </>
  );
};

export default Notes;