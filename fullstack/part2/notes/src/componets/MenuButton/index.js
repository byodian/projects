import styled from 'styled-components';

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  width: 100%;
  padding: var(--space-4) var(--space-8);

  &:hover {
    background-color: var(--color-grey-02);
  }
`;

export const MenuText = styled.span`
  margin-left: var(--space-8);
`;
