import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import { ToolbarMenu } from './toolbarMenu'
import { onKeyDown } from '../scripts/EditorHelper'
import { withImages, ImageNode } from '../plugins/image'
import { withEmbeds, VideoElement } from '../plugins/embeds'

const TextEditor = (props) => {
  const [value, setValue] = useState(props.value)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withImages(withEmbeds(withHistory(withReact(createEditor())))), 
    []
  )

  const onValueChange = value => {
    setValue(value);
    if (props.onValueChange)
      props.onValueChange(value);
  }

  return (
    <Slate editor={editor} value={value} onChange={onValueChange}>

      <ToolbarMenu />

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event,  change, next) => onKeyDown(event, editor, change, next) }
      />
    </Slate>
  )
}

const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'image':
      return <ImageNode {...props} />
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'video':
      return <VideoElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export default TextEditor;
