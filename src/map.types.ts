import {AWidgetState, MdxSelect, MdxString, Query} from "@activeviam/activeui-sdk";


export interface MapWidgetState extends AWidgetState {
    query: Query<MdxSelect>
    serverKey: string
}