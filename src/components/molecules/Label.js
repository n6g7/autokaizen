import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { LabelContainer } from '@atoms'

const ColourCircle = styled.span`
  background: ${p => p.colour};
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: inline-block;
  margin-left: ${p => p.theme.spacing};
  height: ${p => p.theme.spacing};
  width: ${p => p.theme.spacing};
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

    return <LabelContainer>
      { children }
      <ColourCircle colour={colour} />
    </LabelContainer>
  }
}

export default Label
