import { FaTimes, FaPlus } from 'react-icons/fa';
import { MdMenu, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import styled from 'styled-components';

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: var(--space-48);
  padding-left: var(--space-16);
  margin-bottom: var(--space-16);
  font-size: 2rem;
`;

export const CloseIcon = styled(FaTimes)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Hamburger = styled(MdMenu)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const PlusIcon = styled(FaPlus)`
  width: 15px;
  height: 15px;
  fill: var(--main-color);
`;

export const FavoriteBorderIcon = styled(MdFavoriteBorder)`
`;

export const FavoriteIcon = styled(MdFavorite)`
  color: var(--color-red-03);
`;

