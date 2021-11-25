import {CellSet, withQueryResult} from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import {Spin} from "antd";

import Plotly from "plotly.js/dist/plotly-geo";
import React, {useRef} from 'react'
import createPlotlyComponent from "react-plotly.js/factory";
import {MapWidgetState} from "./map.types";

const Plot = createPlotlyComponent(Plotly);


const getCountriesAndValues = (data? : CellSet): [string[], number[]] => {
    if (!data) {
        return [[],[]];
    }

    let [columnsAxis, rowsAxis] = data.axes;
    const numberOfCountries = rowsAxis.positions.length;

    const valueForSelectedYear = new Array(numberOfCountries).fill(null);
    data.cells.forEach((cell) => {
        valueForSelectedYear[cell.ordinal] = cell.value;
    })

    return [rowsAxis.positions.map(position => position[0].captionPath[2]), valueForSelectedYear]
}

export const Map = withQueryResult<MapWidgetState>((props) => {

    const container = useRef<HTMLDivElement>(null);
    let {height, width} = useComponentSize(container);
    let {isLoading, data, error} = props.queryResult

    let [countries, values] = getCountriesAndValues(data);


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
})