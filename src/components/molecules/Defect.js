import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Category, Sprint } from '@atoms'

class Defect extends PureComponent {
  static propTypes = {
    defect: PropTypes.object.isRequired
  }

  render () {
    const { defect } = this.props

    return <article className='defect'>
      <h3>#{defect.cardNumber}</h3>
      <p>{defect.userStory}</p>
      <Sprint number={defect.sprint} dark />
      <Category labelId={defect.labelId} dark />
    </article>
  }
}

export default Defect
