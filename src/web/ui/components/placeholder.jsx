import React, {PropTypes} from "react";
// import {findDOMNode} from "react-dom";
import ItemTypes from "../item-types";
import {DragSource, DropTarget} from "react-dnd";

// import ActionDelete from "material-ui/svg-icons/action/delete";
// import ActionAssignment from "material-ui/svg-icons/action/assignment";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

// import DropBox from "./drop-box";

import {validateEndDrag} from "../logic/dnd";

const placeholderSource = {
  beginDrag({osNode}) {
    return {osNode};
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const target = monitor.getDropResult();
    return validateEndDrag({item, target}).then(() => {
      //success
      return target.osNode.add(item.osNode.id);
    }).then(() => {
      return target.osNode.store.ui.clearDropBox();
    }, () => {
      return target.osNode.store.ui.clearDropBox();
    });
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
  hover({osNode}, monitor, component) {
    if (monitor.isOver({ shallow: true })) {
      // console.log("osNode", osNode);
      return osNode.store.ui.setDropBox(osNode, monitor, component);
      // const dropItem = monitor.getItem();
      // // const {control} = dropItem;
      // const sourceNode = dropItem.osNode;
      // if (sourceNode) {// existing item
      // }
      //console.log("hover!", {item, osNode, monitor, component});
    }
    return undefined;
    // const hoverIndex = props.index;

    // // Don"t replace items with themselves
    // if (dragIndex === hoverIndex) {
    //   return;
    // }

    // // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // // Determine mouse position
    // const clientOffset = monitor.getClientOffset();

    // // Get pixels to the top
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // // Only perform the move when the mouse has crossed half of the items height
    // // When dragging downwards, only move when the cursor is below 50%
    // // When dragging upwards, only move when the cursor is above 50%

    // // Dragging downwards
    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //   return;
    // }

    // // Dragging upwards
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return;
    // }

    // // Time to actually perform the action
    // props.moveCard(dragIndex, hoverIndex);

    // // Note: we"re mutating the monitor item here!
    // // Generally it"s better to avoid mutations,
    // // but it"s good here for the sake of performance
    // // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
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
    let color = "rgba(0, 0, 0, 0.3)";
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
      minHeight: 60,
      border: `1px solid ${color}`,
    }}>
      <div style={{height: 48, borderBottom: `1px solid ${color}`}}>
        <div style={{
          float: "left",
          height: 48,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 15,
          background: "#eeeeee",
          borderBottom: `1px solid ${color}`,
        }}>
          {`${name}`}
        </div>
        <IconMenu
          style={{float: "right"}}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{horizontal: "right", vertical: "top"}} >
          <MenuItem primaryText="Delete" onTouchTap={this.handleDeleteRequest} />
          <MenuItem primaryText="Properties" />
        </IconMenu>
      </div>
      {this.props.children}
    </div>));
  }
})));
