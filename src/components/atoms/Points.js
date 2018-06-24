import styled from 'styled-components'

export default styled.span`
  background: white;
  border-radius: ${p => p.theme.spacing / 4}px;
  color: ${p => p.theme.background.base};
  font-weight: bolder;
  margin-right: ${p => p.theme.spacing / 2}px;
  opacity: 0.3;
  padding: 0 ${p => p.theme.spacing / 2}px;
`
