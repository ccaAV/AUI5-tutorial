import {WidgetPluginProps} from "@activeviam/activeui-sdk";
import React, {FC} from 'react'

export const Map: FC<WidgetPluginProps> = (props) => {
    return (
        <div style={props.style}>
            Hello World!
        </div>
    )
}