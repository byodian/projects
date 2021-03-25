import React from 'react';
import parse from 'html-react-parser';
import { DetailsWrap } from './DetailsElements';

const Details = ({ note, getLocalDate }) => {
  return (
    <DetailsWrap>
      <p><time>{getLocalDate(note.date)}</time></p>
      {parse(note.content)}
    </DetailsWrap>
  );
};

export default Details;