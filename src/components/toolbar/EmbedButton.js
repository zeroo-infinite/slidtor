import React, { useContext, useState } from 'react';
import { Popover , Input} from 'antd';
import {insertEmbed} from '../../commands'

import Button from './Button';
import Context from './Context';

const EmbedButton = (props) => {
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
      insertEmbed(editor, props.selection, url)
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
        placeholder='embed url'></Input>
    </div>
  )
  return (
    <Popover 
      content={content}
      visible={visible}
      trigger="click"
      onVisibleChange={handleVisibleChange}
    >
      <Button type='embed'
        onMouseDown={() => handleVisibleChange(!visible)}
        icon='video'
      />
    </Popover>
  )
};

export default EmbedButton;