import React, { PureComponent } from 'react'
import styled from 'styled-components'

import config from '../../../package.json'

const Container = styled.footer`
  margin-top: ${p => 6 * p.theme.spacing};
  opacity: 0.4;
  text-align: center;

  @media print {
    display: none;
  }
`

const Link = styled.a`
  color: ${p => p.theme.text.lighter};
  opacity: 0.7;
  transition: 0.5s;

  &:hover {
    opacity: 1;
  }
`

class Footer extends PureComponent {
  render() {
    const building = process.env.CIRCLE_JOB === 'deploy'
    const commit = building ? process.env.CIRCLE_SHA1.substring(0, 6) : 'dev'
    const url = building
      ? `https://github.com/${process.env.CIRCLE_PROJECT_USERNAME}/${
          process.env.CIRCLE_PROJECT_REPONAME
        }/tree/${process.env.CIRCLE_SHA1}`
      : 'http://localhost:8080'

    return (
      <Container>
        <Link href="https://github.com/n6g7/autokaizen">{config.name}</Link> (
        <Link href={url}>{commit}</Link>)
      </Container>
    )
  }
}

export default Footer
