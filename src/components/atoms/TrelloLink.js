import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import trello from '@assets/trello.svg'

class TrelloLink extends PureComponent {
  static propTypes = {
    cardId: PropTypes.string.isRequired
  }

  render () {
    const { cardId } = this.props

    return <a
      className='external'
      href={`https://trello.com/c/${cardId}`}
      target='blank'
      title='Go to Trello card'
    >
      <img src={trello} alt='Trello' />
    </a>
  }
}

export default TrelloLink
