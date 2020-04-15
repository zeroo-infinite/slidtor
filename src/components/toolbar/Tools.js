import React from 'react';
import Button from './Button';
import ImageButton from './ImageButton';
import EmbedButton from './EmbedButton';
import LinkButton from './LinkButton';

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

