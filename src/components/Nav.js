import React, { useState } from "react";
import { Tabs, Tab, AppBar, withStyles } from "@material-ui/core";
import People from "./People";
import stormTrooper from "./icons/star-wars-37577 1.svg";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import AssessmentIcon from "@material-ui/icons/Assessment";
import profile from "./icons/Vector (2).svg";

const Nav = () => {
  const [value, setValue] = useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;
    return <div>{value === index && <h1>{children}</h1>}</div>;
  };

  const StyledTab = withStyles({
    root: {
      flexDirection: "row",
      paddingRight: "26px",
    },
    wrapper: {
      flexDirection: "row",
    },
  })(Tab);

  return (
    <div>
      <AppBar
        style={{
          backgroundColor: "white",
          color: "black",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        position="static"
      >
        <img
          style={{ paddingLeft: "14px" }}
          src={stormTrooper}
          alt="Storm Trooper"
        ></img>
        <div style={{ display: "flex" }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleTabs}
          >
            <StyledTab
              wrapped
              icon={<LocalBarIcon style={{ marginRight: "10px" }} />}
              label="Mos Eisley Cantina"
            ></StyledTab>
            <StyledTab
              wrapped
              icon={<AssessmentIcon style={{ marginRight: "10px" }} />}
              label="TOP SECRET"
            ></StyledTab>
          </Tabs>
          <img
            style={{ paddingRight: "14px" }}
            src={profile}
            alt="profile"
          ></img>
        </div>
      </AppBar>
      <TabPanel value={value} index={0}>
        <People />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div
          style={{
            marginTop: "125px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>Are you lost?</h2>
          <img
            src="https://www.baretreemedia.com/wp-content/uploads/2018/05/09_Captain-Phasma_Really_SA1.gif"
            style={{ maxWidth: "360px" }}
          ></img>
        </div>
      </TabPanel>
    </div>
  );
};

export default Nav;
