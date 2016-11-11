import React from "react";
export default function Row(props) {
  return (<div {...props} className={`row ${props.className || ""}`}/>);
}

Row.displayName = "Row";