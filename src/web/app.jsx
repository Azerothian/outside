import React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Grid from "web/os/ui/bootstrap/grid";
import Row from "web/os/ui/bootstrap/row";
import Col from "web/os/ui/bootstrap/col";

import ItemList from "web/os/ui/list";

export default DragDropContext(HTML5Backend)(React.createClass({
  componentWillMount() {
    this.props.store.refresh = this.handleForceUpdate;
  },
  handleForceUpdate() {
    return this.forceUpdate();
  },
  render() {
    return (<Grid fluid>
      <Row>
        <Col xs={2}>
          <ItemList store={this.props.store} />
        </Col>
        <Col xs={10}>
          {this.props.store.top.render()}
        </Col>
      </Row>
    </Grid>);
  },
}));
