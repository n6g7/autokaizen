import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Category, Sprint } from '@atoms'

class Defect extends PureComponent {
  static propTypes = {
    defect: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired
  }

  render () {
    const { defect, projectId } = this.props

    return <article className='defect'>
      <h3>#{defect.cardNumber}</h3>
      <p>{defect.userStory}</p>
      <Sprint number={defect.sprint} dark />
      <Category projectId={projectId} labelId={defect.labelId} dark />
    </article>
  }
}

export default Defect
