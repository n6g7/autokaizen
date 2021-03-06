import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import caret from '@assets/caret.svg'

const StyledSection = styled.section`
  ${p =>
    !p.print &&
    css`
      @media print {
        display: none;
      }
    `}
`

const Caret = styled.img.attrs({
  alt: 'caret',
  src: caret,
})`
  transition: 0.5s;
  transform: rotate(${p => (p.up ? 0 : 180)}deg);
`

const Title = styled.h2`
  align-items: center;
  color: ${p => p.theme.text.darker};
  display: flex;
  flex-flow: row nowrap;
  font-size: 1em;
  justify-content: flex-start;
  margin: ${p => 2 * p.theme.spacing} 0;
  text-transform: uppercase;

  ${p =>
    p.onClick &&
    css`
      cursor: pointer;

      &:hover ${Caret} {
        opacity: 0.5;
      }
    `}

  ${Caret} {
    cursor: pointer;
    height: ${p => 2 * p.theme.spacing}px;
    margin: 0 ${p => p.theme.spacing}px;
    opacity: 0.3;
    width: ${p => 2 * p.theme.spacing}px;
  }

  @media print {
    display: none;
  }
`

const Content = styled.div`
  transition: 0.5s ease;

  ${p =>
    p.collapsible &&
    css`
      max-height: ${p => (p.collapsed ? 0 : 4000)}px;
      overflow: hidden;
    `}
`

class Section extends PureComponent {
  static propTypes = {
    collapsible: PropTypes.bool.isRequired,
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    collapsible: false,
  }

  state = {
    collapsed: true,
  }

  componentDidMount() {
    this.setState({
      collapsed: this.props.collapsible,
    })
  }

  toggle = () => this.setState(state => ({ collapsed: !state.collapsed }))

  render() {
    const { collapsible, children, title, ...props } = this.props
    const { collapsed } = this.state

    return (
      <StyledSection {...props}>
        <Title onClick={collapsible ? this.toggle : null}>
          {title}
          {collapsible && (
            <Caret title={collapsed ? 'Expand' : 'Collapse'} up={collapsed} />
          )}
        </Title>

        <Content collapsible={collapsible} collapsed={collapsed}>
          {children}
        </Content>
      </StyledSection>
    )
  }
}

export default Section
