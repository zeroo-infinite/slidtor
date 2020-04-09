import React from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSelected, useFocused, useEditor } from 'slate-react'
import { css } from 'emotion'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text],  isVoid: true }
  
  Transforms.insertNodes(editor, image)
  // Editor.insertBreak(editor)
  // editor.insertBreak()
  // editor.insertText('Hello')
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }
  
  editor.insertBreak()
  return editor
}

const ImageNode = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const editor = useEditor()
  const { caption } = element

  return (
    <div {...attributes}>
      <figure contentEditable={false}>
        <img 
          src={element.url}
          className={css`
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
          alt={element.url}
        />
        <figcaption>
        </figcaption>
        {children}
      </figure>
    </div>
  )
}

const UrlInput = ({ caption, onChange }) => {
  const [value, setValue] = React.useState(caption)
  return (
    <input
      value={value}
      placeholder="caption"
      onClick={e => e.stopPropagation()}
      style={{
        marginTop: '5px',
        boxSizing: 'border-box',
      }}
      onChange={e => {
        const newCaption = e.target.value
        setValue({caption: newCaption})
        onChange({caption: newCaption})
      }}
    />
  )
}

export { insertImage, withImages, ImageNode }
