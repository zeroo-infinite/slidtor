import React, { useState } from 'react'
import { Node } from 'slate'
import { useSlate } from 'slate-react'
import { Popover, Input } from 'antd'
import isUrl from 'is-url'
import { isLinkActive, insertLink, removeLink } from '../../plugins/link'

import Button from './Button'

const LinkButton = (props) => {
  const editor = useSlate()
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  const hide = () => {
    setVisible(false)
  }

  const handleVisibleChange = (visible) => {
    if (isLinkActive(editor)) {
      removeLink(editor)
    } else {
      const word = word_selection(editor)
      setText(word)
      setVisible(visible)
    }
  }

  const handleLinkChange = (e) => {
    setUrl(e.target.value)
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      if (url.length < 1 && isUrl(url)) return

      insertLink(editor, props.selection, url, text)
      setUrl('')
      setText('')
      hide()
    }
  }

  const content = (
    <div>
      <Input
        size="small"
        type="url"
        value={url}
        onKeyDown={keyPress}
        onChange={handleLinkChange}
        placeholder="link"></Input>
      <Input
        size="small"
        type="text"
        value={text}
        onKeyDown={keyPress}
        onChange={handleTextChange}
        placeholder="text"></Input>
    </div>
  )
  return (
    <Popover
      content={content}
      visible={visible}
      trigger="click"
      onVisibleChange={handleVisibleChange}>
      <Button type="link" onMouseDown={() => handleVisibleChange(!visible)} />
    </Popover>
  )
}

export const word_selection = (editor) => {
  let text = ''
  if (editor.selection) {
    text = Node.fragment(editor, editor.selection)
  }

  if (text) {
    text = text[0].children[0].text
  } else {
    text = text[0] || ''
  }

  return text
}

export default LinkButton
