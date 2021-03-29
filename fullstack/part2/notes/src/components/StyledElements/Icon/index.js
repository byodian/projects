import {
  MdMenu,
  MdFavoriteBorder,
  MdFavorite,
  MdClear,
  MdAdd,
  MdLocalOffer
} from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import styled from 'styled-components';

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: var(--space-48);
  padding-left: var(--space-16);
  margin-bottom: var(--space-16);
  font-size: 2rem;
`;

export const CloseIcon = styled(MdClear)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Hamburger = styled(MdMenu)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const PlusIcon = styled(MdAdd)`
  width: 24px;
  height: 24px;
  color: var(--main-color);
`;

export const FavoriteBorderIcon = styled(MdFavoriteBorder)`
`;

export const FavoriteIcon = styled(MdFavorite)`
  color: var(--color-red-03);
`;

export const DeleteIcon = styled(BiTrash)``;

export const TagIcon = styled(MdLocalOffer)``;

