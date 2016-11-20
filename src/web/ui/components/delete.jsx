import React from "react";
import {Form} from "formsy-react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

export default class DeleteControl extends React.Component {

  constructor() {
    super();
    this.state = {
      visible: false,
      osNode: undefined,
    };
  }
  componentWillMount() {
    return this.props.store.ui.on("on.delete", this.handleUiDeleteEvent);
  }
  componentWillUnmount() {
    return this.props.store.ui.off("on.delete", this.handleUiDeleteEvent);
  }
  handleUiDeleteEvent({osNode}) {
    return this.setState({
      visible: true,
      osNode,
    });
  }
  handleDelete(props) {
    const {osNode} = this.state;
    return this.handleReset(() => {
      return this.props.store.ui.deleteElement(osNode);
    });
  }
  handleReset(callback) {
    return this.setState({
      visible: false,
      osNode: undefined,
    }, callback);
  }
  render() {
    if (!this.state.visible) {
      return (<div />);
    }
    const {osNode} = this.state;

    return (
      <Dialog
        title={`Delete '${osNode.id}'`}
        modal={true}
        actions={[(<FlatButton label="Cancel" secondary onTouchTap={() => {this.handleReset();}} />),
          (<FlatButton label="Delete" primary onTouchTap={() => {this.handleDelete();}} />)]}
        open={this.state.visible}>
        <div>
          {`Are you sure you want to delete '${osNode.id}'`}
        </div>
      </Dialog>);
  }
}
