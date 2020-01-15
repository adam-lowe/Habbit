import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import PetsTwoToneIcon from "@material-ui/icons/PetsTwoTone";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";
import PetsIcon from "@material-ui/icons/Pets";

import AuthContext from "../../contexts/AuthContext";

import ProjectLogo from "../Assets/Artboard_1.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "box-shadow": theme.shadows[15]
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [left, setLeft] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { user, authToken } = React.useContext(AuthContext);

  const open = Boolean(anchorEl);

  const handleLogout = event => {
    props.logout(authToken);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLeft(open);
  };

  const menuList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Dashboard", url: "/" },
          { text: "Create Task", url: "task" },
          { text: "My Pet", url: "my-pet" }
        ].map((menuItem, index) => (
          <ListItem button key={menuItem.text}>
            <Link to={menuItem.url}>
              {Object.keys(menuItem).map(key => {
                if (key === "text") {
                  switch (menuItem[key]) {
                    case "Dashboard":
                      return (
                        <ListItemIcon key={menuItem[key]}>
                          <HomeSharpIcon />
                        </ListItemIcon>
                      );
                    case "Create Task":
                      return (
                        <ListItemIcon key={menuItem[key]}>
                          <AssignmentSharpIcon />
                        </ListItemIcon>
                      );
                    case "My Pet":
                      return (
                        <ListItemIcon key={menuItem[key]}>
                          <PetsIcon />
                        </ListItemIcon>
                      );
                    default:
                      break;
                  }
                  return "";
                }
                return "";
              })}

              <ListItemText primary={menuItem.text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          {user && (
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <PetsTwoToneIcon fontSize="large" />
              </IconButton>
              <SwipeableDrawer
                open={left}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                {menuList()}
              </SwipeableDrawer>
            </div>
          )}
            <img className={classes.img} src={ProjectLogo} alt="Habbit logo" />
          <Typography variant="h3" className={classes.title}></Typography>
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>{user.fullName}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
