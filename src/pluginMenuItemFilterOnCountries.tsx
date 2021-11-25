import {MenuItemPlugin, MenuItemProps} from "@activeviam/activeui-sdk";
import React, {FC} from "react";
import {useIntl} from "react-intl";
import {MapWidgetState} from "./map.types";
import Menu from "antd/lib/menu";
import { MenuItemProps as AntMenuItemProps } from "antd/lib/menu/MenuItem";


const FilterOnCountriesMenuItem: FC<MenuItemProps<MapWidgetState>> = (props) => {

    let {formatMessage} = useIntl();

    const handleSelectCountry: AntMenuItemProps["onClick"] = (param) => {
        props.onClick?.(param);
    }

    return (
        <Menu.Item {...props} onClick={handleSelectCountry}>
            {formatMessage({
                id: "aui.plugins.menu-item.filter-on-countries.caption"
            })}
        </Menu.Item>
    )
}

export const pluginMenuItemFilterOnCountries: MenuItemPlugin<MapWidgetState> = {
    key: "filter-on-countries",
    Component: FilterOnCountriesMenuItem,
    translations: {
        "en-US": {
            caption: "Filter dashboard on countries"
        }
    }
}