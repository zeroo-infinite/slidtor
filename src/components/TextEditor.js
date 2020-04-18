import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import { onKeyDown } from '../commands'
import { withImages } from '../plugins/image'
import { withEmbeds } from '../plugins/embeds'
import { withLinks } from '../plugins/link'
import { withTables } from '../plugins/table'

import Toolbar from './toolbar'
import Element from './elements'
import Leaf from './leafs'

const TextEditor = (props) => {
  const [value, setValue] = useState(props.value)
  const [selection, setSelection] = useState({})
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const withAllPlugins = (editor) => {
    ;[withTables, withLinks, withImages, withEmbeds].forEach((plugin) => {
      if (typeof plugin == 'function') plugin(editor)
    })
    return editor
  }
  const editor = useMemo(
    () => withAllPlugins(withHistory(withReact(createEditor()))),
    [],
  )

  const onValueChange = (value) => {
    setValue(value)
    if (editor.selection && editor.selection !== null)
      setSelection(editor.selection)

    if (props.onChange) props.onChange(value)
  }

  return (
    <Slate editor={editor} value={value} onChange={onValueChange}>
      <Toolbar editor={editor} selection={selection} tools={props.tools} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={props.placeholder}
        spellCheck
        autoFocus
        onKeyDown={(event, change, next) =>
          onKeyDown(event, editor, change, next)
        }
      />
    </Slate>
  )
}

export default TextEditor
