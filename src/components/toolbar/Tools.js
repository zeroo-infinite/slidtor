import React from 'react'
import Button from './Button'
import ImageButton from './ImageButton'
import EmbedButton from './EmbedButton'
import LinkButton from './LinkButton'
import TableButton from './TableButton'

export const bold = () => <Button type="bold" title="bold" />
export const italic = () => <Button type="italic" title="italic" />
export const underline = () => <Button type="underline" title="underline" />
export const strikethrough = () => (
  <Button type="strikethrough" title="strikethrough" />
)
export const numberedlist = () => (
  <Button type="numbered-list" title="numbered list" icon="orderedlist" />
)
export const bulletedlist = () => (
  <Button type="bulleted-item" title="bulleted list" icon="unorderedlist" />
)
export const blockquote = () => (
  <Button type="block-quote" title="blockquote" plain=" '' " />
)
export const code = () => <Button type="code" title="code" />
export const undo = () => <Button type="undo" title="undo" />
export const redo = () => <Button type="redo" title="redo" />
export const h1 = () => (
  <Button type="heading-one" title="heading one" plain="h1" />
)
export const h2 = () => (
  <Button type="heading-two" title="heading two" plain="h2" />
)
export const h3 = () => (
  <Button type="heading-three" title="heading three" plain="h3" />
)
export const alignleft = () => <Button type="align-left" title="align left" />
export const aligncenter = () => (
  <Button type="align-center" title="align center" />
)
export const alignright = () => (
  <Button type="align-right" title="align right" />
)
export const alignjustify = () => (
  <Button type="align-justify" title="align justify" icon="menu" />
)

export const image = (props) => <ImageButton selection={props.selection} />
export const embed = (props) => <EmbedButton selection={props.selection} />
export const link = (props) => <LinkButton selection={props.selection} />
export const table = (props) => <TableButton selection={props.selection} />
