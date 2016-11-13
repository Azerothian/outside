import React from "react";

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
Col.osDesigner = {
  renderInside: true,
  defaults: {
    props: {
      xs: 12,
    },
  }
};
