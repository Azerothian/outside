import React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DataStore from "web/os/data-store";
import Grid from "web/os/ui/bootstrap/grid";
import Row from "web/os/ui/bootstrap/row";
import Col from "web/os/ui/bootstrap/col";

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
          <Row>

          </Row>
        </Col>
        <Col xs={10}>
          {this.props.store.top.render()}
        </Col>
      </Row>
    </Grid>);
  },
}));
