import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: ${p => p.theme.background.lighter};
  border: 0;
  color: ${p => p.theme.text.lighter};
  cursor: pointer;
  font-family: inherit;
  font-size: ${p => (p.small ? '14px' : 'inherit')};
  font-weight: 600;
  outline: none;
  padding: ${p =>
    p.small
      ? `${p.theme.spacing / 2}px ${p.theme.spacing}px`
      : `${p.theme.spacing}px ${2 * p.theme.spacing}px`};
  text-decoration: none;

  @media print {
    display: none;
  }
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
