import { Editor, Transforms } from 'slate'
import isHotkey from 'is-hotkey'
import { isBlock, isMark } from '../scripts/utils'

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })

  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const insertImage = (editor, selection, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image, { at: selection })
}

export const insertEmbed = (editor, selection, url) => {
  const video = { type: 'video', url, children: [{ text: '' }] }
  Transforms.insertNodes(editor, video, { at: selection })
}

const command = (type, editor) => {
  if (isMark(type)) toggleMark(editor, type)
  if (isBlock(type)) toggleBlock(editor, type)
}

export default function (editor) {
  return (type, ...rest) => {
    command(type, editor)
  }
}

export const onKeyDown = (event, editor) => {
  Object.keys(HOTKEYS).some((key) => {
    if (isHotkey(key, event)) {
      event.preventDefault()
      HOTKEYS[key](event, editor)
      return true
    }
    return false
  })

  if (isEnter(event)) {
    onReturnKeyDown(event, editor)
    return true
  }

  return false
}

export const HOTKEYS = {
  'mod+b': (editor) => toggleMark(editor, 'bold'),
  'mod+i': (editor) => toggleMark(editor, 'italic'),
  'mod+u': (editor) => toggleMark(editor, 'underline'),
  'mod+`': (editor) => toggleMark(editor, 'code'),
  'shift+enter': (event, editor) => onShiftReturnKeyDown(event, editor),
}
const isEnter = (event) => {
  return event.key.toLocaleLowerCase() === 'enter'
}

const onShiftReturnKeyDown = (event, editor) => {
  event.preventDefault()
  if (
    isBlockActive(editor, 'code') ||
    isBlockActive(editor, 'image') ||
    isBlockActive(editor, 'video')
  )
    insertNewParagraph(editor)
  else editor.insertText('\n')
}

const onReturnKeyDown = (event, editor) => {
  if (isBlockActive(editor, 'image') || isBlockActive(editor, 'video'))
    insertNewParagraph(editor)
}

const insertNewParagraph = (editor) => {
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  })
}
