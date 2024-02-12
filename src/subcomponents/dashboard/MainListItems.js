import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Category from "../Category";
import Subcategory from "../Subcategory";
import Formatteddisplay from "../DisplayAllSubcategory";
import DisplayByCategory from "../DisplayAllCategory";
import Video from "../Video";
import Display from "../DisplayAllVideo";
import DisplayallEpisode from "../DisplayallEpisode";
import Episode from "../Episode";
import UserMainPage from "../user/UserMainPage";
import Link from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  iconColor: {
    color: "rgb(250,250,250)",
  },
  ListItem: {
    backgroundImage: "linear-gradient(25deg, #01afff, transparent)",
    "&:hover": {
      backgroundImage: "linear-gradient(25deg, #81d05f, transparent)",
    },
  },
}));

export default function MainListItems(props) {
  const classes = useStyles();
  const handleClick = (view) => {
    props.changeView(view);
  };
  const mainListItems = (
    <div>
      <ListItem
        button
        onClick={() => handleClick(<Category />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <DashboardIcon />
        </ListItemIcon>

        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Add Categories
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<DisplayByCategory />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <DashboardIcon />
        </ListItemIcon>

        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Display Categories
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<Subcategory />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <ShoppingCartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="SubCategory" /> */}
        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Sub Categories
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<Formatteddisplay />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <PeopleIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Display Subcategory" /> */}
        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Display Sub Categories
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<Video />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <BarChartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Video" /> */}
        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Video
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<Display />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <BarChartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Display All Video" /> */}
        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Display All Video
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<Episode />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <BarChartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Add Episode" /> */}
        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Add Episode
        </p>
      </ListItem>
      <ListItem
        button
        onClick={() => handleClick(<DisplayallEpisode />)}
        className={classes.ListItem}
      >
        <ListItemIcon className={classes.iconColor}>
          <BarChartIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Display All Episode" /> */}
        <p
          style={{
            color: "white",
            fontFamily: "Calibri",
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
          }}
        >
          Display All Episode
        </p>
      </ListItem>
    </div>
  );

  return <div>{mainListItems}</div>;
}
