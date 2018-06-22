import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createProject } from '@actions/projects'
import { Button, Section, Select } from '@atoms'

const Label = styled.label`
  display: inline-block;
  margin-right: ${p => p.theme.spacing}px;
  min-width: ${p => 15 * p.theme.spacing}px;
`

class AddProject extends PureComponent {
  static propTypes = {
    boards: PropTypes.array.isRequired,
    create: PropTypes.func.isRequired
  }

  state = {
    boardId: '',
    name: '',
    sprint: 1
  }

  constructor (props) {
    super(props)
    this.createProject = this.createProject.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    const {
      name,
      value
    } = event.target

    switch (name) {
      case 'board':
        const board = this.props.boards.find(b => b.id === value)
        this.setState({
          boardId: value,
          name: board.name
        })
        break
      case 'name':
        this.setState({
          name: value
        })
        break
      case 'sprint':
        this.setState({
          sprint: parseInt(value)
        })
        break
    }
  }

  createProject () {
    const { boardId, name, sprint } = this.state
    this.props.create(boardId, name, sprint)
  }

  render () {
    const { boards } = this.props
    const { boardId, name, sprint } = this.state

    const options = boards.map(board => ({
      value: board.id,
      label: board.name
    }))

    return <Section title='Add Project'>
      <p>
        <Label htmlFor='board'>Trello board</Label>
        <Select
          id='board'
          name='board'
          onChange={this.onChange}
          options={options}
          value={boardId}
          required
        />
      </p>

      <p>
        <Label htmlFor='name'>Project name</Label>
        <input
          id='name'
          name='name'
          onChange={this.onChange}
          type='text'
          value={name}
          placeholder='Awesome project'
          required
        />
      </p>

      <p>
        <Label htmlFor='sprint'>Current sprint</Label>
        <input
          id='sprint'
          name='sprint'
          onChange={this.onChange}
          type='number'
          value={sprint}
          placeholder='1'
          required
        />
      </p>

      <Button onClick={this.createProject}>Create</Button>
    </Section>
  }
}

const mapStateToProps = state => ({
  boards: state.boards.list
})

const mapDispatchToProps = {
  create: createProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
