import React from 'react';
import parse from 'html-react-parser';
import { NoteItem, NoteLink, NoteTime, NoteContent } from './NoteElements';

const Note = ({ note, getLocalDate }) => {
  return (
    <NoteItem>
      <NoteLink to={`/notes/${note.id}`}>
        <NoteTime>{getLocalDate(note.date)}</NoteTime>
        <NoteContent>{parse(note.content)}</NoteContent>
      </NoteLink>
    </NoteItem>
  );
};

export default Note;