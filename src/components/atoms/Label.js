import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Label extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    colour: PropTypes.string.isRequired
  }

  render () {
    const {
      children,
      colour
    } = this.props

    return <span className='label'>
      { children }
      <span style={{ background: colour }} />
    </span>
  }
}

export default Label
