import React, { useEffect, useMemo, useState } from "react";
import { createEditor } from 'slate'
import { Slate, Editable, withReact  } from 'slate-react'


const initialValue = [
  {
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
];

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);


  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable />
    </Slate>
  )
  
};

export default TextEditor;