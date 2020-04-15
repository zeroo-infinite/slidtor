import React, { useContext, useState, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { Popover , Button as AntButton, Input, Modal} from 'antd';
import command, {insertImage} from '../../commands'

import Button from './Button';
import ImageButton from './ImageButton';
import EmbedButton from './EmbedButton';
import LinkButton from './LinkButton';
// import Icon from './Icon';
import Context from './Context';

const handleSelect = (type, editor) => {
  command(editor)(type);
};

export const bold = () => <Button type="bold" title="bold" />;
export const italic = () => <Button type="italic" title="italic" />;
export const underline = () => <Button type="underline" title="underline" />;
export const strikethrough = () => (
  <Button type="strikethrough" title="strikethrough" />
);
export const numberedlist = () => <Button type="numbered-list" title="numbered list" icon='orderedlist'/>;
export const bulletedlist = () => (
  <Button type="bulleted-item" title="bulleted list" icon='unorderedlist'/>
);

export const code = () => <Button type="code" title="code" />;
export const undo = () => <Button type="undo" title="undo" />;
export const redo = () => <Button type="redo" title="redo" />;
export const h1 = () => <Button type="heading-one" title="heading one" plain='h1' />;
export const h2 = () => <Button type="heading-two" title="heading two" plain='h2' />;
export const h3 = () => <Button type="heading-three" title="heading three" plain='h3'/>;

export const image =  (props) => (<ImageButton selection={props.selection}/>);
export const embed = (props) => (<EmbedButton selection={props.selection}/>);
export const link = (props) => (<LinkButton selection={props.selection}/>);

// export const Heading = () => {
//   // const { editor } = useContext(Context);
//   const editor = useSlate();
//   return (
//     <Select
//       defaultValue="paragraph"
//       size="small"
//       onSelect={v => handleSelect(v, editor)}
//     >
//       <Select.Option value="heading-one">h1</Select.Option>
//       <Select.Option value="heading-two">h2</Select.Option>
//       <Select.Option value="heading-three">h3</Select.Option>
//     </Select>
//   );
// };
// export const Align = () => {
//   const { editor } = useContext(Context);
//   return (
//     <Select
//       defaultValue="align-left"
//       size="small"
//       onSelect={v => handleSelect(v, editor)}
//     >
//       <Select.Option value="align-left">
//         <Tooltip title="align left">
//           <Icon type="icon-align-left" />
//         </Tooltip>
//       </Select.Option>
//       <Select.Option value="align-center">
//         <Tooltip title="align center">
//           <Icon type="icon-align-center" />
//         </Tooltip>
//       </Select.Option>
//       <Select.Option value="align-right">
//         <Tooltip title="align right">
//           <Icon type="icon-align-right" />
//         </Tooltip>
//       </Select.Option>
//       <Select.Option value="align-justify">
//         <Tooltip title="align justify">
//           <Icon type="icon-menu" />
//         </Tooltip>
//       </Select.Option>
//     </Select>
//   );
// };

// export const Table = () => {
//   const [isShowTablePicker, setTablePicker] = useState(false);
//   const { editor } = useContext(Context);

//   function handleClickPicker(row, column, event) {
//     event.stopPropagation();
//     command(editor)('table', row, column);
//     setTablePicker(false);
//   }
//   return (
//     <div className="tool-table-container">
//       {isShowTablePicker && <TablePicker onClick={handleClickPicker} />}
//       <Button
//         type="table"
//         title="表格"
//         onMouseDown={() => setTablePicker(isShow => !isShow)}
//       />
//     </div>
//   );
// };

export const FullScreen = () => {
  const [isFullscreen, setFullscreen] = useState(false);
  function toggleFullscreen() {
    setFullscreen(!isFullscreen);
  }
  useEffect(() => {
    window.addEventListener('fullscreen', toggleFullscreen);
    return () => {
      window.removeEventListener('fullscreen', toggleFullscreen);
    };
  });
  return isFullscreen ? (
    <Button type="fullscreen" icon="quxiaoquanping" title="取消全屏" />
  ) : (
    <Button type="fullscreen" icon="fullScreen" title="全屏" />
  );
};
