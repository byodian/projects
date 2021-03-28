import React from 'react';
import parse from 'html-react-parser';
import { NoteItem,
  NoteContentWrap,
  NoteTime,
  NoteContent,
  NoteButtonGroup,
  IconWrap
} from './NoteElements';
import { useHistory } from 'react-router-dom';
import { FavoriteBorderIcon, FavoriteIcon } from '../StyledElements/Icon';

const Note = ({ note, getLocalDate, toggleLike }) => {
  const history = useHistory();

  // TODO
  const handleClick = () => {
    history.push(`/notes/${note.id}`);
  };


  return (
    <NoteItem>
      <NoteContentWrap onClick={handleClick}>
        <NoteTime>{getLocalDate(note.date)}</NoteTime>
        <NoteContent>{parse(note.content)}</NoteContent>
        <NoteButtonGroup>
          <IconWrap>
            {note.like
              ? <FavoriteIcon onClick={toggleLike}></FavoriteIcon>
              : <FavoriteBorderIcon onClick={toggleLike}></FavoriteBorderIcon>
            }
          </IconWrap>
        </NoteButtonGroup>
      </NoteContentWrap>
    </NoteItem>
  );
};

export default Note;