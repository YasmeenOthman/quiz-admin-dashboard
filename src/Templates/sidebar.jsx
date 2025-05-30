import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Box,
  Typography,
  Avatar,
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

const list = [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  {
    title: "Quizzez",
    icon: <QuizIcon />,
    path: "/quizzes",
    items: [
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
    path: "/users",
    items: [
      {
        name: "View All",
        path: "/users",
        icon: <ManageAccountsIcon />,
      },
      { name: "Progress", path: "/users/progress", icon: <QueryStatsIcon /> },
    ],
  },
  { title: "Statistics", icon: <StatsIcon />, path: "/statistics" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" }, // We will handle logout separately
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    Quizzez: false,
    Users: false,
  });

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  const handleClick = (title) => {
    // Toggle the specific section by updating the state
    setOpenSections({
      ...openSections, // Keep the current state of other sections
      [title]: !openSections[title], // Flip the state of the clicked section
    });
  };

  const handleLogout = () => {
    if (window.confirm("Will you leave ?")) {
      // Clear the token from local storage
      localStorage.removeItem("authToken");

      // Redirect to the login page
      navigate("/quiz-login");
    }
  };

  return (
    <Drawer variant="permanent" className="sidebar">
      <Box
        sx={{
          overflow: "auto",
          width: "250px",
          minHeight: "100%",
          position: "sticky",
          top: "0",
          left: "0",
          backgroundColor: "#04305a",
          color: "#F4F5F7",
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={<Typography>{decodedToken.username}</Typography>}
            />
          </ListItem>

          {list.map((item, index) => {
            if (item.items) {
              const { path, title, icon, items } = item;
              const open = openSections[title] || false;
              return (
                <React.Fragment key={index}>
                  <ListItem button onClick={() => handleClick(title)} to={path}>
                    <ListItemIcon sx={{ color: "#F4F5F7" }}>
                      {icon}
                    </ListItemIcon>
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
                          <ListItemIcon sx={{ color: "#F4F5F7" }}>
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else if (item.title === "Logout") {
              return (
                <ListItem button key={index} onClick={handleLogout}>
                  <ListItemIcon sx={{ color: "#F4F5F7" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              );
            } else {
              return (
                <ListItem button key={index} component={Link} to={item.path}>
                  <ListItemIcon sx={{ color: "#F4F5F7" }}>
                    {item.icon}
                  </ListItemIcon>
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
