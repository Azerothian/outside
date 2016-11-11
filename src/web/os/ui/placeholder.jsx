import React, {PropTypes} from "react";
import {findDOMNode} from "react-dom";
import ItemTypes from "./item-types";
import {DragSource, DropTarget} from "react-dnd";


const placeholderSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const placeholderTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) { // already handled
      return;
    }
    console.log("placeholderTarget", props);
    //moveKnight(props.x, props.y);
  },
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
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

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
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
  render() {
    const {connectDropTarget, connectDragSource, isOver} = this.props;
    let color = "rgba(0, 0, 0, 0.1)";
    if (isOver) {
      color = "rgba(0, 0, 0, 0.8)";
    }
    let name = "Element";
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
        right: 0,
        top: 0,
        width: 100,
        height: 20,
        marginTop: -1,
        marginRight: -1,
        border: `1px solid ${color}`,
        textAlign: "center",
        color: color,
      }}>
        {name}
      </div>
      {this.props.children}
    </div>));
  }
})));
