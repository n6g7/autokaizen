import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import Add from './Add'
import DefectPopup from './DefectPopup'
import Defects from './Defects'
import Details from './Details'

class Projects extends PureComponent {
  render () {
    const { match } = this.props

    return [
      <Switch key={1}>
        <Route exact path={`${match.url}/add`} component={Add} />
        <Route path={`${match.url}/:projectId/defects`} component={Defects} />
        <Route path={`${match.url}/:projectId`} component={Details} />
      </Switch>,
      <Route exact path={`${match.url}/:projectId/defects/:defectId`} component={DefectPopup} key={2} />
    ]
  }
}

export default Projects
