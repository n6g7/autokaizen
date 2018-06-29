import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import trello from '@assets/trello.svg'

const Link = styled.a`
  opacity: 0.5;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }
`

const Image = styled.img`
  height: ${p => 2 * p.theme.spacing};
  width: ${p => 2 * p.theme.spacing};
`

class TrelloLink extends PureComponent {
  static propTypes = {
    cardId: PropTypes.string.isRequired
  }

  onClick = event => event.stopPropagation()

  render () {
    const { cardId, ...props } = this.props

    return <Link
      href={`https://trello.com/c/${cardId}`}
      target='blank'
      title='Go to Trello card'
      onClick={this.onClick}
      {...props}
    >
      <Image src={trello} alt='Trello' />
    </Link>
  }
}

export default TrelloLink
