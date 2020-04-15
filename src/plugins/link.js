import isUrl from 'is-url'
import { Transforms, Editor, Range } from 'slate'

const withLinks = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor, selection, url, text) => {
  if (editor.selection || selection) {
    wrapLink(editor, url, text, selection)
  }
}

const removeLink = (editor) => {
  unwrapLink(editor)
}

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
  return !!link
}

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

const wrapLink = (editor, url, text=null, selection=null) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  if (selection == null)
    selection = editor.selection

  const isCollapsed = selection && Range.isCollapsed(selection)

  const link = {
    type: 'link',
    url: url,
    children: isCollapsed ? [{ text: text||url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link, {at: selection})
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

export { isLinkActive, insertLink, removeLink, withLinks };
