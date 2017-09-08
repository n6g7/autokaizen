import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import trello from '@assets/trello.svg'
import { Category, Sprint } from '@atoms'

class Defect extends PureComponent {
  static propTypes = {
    defect: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired
  }

  render () {
    const { defect, projectId } = this.props

    return <article className='defect'>
      <a
        className='external'
        href={`https://trello.com/c/${defect.cardId}`}
        target='blank'
        title='Go to Trello card'
      >
        <img src={trello} alt='Trello' />
      </a>

      <h3>#{defect.cardNumber}</h3>
      <p>{defect.userStory}</p>
      <Sprint number={defect.sprint} dark />
      <Category projectId={projectId} labelId={defect.labelId} dark />
    </article>
  }
}

export default Defect
