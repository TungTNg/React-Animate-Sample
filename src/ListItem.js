import React from "react";

import AnimateHeight from "react-animate-height";

import { ANIMATION_DURATION } from "./List";

export default class ListItem extends React.Component {
  componentDidMount() {
    const { height, updateItem, id } = this.props;

    // When item is mounted, if it's height is 0
    // we want to expand it
    if (height === 0) {
      requestAnimationFrame(() => {
        updateItem(id, {
          height: "auto"
        });
      });
    }
  }

  render() {
    const { children, height } = this.props;

    return (
      <AnimateHeight duration={ANIMATION_DURATION} height={height}>
        {children}
      </AnimateHeight>
    );
  }
}
