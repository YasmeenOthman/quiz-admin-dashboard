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
import PeopleIcon from "@mui/icons-material/People";
import StatsIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const list = [
  {
    title: "Quizzez",
    icon: <QuizIcon />,
    items: ["Manage", "Create New Quiz", "All Quizzez"],
  },
  {
    title: "Users",
    icon: <PeopleIcon />,
    items: ["View All", "Progress"],
  },
  { title: "Statistics", icon: <StatsIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const Sidebar = () => {
  // State to manage which sections are open
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
              // Render collapsible items with sub-items
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
                          to={`/${subItem.toLowerCase().replace(/\s+/g, "-")}`}
                          key={subIndex}
                        >
                          <ListItemText inset primary={subItem} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              // Render simple list items with icons
              return (
                <ListItem button key={index}>
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
