import React from "react";
import {Form} from "formsy-react";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

export default class CreateControl extends React.Component {

  constructor() {
    super();
    this.state = {
      visible: false,
      osNode: undefined,
      control: undefined,
      formValid: false,
    };
  }
  componentWillMount() {
    return this.props.store.ui.on("on.create", this.handleUiCreateEvent);
  }
  componentWillUnmount() {
    return this.props.store.ui.off("on.create", this.handleUiCreateEvent);
  }
  handleUiCreateEvent({osNode, control}) {
    let formValid = false;
    if (!control.osDesigner) {
      formValid = true;
    } else {
      formValid = (control.osDesigner.formValidDefault) ? control.osDesigner.formValidDefault : false;
    }

    return this.setState({
      visible: true,
      osNode,
      control,
      formValid,
    });
  }
  handleEnableButton() {
    return this.setState({
      formValid: true,
    });
  }
  handleDisableButton() {
    return this.setState({
      formValid: false,
    });
  }
  handleSubmitForm(props) {
    const {osNode, control} = this.state;
    if ((control.osDesigner || {}).processForm) {
      props = control.osDesigner.processForm(props);
    }
    return this.handleReset(() => {
      return this.props.store.ui.createElement(osNode, control, props);
    });
  }
  handleReset(callback) {
    return this.setState({
      visible: false,
      osNode: undefined,
      control: undefined,
      formValid: false,
    }, callback);
  }
  // handleSubmitForm() {
  //   return this.refs.frmCreate.submit();
  // }
  render() {
    if (!this.state.visible) {
      return (<div />);
    }
    const {control, osNode} = this.state;
    let form;
    if ((control.osDesigner || {}).form) {
      form = control.osDesigner.form(osNode);
    }

    return (
      <Dialog
        title={`Create a new '${control.displayName}'`}
        modal={true}
        open={this.state.visible}>
        <div style={{
          maxHeight: 355,
          overflowX: "hidden",
          overflowY: "auto"
        }}>
          <Form ref="frmCreate"
            onValid={this.handleEnableButton}
            onInvalid={this.handleDisableButton}
            onValidSubmit={this.handleSubmitForm}>
            {form}
            <div>
              <FlatButton className="pull-right" label="Create" primary disabled={!this.state.formValid} type="submit" />
              <FlatButton className="pull-right" label="Cancel" secondary onTouchTap={() => {this.handleReset()}} />,
            </div>
          </Form>
        </div>
      </Dialog>);
  }
}
