import { useState, useEffect, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputIcon from "@mui/icons-material/Input";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import { useMutation } from "react-query";
import ThemeContext from "../Contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import MenuIcon from "@mui/icons-material/Menu";

function MainAppBar({ handleDrawerOpen, open }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();

  const { mode, setMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLogedIn, setIsLogedIn] = useState(false);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const token = localStorage.getItem("token");

  //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb :", user);
  //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb :", token);

  //   if (user != null && token != null) {
  //     if (user.email_verified_at != null || user.phone_verified_at != null) {
  //       setIsLogedIn(true);
  //     }
  //   }
  // }, [setIsLogedIn]);

  const user = JSON.parse(localStorage.getItem("user"));

  //////////////////////////////////////////////////

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
        navigate("/");
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLangMenu, setAnchorLangMenu] = useState(null);
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
          navigate("/profile");
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "150px",
          }}
        >
          <Typography>{t("Profile")}</Typography>
          <AccountCircleIcon
            sx={
              {
                // marginLeft: "20px",
              }
            }
          />
        </Box>
      </MenuItem>
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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <FavoriteIcon />
        </IconButton>
        <p>{t("favorites")}</p>
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
    <Box>
      <AppBar sx={{ backgroundColor: "#e7e7e7" }}>
      {/* <AppBar sx={{ backgroundColor: "red" }}> */}
        
        <Toolbar>
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
          <SearchInput />

        

          

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
                      color: "#153258",
                    }}
                  />
                )}
                {theme.palette.mode === "light" && (
                  <DarkModeIcon
                    sx={{
                      color: "#153258",
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
                    color: "#153258",
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
                      color: "#153258",
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {isUserLogedin ? (
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
                  src={`http://127.0.0.1:8000/storage/${user.image}`}
                />
              </IconButton>
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
                    color: "#153258",
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
      {renderMobileMenu}
      {renderMenu}
      {languageMenu}
    </Box>
  );
}

export default MainAppBar;
