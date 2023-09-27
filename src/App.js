import React from "react";

import List from "./List";
import "./styles.css";

// Simple hack to get random string
const getUniqueId = () => `${Math.random().toString(16).substr(2)}`;

export default class App extends React.Component {
  constructor() {
    super();

    // Generate two initial items
    const id1 = getUniqueId();
    const id2 = getUniqueId();

    // All initial items have height auto
    this.state = {
      items: [
        {
          id: id1,
          height: "auto",
          text: `Item ${id1}`
        },
        {
          id: id2,
          height: "auto",
          text: `Item ${id2}`
        }
      ]
    };
  }

  addItem = () => {
    const { items } = this.state;

    const id = getUniqueId();

    this.setState({
      items: [
        ...items,
        // When adding an item, set the inital height to 0
        // then we can animate to auto
        {
          id: id,
          height: 0,
          text: `Item ${id}`
        }
      ]
    });
  };

  // Gets the item's index by "id"
  getIndexById(id) {
    const { items } = this.state;

    return items.findIndex((item) => {
      return item.id === id;
    });
  }

  removeItem = (id) => {
    const { items } = this.state;

    const index = this.getIndexById(id);

    items.splice(index, 1);

    this.setState({
      items: [...items]
    });
  };

  // Updates the item with the specific "id"
  // "updateData" works simialr to setState, as it merges it with the exisitng data
  // "callback" if present, will be passed to setState
  updateItem = (id, updateDate, callback = null) => {
    const { items } = this.state;

    const index = this.getIndexById(id);

    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      ...updateDate
    };

    this.setState(
      {
        items: newItems
      },
      callback
    );
  };

  render() {
    const { items } = this.state;

    return (
      <div class="app">
        <h1>Animated list example</h1>
        <p>
          Made using{" "}
          <a
            href="https://github.com/Stanko/react-animate-height"
            target="_parent"
          >
            react-animate-height
          </a>
          .
        </p>
        <List
          items={items}
          removeItem={this.removeItem}
          updateItem={this.updateItem}
        />
        <button className="btn btn--add" onClick={this.addItem}>
          + Add
        </button>

        <div>Total items: {items.length}</div>
      </div>
    );
  }
}
