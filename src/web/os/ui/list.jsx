import React from "react";
import Row from "web/os/ui/bootstrap/row";
import Col from "web/os/ui/bootstrap/col";
import Item from "./item";
export default class ItemList extends React.Component {
  render() {
    console.log("ITEMLIST", this.props.store.design);
    return (<div>
      <h2>{"Items"}</h2>
      <Row>
        <Col xs={12}>
          {this.props.store.design.map((tag) => {
            return (<Item tag={tag} />);
          })}
        </Col>
      </Row>
    </div>);
  }
}
