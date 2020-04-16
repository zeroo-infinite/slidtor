import React from 'react'
import { useSelected, useFocused } from 'slate-react'
import { css } from 'emotion'

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()

  return (
    <div {...attributes}>
      <figure contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
          alt={element.url}
        />
        <figcaption></figcaption>
        {children}
      </figure>
    </div>
  )
}

export default ImageElement
