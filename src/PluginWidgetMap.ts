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
            Crossjoin(
              [Green-growth].[Year].[Year].Members,
              [Measures].[Real GDP per capita (USD).MEAN]
            ) ON COLUMNS,
            [Countries].[Country].[Country_Name].Members ON ROWS
            FROM [Green-growth]`)
    }

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