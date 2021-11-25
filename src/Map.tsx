import {CellSet, stringify, useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import {Spin} from "antd";
import React, {FC, useMemo, useRef} from 'react'

import Plotly from "plotly.js/dist/plotly-geo";
import createPlotlyComponent from "react-plotly.js/factory";
import {MapWidgetState} from "./map.types";
const Plot = createPlotlyComponent(Plotly);


const getCountriesAndValues = (data? : CellSet): [string[], number[]] => {
    if (!data) {
        return [[],[]];
    }

    let [columnsAxis, rowsAxis] = data.axes;

    const numberOfYears = columnsAxis.positions.length;
    const numberOfCountries = rowsAxis.positions.length;

    const valueForSelectedYear = new Array(numberOfCountries).fill(null);
    data.cells.forEach((cell) => {
        const rowIndex = Math.floor(cell.ordinal / numberOfYears);
        const columnIndex = cell.ordinal % numberOfYears;
        const year = columnsAxis.positions[columnIndex][0].captionPath[0];

        if (year === "2019") {
            valueForSelectedYear[rowIndex] = cell.value;
        }
    })

    return [rowsAxis.positions.map(position => position[0].captionPath[2]), valueForSelectedYear]
}

export const Map: FC<WidgetPluginProps<MapWidgetState>> = (props) => {

    const container = useRef<HTMLDivElement>(null);
    let {height, width} = useComponentSize(container);

    const {mdx} = props.widgetState.query;
    const stringifiedMdx = useMemo(() => stringify(mdx), [mdx]);
    let {isLoading, data, error} = useQueryResult({
        serverKey: "my-server",
        queryId: props.queryId,
        query: {
            mdx: stringifiedMdx
        }
    });

    let [countries, values] = getCountriesAndValues(data);

    // return (
    //    <table>
    //        <tr>
    //            <th/>
    //            {columnsAxis.positions.map((position, columnIndex) => (
    //                <th key={columnIndex}>
    //                    {position[0].captionPath[0]}
    //                </th>
    //            ))
    //            }
    //        </tr>
    //        {rowsAxis.positions.map((position, rowIndex: number) => {
    //            const tableCells: JSX.Element[] = [];
    //            tableCells.push(<td key={0}>{position[0].captionPath[2]}</td>);
    //
    //            for (let columnIndex = 0 ; columnIndex < numberOfColumns ; columnIndex ++) {
    //                const cellIndex = rowIndex * numberOfColumns + columnIndex;
    //                const dataCell = data.cells[cellIndex];
    //
    //                tableCells.push(
    //                    <td key = {columnIndex +1}>{dataCell?.formattedValue}</td>
    //                )
    //            }
    //
    //            return <tr key={rowIndex}>{tableCells}</tr>
    //        })}
    //    </table>
    // )

    return (
        <div ref={container} style={{...props.style, height: "100%"}}>
            {
                error? (
                    <div>{error.stackTrace}</div>
                ) : isLoading? (
                    <Spin/>
                ) : (
                    <Plot
                        data={[{
                        type: "choropleth",
                        locationmode: "country names",
                        locations: countries,
                        z: values,
                        text: countries,
                        // @ts-ignore
                        autocolorscale: true
                    },
                    ]}
                        layout={{height, width}}
                    />
                )
            }
        </div>
    )
}