import React from 'react';
import { TextEditor } from './components';
import 'antd/dist/antd.css'


export default class Slidtor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.ref = React.createRef();
    this.state = {
      value: props.value
    }
  }

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = value => {
    this.setState({
      value
    });
    this.props.onChange(value);
  };

  render() {
    const { placeholder, tools } = this.props;
    const { value } = this.state;

    return (
      <div className="slidtor-container">
        <TextEditor
          value={value}
          placeholder={placeholder}
          tools={tools}
          onChange={this.handleChange} />
      </div>
    )
  }
}

Slidtor.defaultProps = {
  placeholder: 'Type text here ...',
  tools: [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['numberedlist', 'bulletedlist'],
    ['h1','h2','h3'],
    ['link', 'image','embed'],
  ]
}