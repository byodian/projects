import React from 'react';
import { TagsInputWrap, TagsInput, TagsButton } from './TagInputElements';

const TagsField = ({ tagsState, handleTagsSubmit }) => {
  return (
    <TagsInputWrap onClick={event => event.stopPropagation()}>
      <TagsInput onChange={tagsState.onChange} value={tagsState.value}></TagsInput>
      <TagsButton onClick={handleTagsSubmit}>保存</TagsButton>
    </TagsInputWrap>
  );
};

export default TagsField;