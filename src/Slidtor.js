import React from 'react'
import PropTypes from 'prop-types'
import { TextEditor } from './components'
import 'antd/dist/antd.css'

class Slidtor extends React.Component {
  constructor(props) {
    super(props)
    this.editor = React.createRef()
    this.ref = React.createRef()
    this.state = {
      value: props.value,
    }
  }

  componentDidMount() {
    this.forceUpdate()
  }

  handleChange = (value) => {
    this.setState({ value })
    if (this.props.onChange) this.props.onChange(value)
  }

  render() {
    const { placeholder, tools } = this.props
    const { value } = this.state

    return (
      <div className="slidtor-container">
        <TextEditor
          value={value}
          placeholder={placeholder}
          tools={tools}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

Slidtor.propTypes = {
  placeholder: PropTypes.string,
  tools: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.array,
}

Slidtor.defaultProps = {
  placeholder: 'Type text here ...',
  tools: [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['numberedlist', 'bulletedlist'],
    ['h1', 'h2', 'h3'],
    ['link', 'image', 'embed'],
  ],
}

export default Slidtor
