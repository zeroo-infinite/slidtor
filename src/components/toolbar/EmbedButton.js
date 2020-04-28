import React, { useState } from 'react'
import { useSlate } from 'slate-react'
import { Popover, Input } from 'antd'
import { css } from 'emotion'
import { insertEmbed } from '../../commands'

import Button from './Button'

const EmbedButton = (props) => {
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')
  const editor = useSlate()

  const hide = () => {
    setVisible(false)
  }

  const handleVisibleChange = (visible) => {
    setVisible(visible)
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      insertEmbed(editor, props.selection, url)
      setUrl('')
      hide()
    }
  }

  const content = (
    <Input
      size="small"
      value={url}
      className={css`
        width: 16rem;
      `}
      onKeyDown={keyPress}
      onChange={handleChange}
      placeholder="embed url"></Input>
  )
  return (
    <Popover
      content={content}
      visible={visible}
      trigger="click"
      onVisibleChange={handleVisibleChange}>
      <Button
        type="embed"
        onMouseDown={() => handleVisibleChange(!visible)}
        icon="video"
      />
    </Popover>
  )
}

export default EmbedButton
