import React from "react";
import Col from "./col";
export default function Row(props) {
  return (<div {...props} className={`row ${props.className || ""}`}/>);
}
Row.displayName = "Row";
Row.osDesigner = {
  restrictTo: [Col]
};
