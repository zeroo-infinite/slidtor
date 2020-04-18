import React, { useState } from 'react'
import { useSlate } from 'slate-react'
import TableSelector from '../table/TableSelector'
import { Popover } from 'antd'
import Button from './Button'
import { insertTable } from '../../plugins/table'

const TableButton = (props) => {
  const [visible, setVisible] = useState(false)
  const editor = useSlate()

  const handleClickPicker = (row, column, event) => {
    event.stopPropagation()
    insertTable(editor, row, column)
    setVisible(false)
  }

  const handleVisibleChange = (visible) => {
    setVisible(visible)
  }

  return (
    <Popover
      content={<TableSelector onClick={handleClickPicker} />}
      visible={visible}
      trigger="click"
      onVisibleChange={handleVisibleChange}>
      <Button
        type="table"
        title="table"
        onMouseDown={() => handleVisibleChange(!visible)}
      />
    </Popover>
  )
}

export default TableButton
