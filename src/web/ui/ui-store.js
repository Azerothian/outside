
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
    let props = {};
    const {defaults} = (control.osDesigner || {});
    if (defaults) {
      props = defaults.props;
      options = defaults.options;
    }
    return osNode.create(control, Object.assign(props, newProps), options).then((node) => {
      return this.store.refresh().then(() => node);
    });
  }
  deleteElement(osNode) {
    if (osNode.parentId) {
      const parent = this.store.get(osNode.parentId);
      if (parent) {
        parent.remove(osNode.id);
      }
    }
    this.store.remove(osNode);
    return this.store.refresh();
  }
  setDropBox(osNode, monitor, component) {
    const dropItem = monitor.getItem();
    const sourceNode = dropItem.osNode;
    let sourceTag;
    if (sourceNode) {
      if (sourceNode.id === osNode.id) {
        return undefined;
      }
      sourceTag = sourceNode.tag;
    } else {
      sourceTag = dropItem.control;
    }

    if (!this.dropBoxLock) {
      this.dropBoxLock = true;
      return Promise.resolve().then(() => {
        if (this.dropBox) {
          console.log("this.dropBox Exists", this.dropBox);
          if (this.dropBox.parentId !== osNode.id) {
            console.log("this.dropBox parent does not match", this.dropBox.parentId !== osNode.id, {dropBox: this.dropBox, osNode});
            return this.deleteElement(this.dropBox).then(() => {
              delete this.dropBox;
              return true;
            });
          }
          return Promise.resolve(false);
        }
        console.log("this.dropBox does not exists", this);
        return Promise.resolve(true);
      }).then((create) => {
        let dropBoxId = (this.dropBox || {}).id;
        if (create) {
          let dropItemProps = {};
          console.log("sourceTag - sourceNode", sourceNode);
          if (sourceTag) {
            console.log("sourceTag", sourceTag);
            if (sourceTag.osDesigner) {
              console.log("sourceTag.osDesigner", sourceTag.osDesigner);
              dropItemProps = sourceTag.osDesigner.dropBox;
            }
          }
          console.log("create - dropItemProps", dropItemProps);
          return this.createElement(osNode, DropBox, dropItemProps).then((node) => {
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
      return this.deleteElement(this.dropBox).then(() => {
        delete this.dropBox;
      });
    }
    return Promise.resolve();
  }
}
