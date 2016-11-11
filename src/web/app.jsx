import React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DataStore from "web/os/data-store";
import Grid from "web/os/ui/bootstrap/grid";
import Row from "web/os/ui/bootstrap/row";
import Col from "web/os/ui/bootstrap/col";

class RenderNodeId extends React.Component {
  render() {
    return (<div>
      {this.props.osNodeId.toString()}
    </div>);
  }
}
RenderNodeId.propTypes = {
  osNodeId: React.PropTypes.string.isRequired,
};

RenderNodeId.displayName = "RenderNodeId";

const store = new DataStore();
const row = store.top.create(Grid).create(Row);
row.create(Col, {xs: 6});
row.create(Col, {xs: 6}).create(RenderNodeId);

store.enableDesigner = true;


export default DragDropContext(HTML5Backend)(React.createClass({
  render() {
    return store.top.render();
  },
}));
