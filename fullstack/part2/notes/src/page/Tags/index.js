import React, { useEffect } from 'react';
import { TagsWrap, Tag, TagLink } from './TagsElements';
import noteService from '../../components/services/note';

const Tags = ({ tags, handleTags }) => {
  useEffect(async () => {
    const notes = await noteService.getAll();
    const tags = notes.map(n => n.tags).flat();
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