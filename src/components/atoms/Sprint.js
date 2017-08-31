import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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

    const classes = `sprint ${dark ? 'dark' : ''}`

    return <span className={classes}>
      Sprint { number }
    </span>
  }
}

export default Sprint
