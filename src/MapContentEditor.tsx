import {EditorProps, Tree, useDataModel} from "@activeviam/activeui-sdk";
import React, {FC} from "react";


export const MapContentEditor: FC<EditorProps> = (props) => {

    const dataModel = useDataModel("my-server");
    const measures = dataModel? dataModel.catalogs[0].cubes[0].measures: [];


    return (
        <Tree
            isSearchVisible={true}
            searchPlaceholder={"Search Measures"}
            value={measures}
        />
    )
}
