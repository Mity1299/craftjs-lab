// components/user/Card.js
import React from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { Container } from "./Container";
import { useNode, Element } from "@craftjs/core";

export const CardTop = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    // Only accept Text
    canMoveIn: (incomingNodes) => incomingNodes.every((incomingNode) => incomingNode.data.type === Text),
  },
};

export const CardBottom = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect}>{children}</div>;
};

CardBottom.craft = {
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNodes) => incomingNodes.every((incomingNode) => incomingNode.data.type === Button),
  },
};

export const Card = ({ background, padding = 20 }) => {
  return (
    /**
     * 这里不需要添加connectors，因为Card组件与Container组件进行了组合
     * 而Container已经添加了connectors
     */
    <Container background={background} padding={padding}>
      {/* 在用户组件里使用Element元素时，必须添加id */}
      {/* // Canvas Node of type div */}
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>

      {/* // Canvas Node of type div */}
      <Element id="buttons" is={CardBottom} canvas>
        <Button size="small" text="Learn more" variant="contained" color="primary" />
      </Element>
    </Container>
  );
};
