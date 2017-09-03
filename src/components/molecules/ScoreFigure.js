import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Category, Score } from '@atoms'

class ScoreFigure extends PureComponent {
  static propTypes = {
    defects: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired
  }

  render () {
    const { defects, labels, projectId, ...props } = this.props

    return <figure>
      <figcaption>
        <ul>
          {Object.keys(labels).map(labelId =>
            <li key={labelId}>
              <Category projectId={projectId} labelId={labelId} />
            </li>
          )}
        </ul>
      </figcaption>

      <Score defects={defects} labels={labels} {...props} />
    </figure>
  }
}

export default ScoreFigure
