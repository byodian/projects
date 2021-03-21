import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding: 0.8rem 1.6rem;
  background-color: #333;
  border-radius: var(--radius-lg);
  font-size: var(--heading-sm-font-size);
  white-space: nowrap;
  min-width: 13rem;
  color: #fff;
  text-align: center;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
  `}
`;

export default Button;