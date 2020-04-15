import { Editor } from 'slate'

export const isBlock = (type) => {
  return ['block-quote', 'heading-one', 'bulleted-list', 'heading-one', 'heading-two',
   'numbered-list', 'link'].includes(type);
}

export const isMark = (type) => {
  return ['bold', 'code', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'strikethrough'].includes(type);
}

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export function isActive(editor, format) {
  if(isMark(format)){
    return isMarkActive(editor, format)
  } else if (isBlock(format)) {
    return isBlockActive(editor, format)
  }
  return false;
}
