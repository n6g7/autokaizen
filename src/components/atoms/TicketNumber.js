import styled, { css } from 'styled-components'

export default styled.h3`
  color: ${p => p.theme.text.lighter};
  font-size: 1.5em;
  margin: 0 0 ${p => p.theme.spacing}px 0;

  ${p =>
    p.large &&
    css`
      font-size: 2.5em;
    `}

  &::before {
    content: '#';
    font-size: 0.9em;
    margin-right: 1px;
    opacity: 0.7;
  }
`
