// pages/index.js

import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";

import { Toolbox } from "../components/Toolbox";
import { SettingsPanel } from "../components/SettingsPanel";
import { Topbar } from "../components/Topbar";

import { Container } from "../components/user/Container";
import { Button } from "../components/user/Button";
import { Card, CardTop, CardBottom } from "../components/user/Card";
import { Text } from "../components/user/Text";
import { Editor, Element, Frame } from "@craftjs/core";

export default function App() {
  return (
    <div style={{ margin: "0 auto", width: "800px" }}>
      <Typography variant="h5" align="center">
        A super simple page editor
      </Typography>
      <Grid container spacing={3} style={{ paddingTop: "10px" }}>
        {/* 
        - 设置Editor上下文 
        - 指定用户组件，以便craftjs序列化/反序列化用户组件 */}
        <Editor
          resolver={{
            Card,
            Button,
            Text,
            Container,
            CardTop,
            CardBottom,
          }}
        >
          <Grid item xs={12}>
            <Topbar item />
          </Grid>
          <Grid item xs>
            {/* 使用Frame包裹可编辑区域，从而将渲染过程告知craftjs */}
            <Frame>
              {/* 指定node类型为canvas，当前组件为Container */}
              <Element is={Container} padding={5} background="#eee" canvas>
                <Card />
                <Button size="small" variant="outlined">
                  Click
                </Button>
                <Text size="small" text="Hi world!" />
                <Element is={Container} padding={6} background="#999" canvas>
                  <Text size="small" text="It's me again!" />
                </Element>
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Editor>
      </Grid>
    </div>
  );
}
