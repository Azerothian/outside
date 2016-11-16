import React from "react";
import ItemTypes from "../item-types";
import {DragSource} from "react-dnd";
import {ListItem} from "material-ui/List";

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

    if (target && item) {
      // const {defaults} = (item.control.osDesigner || {});
      // let props = {};
      // let options = {};
      // if (defaults) {
      //   props = defaults.props;
      //   options = defaults.options;
      // }
      // console.log("calling create", {control: item.control, props, options});
      // return target.osNode.create(item.control, props, options);
      console.log("target", target);
      const itemType = (target.osNode.tag.osDesigner || {}).itemType || ItemTypes.ELEMENT;
      console.log("itemType", itemType);
      if (itemType === ItemTypes.ELEMENT) {
        return target.osNode.store.ui.requestCreate(target.osNode, item.control);
      }
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
      <ListItem primaryText={this.props.control.displayName} />
    </div>);
  }
}

export default DragSource(ItemTypes.ELEMENT, source, connect)(Item);
