import React, { useContext, useState } from 'react';
import { Popover , Input} from 'antd';
import {insertImage} from '../../commands'

import Button from './Button';
import Context from './Context';

const ImageButton = (props) => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState('');
  const {editor} = useContext(Context)

  const hide = () => {
    setVisible(false)
  };

  const handleVisibleChange = visible => {
    setVisible(visible)
  };
  
  const handleChange = (e) => {
    setUrl(e.target.value);
  }

  const keyPress = (e) => {
    if(e.keyCode === 13){
      insertImage(editor, props.selection, url)
      setUrl('');
      hide()
    }
  }
  
  const content = (
    <div>
      <Input size='small'
        value={url}
        onKeyDown={keyPress}
        onChange={handleChange}
        placeholder='image url'></Input>
    </div>
  )
  return (
    <Popover 
      content={content}
      visible={visible}
      trigger="click"
      onVisibleChange={handleVisibleChange}
    >
      <Button type='image'
        onMouseDown={() => handleVisibleChange(!visible)}
      />
    </Popover>
  )
};

export default ImageButton;
