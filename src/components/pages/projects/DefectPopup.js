import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { DateTime } from 'luxon'

import { Points, TicketNumber } from '@atoms'
import { Category, Date, Sprint } from '@molecules'
import { defectSelector } from '@selectors/defects'
import { projectSelector } from '@selectors/projects'
import { Popup } from '@templates'

const Project = styled.p`
  color: ${p => p.theme.text.darker};
  font-size: 1.25em;
  font-weight: bolder;
  margin: 0;

  span {
    font-weight: normal;
    opacity: 0.8;
  }
`

const UserStory = styled.p`
  margin: ${p => 3 * p.theme.spacing}px 0 ${p => 2 * p.theme.spacing}px;
`

const SubTitle = styled.h4`
  font-size: 1.5em;
  margin: 0 0 ${p => 3 * p.theme.spacing}px;
`

const Textarea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${p => p.theme.background.lighter};
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: lighter;
  outline: none;
  padding: 0 0 ${p => p.theme.spacing}px;
  resize: vertical;
  width: 100%;
`

class DefectPopup extends PureComponent {
  static propTypes = {
    defect: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
  }

  renderMain () {
    const { defect, project } = this.props

    if (!project) return null

    return <Fragment>
      <Project>
        {project.client && <span>{project.client} / </span>}
        {project.name}
      </Project>
      <TicketNumber large>{ defect.cardNumber }</TicketNumber>
      <UserStory>
        <Points>{defect.points}</Points>
        {defect.userStory}
      </UserStory>
      <Date date={DateTime.fromMillis(defect.creation)} dark />
      <Sprint number={defect.sprint} dark />
      <Category labelId={defect.labelId} dark />
    </Fragment>
  }

  renderFooter () {
    return <Fragment>
      <SubTitle>Notes</SubTitle>
      <Textarea />
    </Fragment>
  }

  render () {
    return ReactDOM.createPortal(
      <Popup
        main={this.renderMain()}
        footer={this.renderFooter()}
      />,
      document.getElementById('popup')
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  defect: defectSelector(state, ownProps),
  project: projectSelector(state, ownProps)
})

export default connect(mapStateToProps)(DefectPopup)
