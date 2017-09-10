import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Select } from '@atoms'

import { createProject } from '@actions/projects'

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

    return <div>
      <h2>Add Project</h2>

      <p>
        <label htmlFor='board'>Trello board</label>
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
        <label htmlFor='name'>Project name</label>
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
        <label htmlFor='sprint'>Current sprint</label>
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
    </div>
  }
}

const mapStateToProps = state => ({
  boards: state.boards.list
})

const mapDispatchToProps = {
  create: createProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
