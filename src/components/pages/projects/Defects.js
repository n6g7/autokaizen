import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { DefectList, Section } from '@atoms'
import { Defect } from '@molecules'
import { defectsSelector, projectSelector } from '@selectors'

import Template from './Template'

class ProjectDefects extends PureComponent {
  static propTypes = {
    defects: PropTypes.array.isRequired,
    project: PropTypes.object.isRequired
  }

  render () {
    const { defects, project } = this.props

    return <Template project={project}>
      <Section title='Defects'>
        <DefectList>
          {[...defects].reverse().map(defect =>
            <li key={defect.id}>
              <Defect defect={defect} />
            </li>
          )}
        </DefectList>
      </Section>
    </Template>
  }
}

const mapStateToProps = (state, ownProps) => ({
  defects: defectsSelector(state),
  project: projectSelector(state, ownProps)
})

export default connect(mapStateToProps)(ProjectDefects)
