import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const colourMap = {
  black: '#b6bbbf',
  blue: '#0079bf',
  green: '#61bd4f',
  lime: '#00c2e0',
  orange: '#ffab4a',
  pink: '#ff80ce',
  purple: '#c377e0',
  red: '#eb5a46',
  sky: '#00c2e0',
  yellow: '#f2d600'
}

const Container = styled.span`
  background: ${p => colourMap[p.colour]};
  border-radius: 3px;
  color: white;
  font-size: 9pt;
  font-weight: bold;
  padding: ${p => p.theme.spacing / 4}px ${p => p.theme.spacing}px;
`

class Label extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    colour: PropTypes.string
  }

  static defaultProps = {
    colour: 'black'
  }

  render () {
    const {
      children,
      colour
    } = this.props

    return <Container colour={colour}>
      { children }
    </Container>
  }
}

export default Label
