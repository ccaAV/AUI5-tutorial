import {CellSet, useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Spin} from "antd";
import React, {FC} from 'react'
import Plot from "react-plotly.js";


const getCountriesAndValues = (data?: CellSet): [string[], number[]] => {
    if (!data) {
        return [[],[]];
    } else {
        const [columnsAxis, rowsAxis] = data.axes;
        const numberOfYears = columnsAxis.positions.length;
        const numberOfCountries = rowsAxis.positions.length;

        const valueForSelectedYear = new Array(numberOfCountries).fill(null);
        data.cells.forEach(cell => {
            const rowIndex = Math.floor(cell.ordinal / numberOfYears);
            let columnIndex = cell.ordinal % numberOfYears;
            const year = columnsAxis.positions[columnIndex][0].captionPath[0];

            if (year === '2019') {
                valueForSelectedYear[rowIndex] = cell.value;
            }
        });

        return [rowsAxis.positions.map(position => position[0].captionPath[2]), valueForSelectedYear]

    }
}


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

    let [columnsAxis, rowsAxis] = data.axes;
    let numberOfColumns = columnsAxis.positions.length;

    let [countries, values] = getCountriesAndValues(data);
    console.log(isLoading, data, countries, values);

    // return (
    //     <table>
    //         <tr>
    //             <th/>
    //             {columnsAxis.positions.map((position, columnIndex) => (
    //                 <th key={columnIndex}> {position[0].captionPath[0]}</th>
    //             ))}
    //         </tr>
    //         {rowsAxis.positions.map((position, rowIndex) => {
    //             const tableCells: JSX.Element[] = [];
    //             tableCells.push(<td key={0}>{position[0].captionPath[2]}</td>);
    //             for (let columnIndex = 0; columnIndex < numberOfColumns ; columnIndex++) {
    //                 const cellIndex = rowIndex * numberOfColumns + columnIndex;
    //                 const dataCell = data.cells[cellIndex];
    //                 tableCells.push(
    //                     <td key={columnIndex + 1}>{dataCell?.formattedValue}</td>
    //                 )
    //             }
    //
    //             return <tr key={rowIndex}>{tableCells}</tr>
    //
    //         })}
    //     </table>
    // )

    return (
        <div style={{...props.style, height: "100%",}}>
         <Plot
             data={[
                 {
                     type: "choropleth",
                     locationmode: "country names",
                     locations: countries,
                     z: values,
                     text: countries,
                     // @ts-ignore
                     autocolorscale: true,
                 },
           ]}
         />
       </div>
    );
}