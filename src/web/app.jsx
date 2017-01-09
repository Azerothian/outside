import React from "react";
import Promise from "bluebird";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Grid from "web/ui/lib/bootstrap/grid";
import Row from "web/ui/lib/bootstrap/row";
import Col from "web/ui/lib/bootstrap/col";

import ControlList from "web/ui/components/control-list";
import CreateControl from "web/ui/components/create";
import DeleteControl from "web/ui/components/delete";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


export default DragDropContext(HTML5Backend)(React.createClass({
  componentWillMount() {
    this.props.store.refresh = this.handleForceUpdate;
  },
  handleForceUpdate() {
    return Promise.fromCallback((cb) => {
      return this.forceUpdate(cb);
    });
  },
  render() {
    return (<MuiThemeProvider>
      <div>
        <CreateControl store={this.props.store} />
        <DeleteControl store={this.props.store} />
        <Grid fluid>
          <Row>
            <Col xs={2}>
              <ControlList store={this.props.store} />
            </Col>
            <Col xs={10}>
              {this.props.store.top.render()}
            </Col>
          </Row>
        </Grid>
      </div>
    </MuiThemeProvider>);
  },
}));
