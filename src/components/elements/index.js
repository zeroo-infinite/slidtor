import React from 'react'
import ImageElement from './ImageElement'
import VideoElement from './VideoElement'

const Element = (props) => {
  const { attributes, children, element } = props

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
      return <ImageElement {...props} />
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'video':
      return <VideoElement {...props} />
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      )
    case 'align-left':
      return (
        <div className="align-left" {...attributes}>
          {children}
        </div>
      )
    case 'align-center':
      return (
        <div className="align-center" {...attributes}>
          {children}
        </div>
      )
    case 'align-right':
      return (
        <div className="align-right" {...attributes}>
          {children}
        </div>
      )
    case 'align-justify':
      return (
        <div className="align-justify" {...attributes}>
          {children}
        </div>
      )
    case 'table':
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-cell':
      return <td {...attributes}>{children}</td>
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Element
