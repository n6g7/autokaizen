import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import { LabelContainer } from '@atoms'

const Container = LabelContainer.extend`
  &::before {
    content: url(${require('@assets/sprint.svg')});
    margin-right: ${p => p.theme.spacing};
  }
`.withComponent('date')

class Date extends PureComponent {
  static propTypes = {
    dark: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(DateTime).isRequired
  }

  static defaultProps = {
    dark: false
  }

  render () {
    const {
      dark,
      date
    } = this.props

    return <Container dark={dark}>
      { date.toLocaleString() }
    </Container>
  }
}

export default Date
