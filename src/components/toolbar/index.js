import React from 'react'
import Button from './Button'
import * as Tools from './Tools'

export default class Toolbar extends React.Component {
  renderTool = (name) => {
    const Tool = Tools[name]
    return <Tool key={name} selection={this.props.selection} />
  }

  render() {
    const { tools } = this.props
    return (
      <div className="toolbar-cotnainer">
        {tools.map((tool, i) => {
          if (Array.isArray(tool)) {
            return (
              <Button.Group key={i}>
                {tool.map((name) => this.renderTool(name))}
              </Button.Group>
            )
          }
          return this.renderTool(tool)
        })}
      </div>
    )
  }
}
