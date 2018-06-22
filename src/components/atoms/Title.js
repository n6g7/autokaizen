import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.h1`
  color: ${p => p.theme.text.lighter};
  display: flex;
  flex-flow: column nowrap;
  font-size: ${p => 6 * p.theme.spacing}px;
  font-weight: 600;
  margin: 0;

  a {
    color: inherit;
    text-decoration: none;
    transition: .2s;

    &:hover {
      opacity: 0.9;
    }
  }
`

const Pre = styled.span`
  color: ${p => p.theme.text.darker};
  font-size: ${p => 3 * p.theme.spacing}px;
  font-weight: 400;
  margin-bottom: -${p => 1.5 * p.theme.spacing}px;

  &::after {
    content: ' /';
    opacity: 0.5;
  }
`

class Title extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    pre: PropTypes.string,
    to: PropTypes.string
  }

  render () {
    const { children, pre, to, ...props } = this.props

    return <Container {...props}>
      {pre && <Pre>{pre}</Pre>}
      { to
        ? <Link to={to}>{children}</Link>
        : children
      }
    </Container>
  }
}

export default Title
