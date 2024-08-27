import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Box,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import QuizIcon from "@mui/icons-material/Quiz";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HandymanIcon from "@mui/icons-material/Handyman";
import StatsIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const list = [
  { title: "Home", icon: <HomeIcon /> },
  {
    title: "Quizzez",
    icon: <QuizIcon />,
    items: [
      { name: "Manage", path: "/", icon: <HandymanIcon /> },
      { name: "Create New Quiz", path: "/create-quiz", icon: <AddIcon /> },
      {
        name: "All Quizzez",
        path: "/quizzes",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    title: "Users",
    icon: <PeopleIcon />,
    items: [
      {
        name: "View All",
        path: "/users/view-all",
        icon: <ManageAccountsIcon />,
      },
      { name: "Progress", path: "/users/progress", icon: <QueryStatsIcon /> },
    ],
  },
  { title: "Statistics", icon: <StatsIcon />, path: "/statistics" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    Quizzez: false,
    Users: false,
  });

  const handleClick = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Drawer variant="permanent" className="sidebar">
      <Box
        sx={{
          overflow: "auto",
          width: "250px",
          height: "100vh",
          position: "sticky",
          top: "0",
          left: "0",
        }}
      >
        <List>
          {list.map((item, index) => {
            if (item.items) {
              const { title, icon, items } = item;
              const open = openSections[title] || false;
              return (
                <React.Fragment key={index}>
                  <ListItem button onClick={() => handleClick(title)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {items.map((subItem, subIndex) => (
                        <ListItem
                          button
                          component={Link}
                          to={subItem.path}
                          key={subIndex}
                          sx={{ pl: 4 }} // Add left padding to indent sub-items
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              return (
                <ListItem button key={index} component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              );
            }
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
