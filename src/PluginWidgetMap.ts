import {CellSetSelection, FiltersEditor, MdxSelect, parse, WidgetPlugin} from "@activeviam/activeui-sdk";
import {IconWorld} from "./IconWorld";
import { Map } from "./Map"
import {MapWidgetState} from "./map.types";
import {MapContentEditor} from "./MapContentEditor";

const widgetKey = "map"

export const pluginWidgetMap: WidgetPlugin<MapWidgetState, CellSetSelection> = {
    Component: Map,
    contentEditor: MapContentEditor,
    filtersEditor: FiltersEditor,
    Icon: IconWorld,
    initialState: {
        widgetKey,
        serverKey: "my-server",
        query: {
            mdx: parse<MdxSelect>(`SELECT
              [Measures].[Real GDP per capita (USD).MEAN] ON COLUMNS,
            [Countries].[Country].[Country_Name].Members ON ROWS
            FROM [Green-growth]`)
        },
        filters: [parse("[Green-growth].[Year].[2019]")]

    },
    key: widgetKey,
    translations: {
        "en-US": {
            defaultName: "default map",
            key: "Map",
            searchMeasures: "Search Map Measures"
        }
    }
}