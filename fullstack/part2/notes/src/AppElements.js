import styled from 'styled-components';
export const Container = styled.div`

  background-color: var(--color-grey-01);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    background-color: var(--color-back-07);
    transition: all 0.5s ease-out;
    z-index: 399;
  }
`;