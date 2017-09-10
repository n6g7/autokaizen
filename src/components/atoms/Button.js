import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: ${p => p.theme.background.lighter};
  border: 0;
  color: ${p => p.theme.text.lighter};
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  padding: ${p => p.theme.spacing} ${p => 2 * p.theme.spacing};
  text-decoration: none;
`

export const LinkButton = styled(Link)`
  background: ${p => p.theme.background.lighter};
  border: 0;
  color: ${p => p.theme.text.lighter};
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  padding: ${p => p.theme.spacing} ${p => 2 * p.theme.spacing};
  text-decoration: none;
`
export default Button
