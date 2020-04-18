# Slidtor
This is a project to make text editor using [Slate](https://github.com/ianstormtaylor/slate).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Usage

`yarn add slidtor`

```

import React from "react";
import Slidtor from "slidtor";
import "slidtor/build/index.css";

const initialValue = [
  {
    children: [
      {
        text: "In addition to block nodes, you can create inline nodes, like "
      },
      {
        type: "link",
        url: "https://en.wikipedia.org/wiki/Hypertext",
        children: [{ text: "hyperlinks" }]
      },
      {
        text: "!"
      }
    ]
  },
  {
    children: [
      {
        text:
          "This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected."
      }
    ]
  }
];

const tools = [
  ["bold", "italic", "underline", "strikethrough"],
  ["numberedlist", "bulletedlist"],
  ["h1", "h2", "h3"],
  ["blockquote", "code"],
  ["link", "image", "embed"]
];

export default function App() {
  const onValueChange = value => {
    console.log(value);
  };

  return (
    <div className="App">
      <Slidtor value={initialValue} tools={tools} onChange={onValueChange} />
    </div>
  );
}

```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
