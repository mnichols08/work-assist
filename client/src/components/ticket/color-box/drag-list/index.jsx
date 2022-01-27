import React from 'react'
import DragBox from '../drag-box'
import { SortableContainer } from 'react-sortable-hoc'

const DragList = SortableContainer(({ colors, removeColor }) => {
    return (
        <div style={{ height: '100%' }}>
            {colors.map((color, i) => (
                <DragBox
                    index={i}
                    key={ color.name }
                    color={ color.color }
                    name={ color.name }
                    handleClick={() => removeColor(color.name)}
                />
            ))}
        </div>
    )
})

export default DragList