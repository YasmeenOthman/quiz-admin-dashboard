// SideNav.jsx
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
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
import StatsIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

const list = [
  { title: "Home", icon: <HomeIcon />, path: "/" },
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
      { name: "View All", path: "/users", icon: <ManageAccountsIcon /> },
      { name: "Progress", path: "/users/progress", icon: <QueryStatsIcon /> },
    ],
  },
  { title: "Statistics", icon: <StatsIcon />, path: "/statistics" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

const SideNav = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    Quizzez: false,
    Users: false,
  });

  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : { username: "User" };

  const handleClick = (title) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const handleLogout = () => {
    if (window.confirm("Will you leave ?")) {
      localStorage.removeItem("authToken");
      navigate("/quiz-login");
      onNavigate?.();
    }
  };

  return (
    <Box
      sx={{
        width: 250,
        mt: { xs: "64px", sm: 0 }, // margin-top 64px on mobile, 0 on desktop
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

        {list.map((item, idx) => {
          if (item.items) {
            const open = openSections[item.title] || false;
            return (
              <React.Fragment key={idx}>
                <ListItem button onClick={() => handleClick(item.title)}>
                  <ListItemIcon sx={{ color: "#F4F5F7" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.items.map((sub, sIdx) => (
                      <ListItem
                        button
                        key={sIdx}
                        component={Link}
                        to={sub.path}
                        sx={{ pl: 4 }}
                        onClick={onNavigate} // close mobile drawer
                      >
                        <ListItemIcon sx={{ color: "#F4F5F7" }}>
                          {sub.icon}
                        </ListItemIcon>
                        <ListItemText primary={sub.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else if (item.title === "Logout") {
            return (
              <ListItem button key={idx} onClick={handleLogout}>
                <ListItemIcon sx={{ color: "#F4F5F7" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            );
          } else {
            return (
              <ListItem
                button
                key={idx}
                component={Link}
                to={item.path}
                onClick={onNavigate} // close mobile drawer
              >
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
  );
};

export default SideNav;
