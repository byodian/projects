import React from 'react';
import { useVisibility, useField } from '../../hooks';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import TagsField from '../TagsField';
import {
  NoteItem,
  NoteContentWrap,
  NoteTime,
  NoteContent,
  NoteGroup,
  IconWrap,
  IconGroup,
  TagsWrap,
  Tag
} from './NoteElements';

import {
  FavoriteBorderIcon,
  FavoriteIcon,
  DeleteIcon,
  TagIcon,
} from '../StyledElements/Icon';

const Note = ({ note, getLocalDate, toggleLike, deleteNote, updateTagsOf }) => {
  const tagsVisibility = useVisibility(false);
  const tagsState = useField('text', note.tags.join(','));
  const history = useHistory();

  const handleClick = () => {
    history.push(`/notes/${note.id}`);
  };

  const handleSubmit = () => {
    updateTagsOf(note.id, tagsState.value);
    tagsState.reset();
    tagsVisibility.handleVisibility();
  };

  return (
    <NoteItem>
      <NoteContentWrap onClick={handleClick}>
        <NoteTime>{getLocalDate(note.date)}</NoteTime>
        <NoteContent>{parse(note.content)}</NoteContent>
        <NoteGroup onClick={(event) => event.stopPropagation()}>
          <TagsWrap>
            {note.tags.map((tag, index) => (
              <Tag key={index} to={`/tags/${tag}`}>
                {tag}
              </Tag>
            ))}
          </TagsWrap>
          <IconGroup>
            <IconWrap>
              {note.like ? (
                <FavoriteIcon onClick={toggleLike}></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon onClick={toggleLike}></FavoriteBorderIcon>
              )}
            </IconWrap>
            <IconWrap>
              <DeleteIcon onClick={deleteNote}></DeleteIcon>
            </IconWrap>
            <IconWrap>
              <TagIcon onClick={tagsVisibility.handleVisibility}></TagIcon>
            </IconWrap>
          </IconGroup>
        </NoteGroup>
        {tagsVisibility.visibility
          ? <TagsField tagsState={tagsState} handleTagsSubmit={handleSubmit} note={note}/>
          : null
        }
      </NoteContentWrap>
    </NoteItem>
  );
};

export default Note;
