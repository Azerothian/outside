import App from "./app";
import ReactDOM from "react-dom";
import React from "react";

import DataStore from "web/os/data-store";
import Grid from "web/os/ui/bootstrap/grid";
import Row from "web/os/ui/bootstrap/row";
import Col from "web/os/ui/bootstrap/col";

class RenderNodeId extends React.Component {
  render() {
    return (<div>
      {`Id: ${this.props.osNode.id.toString()}`}<br/>
      {`ParentId: ${this.props.osNode.parentId.toString()}`}
    </div>);
  }
}
RenderNodeId.propTypes = {
  osNode: React.PropTypes.object.isRequired,
};

RenderNodeId.displayName = "RenderNodeId";

const store = new DataStore();
const row = store.top.create(Grid, {fluid: true}).create(Row);
row.create(Col, {xs: 6});
row.create(Col, {xs: 6}).create(RenderNodeId);

store.enableDesigner = true;


ReactDOM.render(<App store={store}/>, document.getElementById("react-container"));
