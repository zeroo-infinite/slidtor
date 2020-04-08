import React, { Component } from 'react';
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

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <TextEditor />
      </div>
    );
  }
};
