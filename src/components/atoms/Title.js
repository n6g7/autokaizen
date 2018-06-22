import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.h1`
  color: ${p => p.theme.text.lighter};
  display: flex;
  flex-flow: column nowrap;
  font-size: ${p => 6 * p.theme.spacing}px;
  font-weight: 600;
  margin: 0;
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
  render () {
    const { children, pre, ...props } = this.props

    return <Container {...props}>
      {pre && <Pre>{pre}</Pre>}
      { children }
    </Container>
  }
}

export default Title
