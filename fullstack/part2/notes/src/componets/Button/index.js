import styled, { css } from 'styled-components';

const Button = styled.button`
  margin: 0 1rem;
  padding: 0.6rem 1.6rem;
  background-color: #333;
  border-radius: var(--radius-xl);
  font-size: 1.4px;
  color: #fff;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
  `}
`;

export default Button;