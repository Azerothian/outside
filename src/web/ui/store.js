
import React from "react";
import Placeholder from "./placeholder";
import {EventEmitter} from "events";

function injectDesigner(store) {
  store.overrideRender = function renderDesigner() {
    const placeholderProps = {
      osNode: this,
      key: `placeholder:${this.id.toString()}`,
    };
    if (typeof this.tag !== "string") {
      if ((this.tag.osDesigner || {}).renderInside) {
        return this.renderElement({}, React.createElement(Placeholder, placeholderProps, this.renderChildren()));
      }
    }
    return React.createElement(Placeholder, placeholderProps, this.renderElement());
  };
  return store;
}

export default class UiStore extends EventEmitter {
  constructor(store) {
    super();
    injectDesigner(store);
    this.store = store;
    this.libs = [];
  }
  register(lib) {
    this.libs.push(lib);
  }
  off() {
    return this.removeListener.apply(this, arguments);
  }
  requestCreate(osNode, control) {
    return this.emit("on.create", {osNode, control});
  }
  createElement(osNode, control, newProps) {
    let options = {};
    let props = Object.assign({}, props, newProps);
    const {defaults} = (control.osDesigner || {});
    if (defaults) {
      props = defaults.props;
      options = defaults.options;
    }
    return osNode.create(control, props, options);
  }

}
