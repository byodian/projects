import React, { useState } from 'react';
import TextEditor from '../TextEditor';

const NoteForm = ({ createNote }) => {
  const [text, setText] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: text,
      important: false
    });
    setText('');
  };

  return (
    <TextEditor text={text} setText={setText} handleSubmit={addNote}/>
  );

};

export default NoteForm;
