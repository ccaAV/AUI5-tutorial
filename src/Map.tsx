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

    if (error) {
        return (<div>{error.stackTrace}</div>)
    }

    if (!data){
        return null;
    }

    let [columnAxis, rowsAxis] = data.axes;
    let numberOfColumns = columnAxis.positions.length;

    console.log(data);

    return (
        <table>
            <tr>
                <th/>
                {columnAxis.positions.map((position, columnIndex) => (
                    <th key={columnIndex}> {position[0].captionPath[0]}</th>
                ))}
            </tr>
            {rowsAxis.positions.map((position, rowIndex) => {
                const tableCells: JSX.Element[] = [];
                tableCells.push(<td key={0}>{position[0].captionPath[2]}</td>);
                for (let columnIndex = 0; columnIndex < numberOfColumns ; columnIndex++) {
                    const cellIndex = rowIndex * numberOfColumns + columnIndex;
                    const dataCell = data.cells[cellIndex];
                    tableCells.push(
                        <td key={columnIndex + 1}>{dataCell?.formattedValue}</td>
                    )
                }

                return <tr key={rowIndex}>{tableCells}</tr>

            })}
        </table>
    )
}