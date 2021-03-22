import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding: 0.8rem 1.6rem;
  background-color: var(--main-color);
  border-radius: var(--radius-lg);
  font-size: var(--heading-sm-font-size);
  white-space: nowrap;
  min-width: 13rem;
  color: #fff;
  text-align: center;

  &:hover {
    background-color: var(--main-color-dark);
  }

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
  `}
`;

export default Button;