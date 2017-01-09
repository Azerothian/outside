import React from "react";

export default function DropBox(props) {
  return (<div style={Object.assign({
    minHeight: 48,
    width: "100%",
    border: "1px dashed #DADADA",
    backgroundColor: "#eeeeee",
  }, props.style)} />);
}

DropBox.osDesigner = {
  disablePlaceholder: true,
};
