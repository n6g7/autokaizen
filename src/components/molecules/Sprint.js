import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { LabelContainer } from '@atoms'

const Container = styled(LabelContainer)`
  &::before {
    content: url(${require('@assets/sprint.svg')});
    margin-right: ${p => p.theme.spacing};
  }
`

class Sprint extends PureComponent {
  static propTypes = {
    dark: PropTypes.bool.isRequired,
    number: PropTypes.number.isRequired
  }

  static defaultProps = {
    dark: false
  }

  render () {
    const {
      dark,
      number
    } = this.props

    return <Container dark={dark}>
      Sprint { number }
    </Container>
  }
}

export default Sprint
