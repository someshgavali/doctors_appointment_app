import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import docLogo from "../6014550_coronavirus_doctor_female_white_icon.svg";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

import sideBarData from "../data";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AppBar, Stack } from "@mui/material";
import Scheduler from "./Scheduler/Scheduler";
import DoctorsInfo from "./Doctors/DoctorsInfo";
import Patients from "./Patients/Patients";
import Preferences from "./Preferences";
import Doctors from "./Doctors/Doctors";
import About from "./About";
import Dashboard from "./Dashboard/Dashboard";

const drawerWidth = 240;

function ResponsiveDrawer() {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navTo = useNavigate();
  const currURL = useLocation();
  const [currPath, setCurrPath] = useState("/");
  useEffect(() => {
    setCurrPath(currURL.pathname);
  }, [currURL]);

  const handleDrawerToggle = () => {
    // window.innerWidth
    if (window.innerWidth < 500) setMobileOpen(!mobileOpen);
  };
  // console.log(window.innerWidth);
  const drawer = (
    <div>
      <Stack justifyContent="center" alignItems="center" gap={1} mb={2} mt={3}>
        <img width="75vh" height="75vh" src={docLogo} alt="doc Logo" />
        <Typography
          borderBottom={1}
          borderColor="navy"
          mb={0.5}
          variant="h6"
          fontWeight="bold">
          Somesh Gavali
        </Typography>
        <Typography color="GrayText" fontSize={14}>
          Admin
        </Typography>
      </Stack>
      <Divider />
      <List sx={{ pl: 0.5, pr: 0.5 }}>
        {sideBarData.map((item) => (
          <ListItem
            sx={{
              bgcolor:
                currPath.slice(0, 4) === item.routeTo.slice(0, 4)
                  ? "#7575ff"
                  : "white",
              color:
                currPath.slice(0, 4) === item.routeTo.slice(0, 4)
                  ? "white"
                  : "#7575ff",
              borderRadius: 2,
              mb: 1,
              mt: 1,
            }}
            onClick={() => {
              navTo(item.routeTo);
              handleDrawerToggle();
            }}
            key={item.name}
            disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
      }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#7575ef",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="p" fontSize={18} noWrap component="div">
            DOCTORS APPOINTMENT APPLICATION
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <LogoutRoundedIcon />
            {/* <Typography variant="p" fontSize={14} noWrap component="div">
              Logout
            </Typography> */}
            <IconButton>
              <Link target="_blank" to="https://github.com/someshgavali">
                <GitHubIcon sx={{ color: "white" }} />
              </Link>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ width: "100%", pt: 3, mt: 5 }}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/schedule" element={<Scheduler />}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/patients" element={<Patients />}></Route>
          <Route path="/preference" element={<Preferences />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/doctor/:doctorId" element={<DoctorsInfo />}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
