
import React from "react";
import Placeholder from "./components/placeholder";
import DropBox from "./components/drop-box";
import {EventEmitter} from "events";




function injectDesigner(store) {
  store.overrideRender = function renderDesigner() {
    const placeholderProps = {
      osNode: this,
      key: `placeholder:${this.id.toString()}`,
    };
    if (typeof this.tag !== "string") {
      const osDesigner = (this.tag.osDesigner || {});
      if (osDesigner.disablePlaceholder) {
        return this.renderElement();
      }
      if (osDesigner.renderInside) {
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
    this.dropBoxLock = false;
  }
  register(lib) {
    this.libs.push(lib);
  }
  off() {
    return this.removeListener.apply(this, arguments);
  }
  requestCreate(osNode, control) {
    if ((control.osDesigner || {}).form) {
      return this.emit("on.create", {osNode, control});
    } else {
      return this.createElement(osNode, control, {});
    }
  }
  requestDelete(osNode) {
    return this.emit("on.delete", {osNode});
  }
  createElement(osNode, control, newProps) {
    let options = {};
    let props = Object.assign({}, props, newProps);
    const {defaults} = (control.osDesigner || {});
    if (defaults) {
      props = defaults.props;
      options = defaults.options;
    }
    return osNode.create(control, props, options).then((node) => {
      return this.store.refresh().then(() => node);
    });
  }
  deleteElement(osNode) {
    if (osNode.parentId) {
      this.store.get(osNode.parentId).remove(osNode.id);
    }
    this.store.remove(osNode);
    return this.store.refresh();
  }
  setDropBox(osNode, monitor, component) {
    // const dropItem = monitor.getItem();
    // const sourceNode = dropItem.osNode;

    if (!this.dropBoxLock) {
      this.dropBoxLock = true;
      console.log("unlocked");
      return Promise.resolve().then(() => {
        if (this.dropBox) {
          console.log("this.dropBox Exists");
          if (this.dropBox.parentId !== osNode.id) {
            console.log("this.dropBox parent does not match", this.dropBox.parentId !== osNode.id, {dropBox: this.dropBox, osNode});
            return this.deleteElement(this.dropBox).then(() => true);
          }
          return Promise.resolve(false);
        }
        console.log("this.dropBox does not exists", this);
        return Promise.resolve(true);
      }).then((create) => {
        if (create) {
          return this.createElement(osNode, DropBox, {}).then((node) => {
            this.dropBox = node;
          });
        }
        return undefined;
      }).then(() => {
        this.dropBoxLock = false;
      });
    }
    return Promise.resolve();
  }
  clearDropBox() {
    if (this.dropBox) {
      return this.deleteElement(this.dropBox);
    }
    return Promise.resolve();
  }
}
