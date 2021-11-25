import {
    addMeasure,
    EditorProps,
    getMeasures,
    Measure,
    removeMeasure,
    Tree,
    useDataModel
} from "@activeviam/activeui-sdk";
import React, {FC} from "react";
import {MapWidgetState} from "./map.types";


export const MapContentEditor: FC<EditorProps<MapWidgetState>> = (props) => {

    const dataModel = useDataModel("my-server");
    const cube = dataModel? dataModel.catalogs[0].cubes[0] :null;
    const {mdx} = props.widgetState.query;
    const currentMeasureName = getMeasures(mdx)[0].measureName;
    const measures = (cube? cube.measures: []).map(measure => ({
        ...measure,
        isDisabled: measure.name === currentMeasureName
    }));

    const handleMeasureClicked = (measure: Measure & {isDisabled: boolean}) => {

        if (!cube) {
            return;
        }

        let parsedWithoutMeasure = removeMeasure(mdx, {
            cube,
            measureName: currentMeasureName
        });

        let parsedWithNewMeasure = addMeasure(parsedWithoutMeasure, {
            cube,
            measureName: measure.name
        });

        props.onWidgetChange({
            ...props.widgetState,
            query: {
                mdx: parsedWithNewMeasure
            }
        })
    }




    return (
        <Tree
            isSearchVisible={true}
            searchPlaceholder={"Search Measures"}
            onClick={handleMeasureClicked}
            value={measures}
        />
    )
}
