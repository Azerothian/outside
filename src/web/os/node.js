import React from "react";
import uuid from "node-uuid";


export default class TreeNode {
  constructor(store, tag, props, options, parent, index = 0) {
    this.id = uuid.v4();
    this.tag = tag;
    this.props = props;
    this.children = [];
    this.store = store;
    this.options = options;
    this.index = index;
    if (parent) {
      this.parentId = parent.id;
    }
    console.log("construct node", this);
  }
  create(tag, props, options) {
    console.log("creating child", {tag, props, options});
    const node = new TreeNode(this.store, tag, props, options, this);
    this.children.push(node.id);
    this.store.add(node);
    this.store.emit(`${this.id.toString()}:add`, node);
    if (this.store.refresh) {
      this.store.refresh();
    }
    return node;
  }
  remove(nodeId) {
    this.children = (this.children || []).filter((id) => {
      return id !== nodeId;
    });
    const node = this.store.get(nodeId);
    console.log(`${this.id.toString()}:remove-child`, {id: nodeId, parentId: node.parentId, children: this.children, t: this});
    return this.store.emit(`${this.id.toString()}:remove-child`, node);
  }
  add(nodeId) {
    console.log("nodeid", nodeId, this.store.get(nodeId));
    const node = this.store.get(nodeId);
    console.log(`${this.id.toString()}:add`, {id: node.id, parentId: node.parentId, newId: this.id});
    if (node.parentId) {
      this.store.get(node.parentId).remove(node.id);
    }
    this.children.push(node.id);
    node.parentId = this.id;
    console.log(`${this.id.toString()}:add-child`, {parentId: this.id, childId: node.id});
    return this.store.refresh();
    //return this.store.emit(`${this.id.toString()}:add-child`, node);
  }
  getParents() {
    if (!this.parentId) {
      return [];
    }
    let arr = [];
    let node = this;
    do {
      if (node.parentId) {
        node = this.store.get(node.parentId);
      }
      arr.push(node);
    } while (node.parentId);
    return arr;
  }
  render() {
    if (this.store.overrideRender) {
      return this.store.overrideRender.apply(this, []);
    }
    return this.renderElement();
  }

  renderChildren() {
    if (this.children.length > 0) {
      if (this.children.length === 1) {
        return this.store.get(this.children[0]).render();
      }
      return this.children.map((id) => {
        return this.store.get(id);
      }).sort((a, b) => (a.index - b.index)).map((child) => {
        return child.render();
      });
    }
    return undefined;
  }
  renderElement(props = {}, children) {
    if (typeof this.tag !== "string") {
      const propTypes = (this.tag.propTypes || {});
      if (propTypes.osStore) {
        props = Object.assign(props, {osStore: this.store});
      }
      if (propTypes.osNode) {
        props = Object.assign(props, {osNode: this});
      }
    }
    let args = [this.tag, Object.assign({key: this.id.toString()}, props, this.props)];
    if (this.children.length > 0 && !children) {
      args = args.concat(this.renderChildren());
    } else if (children) {
      args = args.concat(children);
    }
    return React.createElement.apply(React, args);
  }
}
