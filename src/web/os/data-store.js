import TreeNode from "./tree-node";

import {EventEmitter} from "events";

export default class DataStore extends EventEmitter {
  constructor() {
    super();
    this.data = {};
    this.top = new TreeNode(this, "div", {});
    this.data[top.id] = top;
  }
  add(node) {
    this.data[node.id] = node;
  }
  remove(node) {
    delete this.data[node.id];
  }
  get(id) {
    return this.data[id];
  }
  render() {
    return this.top.render();
  }
}
