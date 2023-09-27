import React from "react";

import ListItem from "./ListItem";

export const ANIMATION_DURATION = 600;

export default class List extends React.Component {
  removeItem(id) {
    const { updateItem, removeItem } = this.props;

    const callback = () => {
      setTimeout(() => {
        // This is where the actual delete is happening
        removeItem(id);
      }, ANIMATION_DURATION);
    };

    // First we update the item's height to 0
    // and when animation is complete
    // we run the callback to remove the item completely
    updateItem(id, { height: 0 }, callback);
  }

  render() {
    const { updateItem, items } = this.props;

    return items.map((item) => {
      return (
        <ListItem
          height={item.height}
          id={item.id}
          updateItem={updateItem}
          key={item.id}
        >
          <div className="item">
            {item.text}{" "}
            <button
              className="btn btn--delete"
              onClick={() => this.removeItem(item.id)}
            >
              Delete
            </button>
          </div>
        </ListItem>
      );
    });
  }
}
