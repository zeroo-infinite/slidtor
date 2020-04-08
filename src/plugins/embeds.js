import React from 'react'
import { Transforms } from 'slate'
import {
  useEditor,
  ReactEditor,
} from 'slate-react'


const insertEmbedUrl = (editor, url) => {
  const video = { type: 'video', url, children: [{ text: ''}] }
  Transforms.setNodes(editor, video)
}

const withEmbeds = editor => {
  const { isVoid } = editor
  editor.isVoid = element => (element.type === 'video' ? true : isVoid(element))
  return editor
}

const VideoElement = ({ attributes, children, element }) => {
  const editor = useEditor()
  const { url } = element
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: '75% 0 0 0',
            position: 'relative',
          }}
        >
          <iframe
            src={`${url}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <UrlInput
          url={url}
          onChange={val => {
            const path = ReactEditor.findPath(editor, element)
            Transforms.setNodes(editor, { url: val }, { at: path })
          }}
        />
      </div>
      {children}
    </div>
  )
}

const UrlInput = ({ url, onChange }) => {
  const [value, setValue] = React.useState(url)
  return (
    <input
      value={value}
      onClick={e => e.stopPropagation()}
      style={{
        marginTop: '5px',
        boxSizing: 'border-box',
      }}
      onChange={e => {
        const newUrl = e.target.value
        setValue(newUrl)
        onChange(newUrl)
      }}
    />
  )
}

export { insertEmbedUrl, withEmbeds, VideoElement }
