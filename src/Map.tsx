import {useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import React, {FC} from 'react'

export const Map: FC<WidgetPluginProps> = (props) => {

    let {isLoading, data, error} = useQueryResult({
        serverKey: "my-server",
        queryId: "abc",
        query: {
            mdx: "SELECT FROM [Green-growth]"
        }
    });

    console.log(isLoading, data);

    return (
        <div style={props.style}>
            Hello World!
        </div>
    )
}