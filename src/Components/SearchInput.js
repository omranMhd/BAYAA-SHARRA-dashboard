import React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CottageIcon from "@mui/icons-material/Cottage";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation } from "react-query";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import axiosInstance from "../Axios/axiosInstance";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/////////////////////////////////

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

///////////////////////////

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  // backgroundColor: "white",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: "5px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const { t, i18n } = useTranslation();
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const navigate = useNavigate();

  const getsearchedAdsMutation = useMutation(
    (queryParams) => {
      console.log("queryParams :", queryParams);
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get(`/advertisements-search?${queryParams}`);
    },
    {
      onSuccess: (response) => {
        console.log("getsearchedAdsMutation :", response.data.data);
        setAds(response.data.data);
      },
      onError: (error) => {
        // Handle any errors here
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const { isLoading: mainCategoriesIsLoading, data: mainCategories } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    }
  );

  return (
    <Box
      sx={{
        // direction:"rtl",
        display: "flex",
        flexWrap: "nowrap",
        // border: "2px solid #000",
        padding: "1px",
        borderRadius: "20px",
        mr: "40px",
        boxShadow: "0px 0px 1px 1px #153258",
        "&:hover": {
          // backgroundColor: alpha(theme.palette.common.white, 0.50),
          // border: "3px solid #153258",
          boxShadow: "0px 0px 2px 2px #153258",
        },
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: "20px 0px 0px 20px",
        }}
        disabled={getsearchedAdsMutation.isLoading}
        onClick={() => {
          const queryParams = new URLSearchParams({
            search: searchText,
          }).toString();

          // alert(queryParams);
          if (searchText !== "") {
            getsearchedAdsMutation.mutate(queryParams);
          }
        }}
      >
        {getsearchedAdsMutation.isLoading ? (
          <CircularProgress size={25} style={{ color: "white" }} />
        ) : (
          <SearchIcon />
        )}
      </Button>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "0px 20px 20px 0px",
          display: "flex",
          flexWrap: "nowrap",
          position: "relative",
        }}
      >
        {searchText === "" && (
          <Box
            sx={{
              color: "black",
              position: "absolute",
              zIndex: "0",
              left: "20px",
              pt: "6px",
              //   backgroundColor: "red",
              width: "250px",
              //   height: "500px",
              display: "flex",
            }}
          >
            {/* <DirectionsCarIcon /> */}
            {/* <CottageIcon /> */}
            {/* <DomainIcon /> */}

            {i18n.language === "en" && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  mr: "2px",
                }}
              >
                Search in
              </Typography>
            )}

            {i18n.language === "ar" && (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  mr: "2px",
                }}
              >
                البحث في
              </Typography>
            )}
          </Box>
        )}

        <StyledInputBase
          // placeholder={t("search")}
          inputProps={{ "aria-label": "search" }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              // alert(e.target.value);

              const queryParams = new URLSearchParams({
                search: searchText,
              }).toString();

              if (searchText !== "") {
                getsearchedAdsMutation.mutate(queryParams);
              }
            }
          }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {searchText !== "" && (
          <IconButton
            size="small"
            onClick={() => {
              setSearchText("");
            }}
            aria-label="clear"
            sx={{
              color: "black",
              mr: "5px",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default SearchInput;
