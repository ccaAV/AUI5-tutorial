import {
    addMeasure,
    EditorProps,
    getMeasures,
    MdxSelect,
    Measure,
    parse,
    removeMeasure, stringify,
    Tree,
    useDataModel
} from "@activeviam/activeui-sdk";
import React, {FC} from "react";
import {useIntl} from "react-intl";
import {MapWidgetState} from "./map.types";


export const MapContentEditor: FC<EditorProps<MapWidgetState>> = (props) => {

    let {formatMessage} = useIntl();

    const dataModel = useDataModel("my-server");
    let cube = dataModel.catalogs[0].cubes[0];
    const measures = dataModel? cube.measures: [];

    const handleMeasureClicked = (measure: Measure) => {

        if(!cube) {
            return;
        }

        const currentMdx = props.widgetState.mdx;
        console.log(`current mdx: ${currentMdx}`);
        const parsedMdx = parse<MdxSelect>(currentMdx);
        let currentMeasureName = getMeasures(parsedMdx)[0].measureName;
        console.log(currentMeasureName);
        let parsedMdxWithoutCurrentMeasure = removeMeasure(parsedMdx, {
            cube,
            measureName: currentMeasureName
        });

        let parsedMdxWithNewMeasure = addMeasure(parsedMdxWithoutCurrentMeasure, {
            cube,
            measureName: measure.name
        });

        console.log(`new measure name: ${measure.name}`)
        let newMdx = stringify(parsedMdxWithNewMeasure);
        console.log(`new mdx: ${newMdx}`)

        props.onWidgetChange({
            ...props.widgetState,
            mdx: newMdx
        })
    }

    return (
      <Tree
          isSearchVisible={true}
          onClick={handleMeasureClicked}
          searchPlaceholder={formatMessage({id: "aui.plugins.widget.map.searchMeasures"})}
          value={measures}
      />
    );
}