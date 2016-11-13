import React from "react";
import Row from "./row";

export default function Grid(props) {
  let className = props.className || "";
  className += ` container${props.fluid ? "-fluid" : ""}`;
  let newProps = Object.assign({className}, props);
  if (newProps.fluid !== undefined) {
    delete newProps.fluid;
  }
  return (<div {...newProps}>{props.children}</div>);
}

Grid.displayName = "Grid";
Grid.osDesigner = {
  restrictTo: [Row]
};
