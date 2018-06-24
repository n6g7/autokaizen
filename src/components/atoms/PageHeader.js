import styled from 'styled-components'

import Button from './Button'

export default styled.header`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 ${p => 3 * p.theme.spacing}px;

  ${Button} {
    margin-left: ${p => 2 * p.theme.spacing}px;
  }

  @media print {
    display: none;
  }
`
