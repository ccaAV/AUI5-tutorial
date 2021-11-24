import {useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Spin} from "antd";
import React, {FC} from 'react'

export const Map: FC<WidgetPluginProps> = (props) => {

    let {isLoading, data, error} = useQueryResult({
        serverKey: "my-server",
        queryId: props.queryId,
        query: {
            mdx: `SELECT
                Crossjoin(
                  [Green-growth].[Year].[Year].Members,
                  [Measures].[Real GDP per capita (USD).MEAN]
                ) ON COLUMNS,
                [Countries].[Country].[Country_Name].Members ON ROWS
                FROM [Green-growth]`
        }
    });

    if (isLoading) {
        return <Spin/>
    }

    return (
        <div style={props.style}>
            Hello World!
        </div>
    )
}