import styled from 'styled-components'

export default styled.ul`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  margin: 0;
  padding: 0;

  li:not(:last-child) {
    margin-right: ${p => 2 * p.theme.spacing}
  }
`
