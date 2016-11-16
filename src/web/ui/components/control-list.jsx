import React from "react";
import Row from "web/ui/lib/bootstrap/row";
import Col from "web/ui/lib/bootstrap/col";
import Grid from "web/ui/lib/bootstrap/grid";
import ControlItem from "./control-item";
import {List} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";


export default class ItemList extends React.Component {
  render() {
    return (<div>
      <Paper>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h4>{"Controls"}</h4>
              {this.props.store.ui.libs.map((lib) => {
                return (<div key={lib.name}>
                  <List>
                    <Subheader>{lib.name}</Subheader>
                    {Object.keys(lib.controls).map((controlKey) => {
                      const control = lib.controls[controlKey];
                      return (<ControlItem key={`${lib.name}-${control.displayName}`} control={control} />);
                    })}
                  </List>
                  <Divider />
                </div>);
              })}
            </Col>
          </Row>
        </Grid>
      </Paper>
    </div>);
  }
}
