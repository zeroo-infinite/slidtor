import React from 'react'
import { useSlate } from 'slate-react'
import { Button as AntButton, Tooltip } from 'antd'
import command from '../../commands'
import * as utils from '../../scripts/utils'

import Icon from './Icon'

const Button = React.forwardRef(({ ...props }, ref) => {
  const { type, title, icon, plain, onMouseDown } = props
  const editor = useSlate()

  const handleMouseDown = (event) => {
    event.preventDefault()
    if (onMouseDown) {
      onMouseDown()
    } else {
      command(editor)(type)
    }
  }

  const isActive = () => {
    return utils.isActive(editor, type)
  }

  return (
    <Tooltip title={title || type}>
      <AntButton
        ref={ref}
        size="small"
        onMouseDown={handleMouseDown}
        type={isActive() ? 'primary' : ''}>
        {plain ? plain : <Icon type={`icon-${icon || type}`} />}
      </AntButton>
    </Tooltip>
  )
})
Button.Group = AntButton.Group
// Button.contextType = Context

export default Button
