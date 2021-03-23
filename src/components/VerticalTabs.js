import { Tab, Tabs } from "@material-ui/core";
import React from "react";

const VerticalTabs = () => {
  return (
    <div>
      <Tabs orientation="vertical">
        <Tab label="First"></Tab>
        <Tab label="Second"></Tab>
        <Tab label="Third"></Tab>
      </Tabs>
    </div>
  );
};

export default VerticalTabs;
