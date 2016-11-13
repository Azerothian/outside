import TreeNode from "./tree-node";

import {EventEmitter} from "events";

export default class DataStore extends EventEmitter {
  constructor() {
    super();
    this.data = {};
    this.top = new TreeNode(this, "div", {});
    this.data[this.top.id.toString()] = top;
  }
  add(node) {
    if (node instanceof TreeNode) {
      this.data[node.id.toString()] = node;
      return node;
    }
    console.error("attempting to add element that is not of TreeNode", node);
    throw `attempting to add element is not of TreeNode ${typeof node}`;
  }
  remove(node) {
    delete this.data[node.id.toString()];
  }
  get(id) {
    return this.data[id.toString()];
  }
  render() {
    return this.top.render();
  }
  off() {
    return this.removeListener.apply(this, arguments);
  }
}
