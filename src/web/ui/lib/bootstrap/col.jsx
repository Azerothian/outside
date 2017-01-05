import React from "react";
import Bootstrap from "./index";

const gridOptions = ["xs", "sm", "md", "lg"];

function getGridOptions(ext, props = {}) {
  let classNames = [];
  if (props[`${ext}Offset`]) {
    classNames.push(`col-${ext}-offset-${props[`${ext}Offset`]}`);
    delete props[`${ext}Offset`];
  }
  if (props[`${ext}`]) {
    classNames.push(`col-${ext}-${props[`${ext}`]}`);
    delete props[`${ext}`];
  }
  if (props[`visible${ext}`]) {
    classNames.push(`visible-${ext}`);
    delete props[`visible${ext}`];
  }

  if (classNames.length > 0) {
    if (!props.className) {
      props.className = "";
    }
    props.className += ` ${classNames.join(" ")}`;
  }
  return props;
}

export default function Col(props, context) {
  let propsData = gridOptions.reduce((prop, ext) => {
    return getGridOptions(ext, prop);
  }, Object.assign({}, props));
  return (<div {...propsData}>
    {props.children}
  </div>);
}
Col.displayName = "Column";


import ItemTypes from "web/ui/item-types";
import Text from "formsy-material-ui/lib/FormsyText";

Col.osDesigner = {
  requiredParent: {
    immediate: true,
    tag: Bootstrap.controls.Row,
  },
  renderInside: true,
  itemType: ItemTypes.ELEMENT,
  form() {
    return (<div>
      <Text name="className" fullWidth floatingLabelText="Class" />
      <Text name="xs" validations="isNumeric" fullWidth floatingLabelText="xs" />
      <Text name="sm" validations="isNumeric" fullWidth floatingLabelText="sm" />
      <Text name="md" validations="isNumeric" fullWidth floatingLabelText="md" />
      <Text name="lg" validations="isNumeric" fullWidth floatingLabelText="ls" />
    </div>);
  },
  processForm({className, xs, sm, md, lg}) {
    let props = {className};
    if (xs !== "") {
      props.xs = parseInt(xs);
    }
    if (sm !== "") {
      props.sm = parseInt(sm);
    }
    if (md !== "") {
      props.md = parseInt(md);
    }
    if (lg !== "") {
      props.lg = parseInt(lg);
    }
    return props;
  }
};
