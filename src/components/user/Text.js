// components/user/Text.js
import React from "react";
import { useNode } from "@craftjs/core";

export const Text = ({ text, fontSize }) => {
  /**
   * 让craft管理dom
   * connectors扮演着DOM和craft事件之间的桥梁
   */

  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    /**
     * 将connect传递给组件的root element
     * 作用是告诉craftjs，这个element代表着Text组件
     *
     * 因此，如果这个组件对应的Node是Canvas类型，则意味着这片区域是droppable
     */
    /**
     * 将drag传递给root element，是将drag handler传递给DOM
     *
     * 如果这个组件的Node是canvas的子组件，则用户可以对这个组件进行拖拽
     */
    <div ref={(ref) => connect(drag(ref))}>
      <p style={{ fontSize }}>{text}</p>
    </div>
  );
};

/**
 * 可以自定义拖拽规则
 */
Text.craft = {
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
};
