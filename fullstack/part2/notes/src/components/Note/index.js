import React from 'react';
import parse from 'html-react-parser';
import { NoteItem,
  NoteContentWrap,
  NoteTime,
  NoteContent,
  NoteGroup,
  IconWrap,
  IconGroup,
  TagsWrap,
  Tag
} from './NoteElements';
import { useHistory } from 'react-router-dom';
import { FavoriteBorderIcon, FavoriteIcon, DeleteIcon, TagIcon } from '../StyledElements/Icon';

const Note = ({ note, getLocalDate, toggleLike, deleteNote }) => {
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
        <NoteGroup onClick={event => event.stopPropagation()}>
          <TagsWrap>
            {
              note.tags.map((tag, index) => (
                <Tag
                  key={index}
                  onClick={(event) => event.stopPropagation()}
                  to={`/tags/${tag}`}>
                  {tag}
                </Tag>
              ))
            }
          </TagsWrap>
          <IconGroup>
            <IconWrap>
              {note.like
                ? <FavoriteIcon onClick={toggleLike}></FavoriteIcon>
                : <FavoriteBorderIcon onClick={toggleLike}></FavoriteBorderIcon>
              }
            </IconWrap>
            <IconWrap>
              <DeleteIcon onClick={deleteNote}></DeleteIcon>
            </IconWrap>
            <IconWrap>
              <TagIcon></TagIcon>
            </IconWrap>
          </IconGroup>
        </NoteGroup>
      </NoteContentWrap>
    </NoteItem>
  );
};

export default Note;