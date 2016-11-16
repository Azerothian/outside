import React from "react";
import Col from "./col";
export default function Row(props) {
  return (<div {...props} className={`row ${props.className || ""}`}/>);
}
Row.displayName = "Row";


import ItemTypes from "web/ui/item-types";
import Text from "formsy-material-ui/lib/FormsyText";

Row.osDesigner = {
  itemType: ItemTypes.ELEMENT,
  formValidDefault: true,
  form() {
    return (<div>
      <Text name="className" fullWidth floatingLabelText="Class" />
    </div>);
  },
};
