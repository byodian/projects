import React, { useEffect } from 'react';
import { TagsWrap, Tag, TagLink } from './TagsElements';
import noteService from '../../components/services/note';

const Tags = ({ user, tags, handleTags }) => {
  useEffect(async () => {
    const initialNotes = await noteService.getNotesByUser(user.username);
    const tags = initialNotes.notes.map(n => n.tags).flat();
    const uniqueTags = [...new Set(tags)];
    handleTags(uniqueTags);
  }, []);

  return (
    <TagsWrap>
      {tags.map(tag => (
        <Tag key={tag}>
          <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
        </Tag>
      ))}
    </TagsWrap>
  );
};

export default Tags;