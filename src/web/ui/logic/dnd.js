
import ItemTypes from "../item-types";

export function validateEndDrag({item, target}) {
  if (target && item) {
    const itemType = (target.osNode.tag.osDesigner || {}).itemType || ItemTypes.ELEMENT;
    if (itemType === ItemTypes.ELEMENT) {
      let sourceTag;
      if (item.control) {
        // Is Create
        sourceTag = item.control;
      } else {
        // Is Move existing
        if (item.osNode.id.toString() === target.osNode.id.toString()) {
          return Promise.reject("dropping on the same item");
        }
        sourceTag = item.osNode.tag;
      }

      const itemRequiredParent = (sourceTag.osDesigner || {}).requiredParent;
      if (itemRequiredParent) {
        if (itemRequiredParent.immediate) {
          if (itemRequiredParent.tag !== target.osNode.tag) {
            console.error("Not a permitted parent node");
            return Promise.reject("Not a valid item");
          }
        } else {
          let tag = itemRequiredParent.tag;
          if (!itemRequiredParent.tag && itemRequiredParent) {
            tag = itemRequiredParent;
          }
          const parents = target.osNode.getParents();
          let parentFound = target.osNode.getParents().concat([target.osNode]).filter((node) => {
            return tag === node.tag;
          });
          console.log("parents", {parents, parentFound, tag, itemRequiredParent});
          if (parentFound.length === 0) {
            console.error("Not a permitted parent node");
            return Promise.reject("Not a valid item");
          }
        }
      }
      return Promise.resolve({item, target});
    }
  }
  return Promise.reject("Not a valid item");
}
