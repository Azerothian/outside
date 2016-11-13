import React from "react";
import ItemTypes from "./item-types";
import {DragSource} from "react-dnd";

import Row from "web/os/ui/bootstrap/row";
import Col from "web/os/ui/bootstrap/col";

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const source = {
  beginDrag({tag}) {
    return {tag};
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const target = monitor.getDropResult();

    if (target && item) {
      const {defaults} = (item.tag.osDesigner || {});
      let props = {};
      let options = {};
      if (defaults) {
        props = defaults.props;
        options = defaults.options;
      }
      console.log("calling create", {tag: item.tag, props, options});
      return target.osNode.create(item.tag, props, options);
    }
    return undefined;
  }
};
function connect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}
//  //   "experimentalDecorators": true
// @DragSource(ItemTypes.ELEMENT, source, connect)
class Item extends React.Component {
  render() {
    const {isDragging, connectDragSource} = this.props;

    return connectDragSource(<div>
      <Row>
        <Col xs={2}>
          {"Icon"}
        </Col>
        <Col xs={10}>
          {this.props.tag.displayName}
        </Col>
      </Row>
    </div>);
  }
}

export default DragSource(ItemTypes.ELEMENT, source, connect)(Item);
