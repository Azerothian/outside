import React from "react";

export default function DropBox(props) {
  return (<div style={Object.assign({
    minHeight: 48,
    border: "1px dashed #DADADA",
    backgroundColor: "#eeeeee",
  }, props.style)} {...props} />);
}

DropBox.osDesigner = {
  disablePlaceholder: true,
};
