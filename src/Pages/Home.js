import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import ThemeContext from "../Contexts/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import { useMutation } from "react-query";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputIcon from "@mui/icons-material/Input";
import MainAppBar from "../Components/MainAppBar";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,

    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorLangMenu, setAnchorLangMenu] = useState(null);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();

  const postLogoutMutation = useMutation(
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/logout");
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // remove (user info and its token ) from local Storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setIsLogedIn(false);
        // // after that go to verevication-code page
        navigate("/login");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLangMenuOpen = Boolean(anchorLangMenu);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorLangMenu(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // navigate("/profile");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLangMenuClose = () => {
    setAnchorLangMenu(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const langMenuId = "primary-search-account-menu";
  const languageMenu = (
    <Menu
      anchorEl={anchorLangMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={langMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isLangMenuOpen}
      onClose={handleLangMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleLangMenuClose();
          i18n.changeLanguage("en");
          localStorage.setItem("currrentLanguage", "en");
        }}
      >
        EN
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLangMenuClose();
          i18n.changeLanguage("ar");
          localStorage.setItem("currrentLanguage", "ar");
        }}
      >
        AR
      </MenuItem>
    </Menu>
  );
  const menuId = "primary-search-account-menu";
  // this main menu , it appears when user click on photo avatar
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={
        {
          // direction:"rtl"
        }
      }
    >
      {/* <MenuItem onClick={handleMenuClose}> */}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          postLogoutMutation.mutate();
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "150px",
          }}
        >
          <Typography>{t("Log Out")}</Typography>
          <LogoutIcon
            sx={
              {
                // marginLeft: "20px",
              }
            }
          />
        </Box>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  //this menu appears when user click on tree dots when screen is small
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t("notifications")}</p>
      </MenuItem>

      <MenuItem onClick={handleLanguageMenuOpen}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LanguageIcon />
        </IconButton>
        <p>{t("language")}</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          if (theme.palette.mode === "dark") {
            setMode("light");
          } else if (theme.palette.mode === "light") {
            setMode("dark");
          }
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          {theme.palette.mode === "dark" && <LightModeIcon />}
          {theme.palette.mode === "light" && <DarkModeIcon />}
        </IconButton>
        <p>{t("theme")}</p>
      </MenuItem>

      {isUserLogedin ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            navigate("/login");
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <InputIcon />
          </IconButton>
          <p>{t("login")}</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box
      sx={{
        display: "flex",
        // direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
    >
      <CssBaseline />
      {/* <MainAppBar handleDrawerOpen={handleDrawerOpen} open={open} /> */}
      {/* <AppBar position="fixed" open={open} sx={{ backgroundColor: "#e7e7e7" }}> */}
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: theme.palette.WHITE_or_BLACK }}
      >
        {/* <Toolbar>
         
        </Toolbar> */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon
              sx={{
                color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
              }}
            />
          </IconButton>
          {/* logo and word Bayaa sharra */}
          <Link to="/" variant="body2">
            <img
              src={"/BAYAASHARRA.png"}
              alt="Login"
              style={{ width: "55px", height: "50px", marginRight: "10px" }}
            />
            {i18n.language === "en" && (
              <img
                src={"/bs.png"}
                alt="Login"
                style={{ width: "120px", height: "25px", marginBottom: "10px" }}
              />
            )}
          </Link>
          {i18n.language === "ar" && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, color: "#153258" }}
            >
              {t("bayaa sharra")}
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />
          {/* Search input component */}
          {/* <SearchInput /> */}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title={t("theme")} arrow>
              <IconButton
                aria-label="translate"
                size="large"
                onClick={() => {
                  if (theme.palette.mode === "dark") {
                    setMode("light");
                    localStorage.setItem("themeMode", "light");
                  } else if (theme.palette.mode === "light") {
                    setMode("dark");
                    localStorage.setItem("themeMode", "dark");
                  }
                }}
              >
                {theme.palette.mode === "dark" && (
                  <LightModeIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                    }}
                  />
                )}
                {theme.palette.mode === "light" && (
                  <DarkModeIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={t("language")} arrow>
              <IconButton
                aria-label="translate"
                color="inherit"
                size="large"
                onClick={handleLanguageMenuOpen}
              >
                <LanguageIcon
                  sx={{
                    color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("notifications")} arrow>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                // color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {isUserLogedin ? (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  mx: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: theme.palette.LIGHT_BLUE_or_DARK_BLUE }}
                >
                  {`${JSON.parse(localStorage.getItem("user")).firstName} ${
                    JSON.parse(localStorage.getItem("user")).lastName
                  } `}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt="Remy Sharp"
                    // src={`http://127.0.0.1:8000/storage/${user.image}`}
                  />
                </IconButton>
              </Box>
            ) : (
              <Tooltip title={t("login")} arrow>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{
                    color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                  }}
                >
                  <InputIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* users */}
          <ListItem
            disablePadding
            sx={
              location.pathname === "/users"
                ? {
                    backgroundColor: theme.palette.DARK_BLUE,
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("users");
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t("users")} />
            </ListItemButton>
          </ListItem>
          {/* Advertisements */}
          <ListItem
            disablePadding
            sx={
              location.pathname === "/advertisements"
                ? {
                    backgroundColor: theme.palette.DARK_BLUE,
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("advertisements");
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t("advertisements")} />
            </ListItemButton>
          </ListItem>
          {/* Statistics */}
          <ListItem
            disablePadding
            sx={
              location.pathname === "/statistics"
                ? {
                    backgroundColor: theme.palette.DARK_BLUE,
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("statistics");
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t("statistics")} />
            </ListItemButton>
          </ListItem>
          {/* Complaints */}
          <ListItem
            disablePadding
            sx={
              location.pathname === "/complaints"
                ? {
                    backgroundColor: theme.palette.DARK_BLUE,
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("complaints");
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t("complaints")} />
            </ListItemButton>
          </ListItem>
          {/* image manager */}
          <ListItem
            disablePadding
            sx={
              location.pathname === "/image-manager"
                ? {
                    backgroundColor: theme.palette.DARK_BLUE,
                    color: "white",
                  }
                : {}
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("image-manager");
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={t("image manager")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
        <Box
          sx={{
            mt: "50px",
            // backgroundColor: theme.palette.BLACK_or_BLUED_WHITE,
          }}
        >
          <Outlet />
        </Box>
      </Main>
      {renderMobileMenu}
      {renderMenu}
      {languageMenu}
    </Box>
  );
}

export default Home;
