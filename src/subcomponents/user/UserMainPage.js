import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getData, postData } from "../FetchServices";
import UserCategoryAll from "./UserCategoryAll";
import UserSubcategory from "./UserSubcategory";
import UserVideo from "./UserVideo";
import PlayVideo from "./PlayVideo";
import UserEpisode from "./UserEpisode";
import UserLogin from "./Userlogin";
import Admin from "../Admin";
import UserRegisteration from "./UserRegisteration";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import SvgIcon from "@material-ui/core/SvgIcon";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from "@material-ui/core/styles";
import ViewCart from "./ViewCart";
import { blue, red } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { styled } from "@material-ui/core/styles";

const StyledBadge1 = withStyles((theme) => ({
  badge: {
    right: -3,
    border: `5px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage:
      "linear-gradient(to right, #01afff 10px, #7ace55 800px ,#01afff)",
  },
  avatar1: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 70,
    height: 60,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  card: {
    maxWidth: 345,
    margin: 80,
    color: blue,
  },
  iconColor: {
    color: "rgb(250,250,250)",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
}));

export default function UserMainPage(props) {
  const classes = useStyles();
  const [counter, setCounter] = React.useState(0);
  const [anchorElAM, setAnchorElAM] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getMlist, setMList] = React.useState([]);
  const [getSClist, setSCList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const setViews = (views, id) => {
    if (views == "USERLOGIN_CART") {
      setView(<UserLogin setViews={setViews} emailid={""} />);
    } else if (views == "CATEGORY") {
      setView(<UserCategoryAll setViews={setViews} />);
    }
    if (views == "SUBCATEGORY") {
      setView(<UserSubcategory categoryid={id} setViews={setViews} />);
    } else if (views == "VIDEOS") {
      setView(
        <UserVideo
          subcategoryid={id}
          countCartItems={countCartItems}
          setViews={setViews}
        />
      );
    } else if (views == "PLAY") {
      setView(<PlayVideo url={id} />);
    } else if (views == "EPISODE") {
      setView(<UserEpisode videoid={id} setViews={setViews} />);
    } else if (views == "USERREGISTRATION") {
      setView(<UserRegisteration setViews={setViews} />);
    } else if (views == "USERLOGIN") {
      setView(<UserLogin setViews={setViews} emailid={id} />);
    }
  };
  const handleClickk = (subcategoryid) => {
    props.setViews("VIDEOS", subcategoryid);
  };
  const [view, setView] = React.useState(
    <UserCategoryAll setViews={setViews} />
  );
  const readAllRecords = async () => {
    var list = await getData("category/displayall");
    setMList(list);
  };
  const setMainCategory = () => {
    return getMlist.map((item, index) => {
      return (
        <Button
          style={{ fontSize: 17, fontWeight: "bold", fontFamily: "Calibri" }}
          value={item.categoryid}
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(event) => handleClick(event)}
        >
          {item.categoryname}
        </Button>
      );
    });
  };

  const readAllSCRecords = async (categoryid) => {
    let body = { categoryid: categoryid };
    var list = await postData("subcategory/displayByCategoryId", body);
    setSCList(list);
  };
  const setSubCategory = () => {
    return getSClist.map((item, index) => {
      return (
        <MenuItem
          onClick={handleClose}
          value={item.subcategoryid}
          onClick={() => setViews("VIDEOS", item.subcategoryid)}
        >
          {item.subcategoryname}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    readAllRecords();
    countCartItems();
  }, []);
  function handleClick(event) {
    //alert(event.currentTarget.value)
    readAllSCRecords(event.currentTarget.value);
    setAnchorEl(event.currentTarget);
  }
  function handleClickAM(event) {
    setAnchorElAM(event.currentTarget);
  }
  const handleClickAMMenu = (opt) => {
    if (opt == "USER LOGIN") {
      setView(<UserLogin setViews={setViews} emailid={""} />);
    } else if (opt == "ADMIN LOGIN") {
      setView(<Admin history={props.history} />);
    } else if (opt == "LOGOUT") {
      localStorage.clear();
      countCartItems();
    } else if (opt == "CLEAR CART") {
      clearCartItems();
    }

    setAnchorElAM(null);
  };
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  function handleCloseAM() {
    setAnchorElAM(null);
  }
  function countCartItems() {
    let c = 0;
    for (let i = 0; i < localStorage.length; i++) {
      let value = localStorage.key(i);
      if (value.startsWith("CT")) {
        c++;
      }
    }
    setCounter(c);
  }
  function clearCartItems() {
    let c = 0;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      let value = localStorage.key(i);
      if (value.startsWith("CT")) {
        localStorage.removeItem(value);
      }
    }
    setCounter(0);
    setView(<ViewCart setViews={setViews} countCartItems={countCartItems} />);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function avatarMenuAfterLogin() {
    return (
      <div>
        <Avatar
          aria-controls="simple-menuAM"
          aria-haspopup="true"
          alt="user"
          src="http://localhost:3000/user.jpg"
          className={classes.avatar}
          onClick={handleClickAM}
        />
        <Menu
          id="simple-menuAM"
          anchorEl={anchorElAM}
          keepMounted
          open={Boolean(anchorElAM)}
          onClose={handleCloseAM}
        >
          <MenuItem onClick={() => handleClickAMMenu("ACCOUNT STATUS")}>
            Account Status
          </MenuItem>
          <MenuItem onClick={() => handleClickAMMenu("CHANGE PROFILE")}>
            Change Profile
          </MenuItem>
          <MenuItem onClick={() => handleClickAMMenu("CLEAR CART")}>
            Clear Cart
          </MenuItem>
          <MenuItem onClick={() => handleClickAMMenu("LOGOUT")}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }

  function avatarMenu() {
    return (
      <div>
        <Avatar
          aria-controls="simple-menuAM"
          aria-haspopup="true"
          alt="user"
          src="http://localhost:3000/user.jpg"
          className={classes.avatar}
          onClick={handleClickAM}
        />
        <Menu
          id="simple-menuAM"
          anchorEl={anchorElAM}
          keepMounted
          open={Boolean(anchorElAM)}
          onClose={handleCloseAM}
        >
          <MenuItem onClick={() => handleClickAMMenu("USER LOGIN")}>
            User Login
          </MenuItem>
          <MenuItem onClick={() => handleClickAMMenu("ADMIN LOGIN")}>
            Admin Login
          </MenuItem>
        </Menu>
      </div>
    );
  }

  function showMainPage() {
    setView(
      <UserCategoryAll countCartItems={countCartItems} setViews={setViews} />
    );
  }
  function showCart() {
    setView(<ViewCart countCartItems={countCartItems} setViews={setViews} />);
  }
  function cartBadges() {
    return (
      <Box display="flex">
        <Box m={1}>
          <IconButton aria-label="cart" onClick={showCart}>
            <StyledBadge1
              badgeContent={counter}
              color="#ffff00"
              className={classes.iconColor}
            >
              <ShoppingCartIcon />
            </StyledBadge1>
          </IconButton>
        </Box>
      </Box>
    );
  }

  function showMenu() {
    let menu = "";
    if (!localStorage.getItem("US_USER")) menu = avatarMenu;
    else menu = avatarMenuAfterLogin;
    return <div>{menu()}</div>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={clsx(classes.appBar)}>
        <Toolbar>
          <Tooltip disableFocusListener title="HOME">
            <HomeIcon
              color="primary"
              fontSize="large"
              onClick={showMainPage}
              component={(svgProps) => {
                return (
                  <svg {...svgProps}>
                    <defs>
                      <linearGradient id="gradient1">
                        <stop offset="70%" stopColor={blue[800]} />
                        <stop offset="70%" stopColor={red[900]} />
                      </linearGradient>
                    </defs>
                    {React.cloneElement(svgProps.children[0], {
                      fill: "url(#gradient1)",
                    })}
                  </svg>
                );
              }}
            />
          </Tooltip>

          <Typography className={classes.title} variant="h6" noWrap>
            {setMainCategory()}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              color="blue"
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {setSubCategory()}
            </Menu>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {cartBadges()}
          {showMenu()}
        </Toolbar>
      </AppBar>
      <div
        style={{
          backgroundImage: "url(" + "4.jpg" + ")",
          backgroundSize: "cover",
        }}
      >
        {view}
      </div>
    </div>
  );
}
