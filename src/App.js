import React, { useState } from 'react'
import Slidtor from './Slidtor'
import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  // JSON.parse(localStorage.getItem('content')) ||
  const [value, setValue] = useState(initialValue)

  const onChange = (value) => {
    setValue(value)
    saveInLocalStorage(value)
  }

  const saveInLocalStorage = (value) => {
    const content = JSON.stringify(value)
    localStorage.setItem('content', content)
  }

  return (
    <div className="App">
      <Slidtor value={value} tools={tools} onChange={onChange} />
    </div>
  )
}

const initialValue = [
  {
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
      },
      {
        text: '!',
      },
    ],
  },
  {
    children: [
      {
        text:
          'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
      },
    ],
  },
]

const tools = [
  ['bold', 'italic', 'underline', 'strikethrough'],
  ['numberedlist', 'bulletedlist'],
  ['h1', 'h2', 'h3'],
  ['blockquote', 'code'],
  ['link', 'image', 'embed'],
]

export default App
