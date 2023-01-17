// components/user/Text.js
import React from "react";
import { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Slider, FormControl, FormLabel } from "@material-ui/core";

export const Text = ({ text, fontSize, textAlign }) => {
  /**
   * 让craft管理dom
   * connectors扮演着DOM和craft事件之间的桥梁
   */
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => {
    return {
      hasSelectedNode: state.events.selected,
      hasDraggedNode: state.events.dragged,
    };
  });
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(false);
  }, [hasSelectedNode]);

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
    <div ref={(ref) => connect(drag(ref))} onClick={(e) => setEditable(true)}>
      {/* 使内容可编辑 */}
      <ContentEditable
        disabled={!editable}
        tagName="p"
        html={text}
        onChange={(e) => setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")))}
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
      {hasSelectedNode && (
        <FormControl className="text-additional-settings" size="small">
          <FormLabel component="legend">Font size</FormLabel>
          <Slider
            defaultValue={fontSize}
            step={1}
            min={7}
            max={50}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              setProp((props) => (props.fontSize = value));
            }}
          />
        </FormControl>
      )}
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
