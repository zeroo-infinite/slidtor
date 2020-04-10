import React, { useState } from 'react';
import logo from './logo.svg';
import { TextEditor } from './components';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <TextEditor />
//     </div>
//   );
// }

const App = () => {
  // JSON.parse(localStorage.getItem('content')) || 
  const [value, setValue] = useState(initialValue);

  const onValueChange = value => {
    setValue(value);
    saveInLocalStorage(value);
  };

  const saveInLocalStorage = value => {
    const content = JSON.stringify(value);
    localStorage.setItem('content', content);
    console.log(content);
  }

  return (
    <div className="App">
      <TextEditor
        value={value}
        onValueChange={onValueChange} />
    </div>
  );
};

const initialValue = [
  {
    type: 'heading-one',
    children: [{ text: 'A wise quote.' }],
  },
    {
    type: 'video',
    url: 'https://player.vimeo.com/video/26689853',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default App;
