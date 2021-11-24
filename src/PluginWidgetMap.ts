import {WidgetPlugin} from "@activeviam/activeui-sdk";
import {IconWorld} from "./IconWorld";
import { Map } from "./Map"

const widgetKey = "map"

export const pluginWidgetMap: WidgetPlugin = {
    Component: Map,
    Icon: IconWorld,
    initialState: {
        widgetKey
    },
    key: widgetKey,
    translations: {
        "en-US": {
            defaultName: "default map",
            key: "Map"
        }
    }
}