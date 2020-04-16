import React from 'react'
import { useSelected, useFocused } from 'slate-react'
import { css } from 'emotion'

const VideoElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const { url } = element
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: '65% 0 0 0',
            position: 'relative',
          }}
          className={css`
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}>
          <iframe
            src={`${url}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            title={url}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      {children}
    </div>
  )
}

export default VideoElement
