import React, {PropTypes} from "react";
import {findDOMNode} from "react-dom";
import ItemTypes from "./item-types";
import {DragSource, DropTarget} from "react-dnd";

import ActionDelete from "material-ui/svg-icons/action/delete";

const placeholderSource = {
  beginDrag({osNode}) {
    return {osNode};
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const target = monitor.getDropResult();

    if (target && item) {
      const itemType = (target.osNode.tag.osDesigner || {}).itemType || ItemTypes.ELEMENT;
      if (itemType === ItemTypes.ELEMENT) {
        if (item.osNode.id.toString() !== target.osNode.id.toString()) {
          //console.log("drop result", {item: item.osNode.id.toString(), target: target.osNode.id.toString()});
          target.osNode.add(item.osNode.id);
        }
      }
    }
  }
};
const placeholderTarget = {
  drop({osNode}, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return undefined;
    }
    return {osNode};
  },
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don"t replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we"re mutating the monitor item here!
    // Generally it"s better to avoid mutations,
    // but it"s good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({shallow: true}),
  };
}


export default DragSource(ItemTypes.ELEMENT, placeholderSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(DropTarget(ItemTypes.ELEMENT, placeholderTarget, collect)(React.createClass({
  propTypes: {
    isOver: PropTypes.bool.isRequired,
    // inside: PropTypes.bool.
  },
  componentWillMount() {
    // const {id} = this.props.osNode;
    // this.store = this.props.osNode.store;
    // this.store.on(`${id.toString()}:add-child`, this.handleUpdate);
    // this.store.on(`${id.toString()}:remove-child`, this.handleUpdate);
  },
  componentWillUnMount() {
    // const {id} = this.props.osNode;
    // this.store.off(`${id.toString()}:add-child`, this.handleUpdate);
    // this.store.off(`${id.toString()}:remove-child`, this.handleUpdate);
  },
  handleDeleteRequest() {
    return this.props.osNode.store.ui.requestDelete(this.props.osNode, this.props.tag);
  },
  handleUpdate() {
    console.log("updating", this.props.osNode.id);
    return this.forceUpdate();
  },
  render() {
    console.log("rendering", this.props.osNode.id);
    const {connectDropTarget, connectDragSource, isOver} = this.props;
    let color = "rgba(0, 0, 0, 0.1)";
    if (isOver) {
      color = "rgba(0, 0, 0, 0.8)";
    }
    let name = "Element";
    let id = this.props.osNode.id.toString();
    if (this.props.osNode.name) {
      name = this.props.osNode.name;
    } else if (this.props.osNode.tag.displayName) {
      name = this.props.osNode.tag.displayName;
    } else if (typeof this.props.osNode.tag === "string") {
      name = this.props.osNode.tag;
    }
    return connectDragSource(connectDropTarget(<div style={{
      position: "relative",
      minHeight: 40,
      border: `1px solid ${color}`,
      paddingTop: 19,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 300,
        height: 20,
        borderRight: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        textAlign: "center",
        color: color,
      }}>
        {id}
      </div>
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: 100,
        height: 20,
        borderLeft: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        textAlign: "center",
        color: color,
      }}>
        {name}
        <ActionDelete onTouchTap={this.handleDeleteRequest} />
      </div>
      {this.props.children}
    </div>));
  }
})));
