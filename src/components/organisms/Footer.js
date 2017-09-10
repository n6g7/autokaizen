import React, { PureComponent } from 'react'
import styled from 'styled-components'

import config from '../../../package.json'

const Container = styled.footer`
  margin-top: ${p => 6 * p.theme.spacing};
  opacity: 0.4;
  text-align: center;
`

class Footer extends PureComponent {
  render () {
    return <Container>
      <a href='https://github.com/n6g7/autokaizen'>
        { config.name } v{ config.version }
      </a>
    </Container>
  }
}

export default Footer
