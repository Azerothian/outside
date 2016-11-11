import React from "react";
import uuid from "node-uuid";

import Placeholder from "./ui/placeholder";

export default class TreeNode {
  constructor(store, tag, props, options, parent) {
    this.id = uuid.v4();
    this.tag = tag;
    this.props = props;
    this.children = [];
    this.store = store;
    this.options = options;
    if (parent) {
      this.parentId = parent.id;
    }
  }
  create(tag, props, options) {
    const node = new TreeNode(this.store, tag, props, options, this);
    this.children.push(node.id);
    this.store.add(node);
    this.store.emit(`${this.id.toString()}:add`, node);
    return node;
  }
  remove(node) {
    this.children = this.children.filter((n) => {
      return n.id !== node.id;
    });
    return this.store.emit(`${this.id.toString()}:remove`, node);
  }
  render() {
    if (this.store.enableDesigner) {
      return this.renderDesigner();
    }
    return this.renderElement();
  }
  renderDesigner() {
    if (typeof this.tag !== "string") {
      if ((this.tag.osDesigner || {}).renderInside) {
        return this.renderElement({children: React.createElement(Placeholder, {osNode: this})});
      }
    }
    return React.createElement(Placeholder, {osNode: this}, this.renderElement());
  }
  renderElement(props = {}) {
    if (typeof this.tag !== "string") {
      const propTypes = (this.tag.propTypes || {});
      if (propTypes.osNodeId) {
        props = Object.assign(props, {osNodeId: this.id});
      }
      if (propTypes.osStore) {
        props = Object.assign(props, {osStore: this.store});
      }
    }
    let args = [this.tag, Object.assign(props, this.props)];
    if (this.children.length > 0) {
      args = args.concat(this.children.map((id) => {
        return this.store.get(id).render();
      }));
    }
    return React.createElement.apply(React, args);
  }
}
