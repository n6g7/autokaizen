import React, { PureComponent } from 'react'
import styled from 'styled-components'

import config from '../../../package.json'

const Container = styled.footer`
  margin-top: ${p => 6 * p.theme.spacing};
  opacity: 0.4;
  text-align: center;
`

const Link = styled.a`
  color: ${p => p.theme.text.lighter};
  opacity: 0.7;
  transition: .5s;

  &:hover {
    opacity: 1;
  }
`

class Footer extends PureComponent {
  render () {
    return <Container>
      <Link href='https://github.com/n6g7/autokaizen'>
        { config.name } v{ config.version }
      </Link>
    </Container>
  }
}

export default Footer
