import React from "react";
import ItemTypes from "../item-types";
import {DragSource} from "react-dnd";
import {ListItem} from "material-ui/List";

import {validateEndDrag} from "../logic/dnd";
/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const source = {
  beginDrag({control}) {
    return {control};
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const target = monitor.getDropResult();
    return validateEndDrag({item, target}).then(() => {
      //success
      return target.osNode.store.ui.requestCreate(target.osNode, item.control);
    }, () => {});
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
      <ListItem primaryText={this.props.control.displayName} />
    </div>);
  }
}

export default DragSource(ItemTypes.ELEMENT, source, connect)(Item);
