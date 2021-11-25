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

    const {mdx} = props.widgetState.query;
    const currentMeasureName = getMeasures(mdx)[0].measureName;

    const dataModel = useDataModel("my-server");
    let cube = dataModel.catalogs[0].cubes[0];
    const measures = (dataModel? cube.measures: []).map((measure) => ({
        ...measure,
        isDisabled: measure.name === currentMeasureName
    }));

    const handleMeasureClicked = (measure: Measure & {isDisabled: boolean}) => {

        if(!cube) {
            return;
        }

        let parsedMdxWithoutCurrentMeasure = removeMeasure(mdx, {
            cube,
            measureName: currentMeasureName
        });

        let parsedMdxWithNewMeasure = addMeasure(parsedMdxWithoutCurrentMeasure, {
            cube,
            measureName: measure.name
        });

        props.onWidgetChange({
            ...props.widgetState,
            query: {
                mdx: parsedMdxWithNewMeasure
            }
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