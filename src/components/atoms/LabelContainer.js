import styled from 'styled-components'

export default styled.span`
  align-items: center;
  color: ${p => p.dark ? p.theme.text.darker : 'inherit'};
  cursor: ${p => p.onClick ? 'pointer' : 'normal'};
  display: flex;
  flex-flow: row nowrap;
  font-weight: 600;
  margin: ${p => p.theme.spacing} 0;
  opacity: ${p => p.faded ? 0.4 : 1};
  transition: .2s;
`
