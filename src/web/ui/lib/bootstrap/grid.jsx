import React from "react";
// import Row from "./row";

export default function Grid(props) {
  let className = `${props.className || ""} container${props.fluid ? "-fluid" : ""}`;
  let newProps = Object.assign({}, props, {className});
  if (newProps.fluid !== undefined) {
    delete newProps.fluid;
  }
  return (<div {...newProps}>{props.children}</div>);
}


import Toggle from "formsy-material-ui/lib/FormsyToggle";

import Text from "formsy-material-ui/lib/FormsyText";
import ItemTypes from "web/ui/item-types";

Grid.displayName = "Grid";
Grid.osDesigner = {
  itemType: ItemTypes.ELEMENT,
  formValidDefault: true,
  form() {
    return (<div>
      <Toggle name="fluid" label="Fluid Layout?" />
      <Text name="className" fullWidth floatingLabelText="Class" />
    </div>);
  },
};
