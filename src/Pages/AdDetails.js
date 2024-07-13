import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AdvertisementPhotoesSlider from "../Components/AdvertisementPhotoesSlider";
import AdditionalAdvertisementInfo from "../Components/AdditionalAdvertisementInfo";
import DisplayLocationMap from "../Components/DisplayLocationMap";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextField from "@mui/material/TextField";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import AdDetailsComments from "../Components/AdDetailsComments";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

import { Delete } from "@mui/icons-material";

function AdDetails() {
  const { t, i18n } = useTranslation();
  let params = useParams();
  let { adId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [pageNotFound, setPageNotFound] = useState(false);
  const [newAdStatus, setNewAdStatus] = useState(null);
  const [advertisementIsPaidFor, setAdvertisementIsPaidFor] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(null);

  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const {
    isError,
    isLoading: adDetailsIsLoading,
    data: adDetailsResponse,
  } = useQuery(
    `ad-details-${adId}`,
    () => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get(`/ad-details/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("onSuccess response", response);
        console.log("test test", response);
        setPageNotFound(false);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
        setPageNotFound(true);
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const deleteAdvertisementMutation = useMutation(
    (ad_id) => {
      // const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-advertisement/${ad_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        navigate("/advertisements");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        // email or phone already been taken
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  console.log("bbb :", adDetailsResponse?.data.data);
  console.log("bbb isError:", isError);

  const updateAdvertisementMutation = useMutation(
    (data) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/update-advertisement/${params.adId}`, data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setOpenEditDialog(false);
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

  const adjustDateToTranslate = (datePhrase) => {
    if (
      [
        "a few seconds ago",
        "a minute ago",
        "an hour ago",
        "a day ago",
        "a month ago",
        "a year ago",
      ].includes(datePhrase)
    ) {
      return t(datePhrase);
    } else {
      const digitRegex = /\d+/g;
      const number = Number(datePhrase.match(digitRegex)[0]);
      let phraseWithoutNumbers = datePhrase.replace(/\d/g, "").trim();
      let phraseWithoutAgo = phraseWithoutNumbers.replace("ago", "").trim();

      if (phraseWithoutAgo === "minutes") {
        return t("minutes ago", { count: number });
      } else if (phraseWithoutAgo === "hours") {
        return t("hours ago", { count: number });
      } else if (phraseWithoutAgo === "days") {
        return t("days ago", { count: number });
      } else if (phraseWithoutAgo === "months") {
        return t("months ago", { count: number });
      } else if (phraseWithoutAgo === "years") {
        return t("years ago", { count: number });
      }

      // console.log("number :", number);
      // console.log("phraseWithoutNumbers :", phraseWithoutNumbers);
      // // console.log("phraseWithoutAgo :", phraseWithoutAgo);
      // return datePhrase;
    }
  };

  return (
    <>
      {/* <Box sx={{ backgroundColor: theme.palette.BLACK_or_BLUED_WHITE }}> */}

      {adDetailsIsLoading ? (
        <Box>...</Box>
      ) : adDetailsResponse?.data.data != undefined ? (
        <Box
          sx={{
            // backgroundColor: "red",
            // padding: "20px",
            mt: "20px",
          }}
        >
          <Box
            sx={{
              margin: "10px",
              padding: "10px",
              backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title={t("edit")} arrow>
              <IconButton
                onClick={() => {
                  setOpenEditDialog(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("delete")} arrow>
              <IconButton
                onClick={() => {
                  deleteAdvertisementMutation.mutate(adId);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
            <Typography>
              Status : {adDetailsResponse?.data.data.status} , Fees paid :{" "}
              {adDetailsResponse?.data.data.paidFor ? "Yes" : "No"}
            </Typography>
            <Typography></Typography>

            <Dialog
              open={openEditDialog}
              onClose={() => {
                setOpenEditDialog(false);
              }}
              sx={{
                direction: i18n.language === "en" ? "ltr" : "rtl",
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle id="alert-dialog-title">
                {t("Edit Advertisement")}
              </DialogTitle>
              <DialogContent>
                {!adDetailsResponse?.data.data.paidFor && (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={t("Fees Piad")}
                    onChange={(e) => {
                      setAdvertisementIsPaidFor(e.target.checked);
                    }}
                    value={advertisementIsPaidFor}
                  />
                )}

                <br />
                {adDetailsResponse?.data.data.status === "pending" && (
                  <>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={newAdStatus}
                        onChange={(e) => {
                          // alert(e.target.value);
                          setNewAdStatus(e.target.value);
                          setRejectionReason(null);
                        }}
                        size="small"
                      >
                        <FormControlLabel
                          value="active"
                          control={<Radio />}
                          label={t("active")}
                        />
                        <FormControlLabel
                          value="rejected"
                          control={<Radio />}
                          label={t("rejected")}
                        />
                      </RadioGroup>
                    </FormControl>
                    {newAdStatus === "rejected" && (
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            multiline
                            autoComplete="given-name"
                            fullWidth
                            id="area"
                            label={t("reason of rejection")}
                            size="small"
                            margin="normal"
                            value={rejectionReason}
                            onChange={(e) => {
                              setRejectionReason(e.target.value);
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenEditDialog(false);
                  }}
                >
                  {t("Skip")}
                </Button>
                <Button
                  disabled={updateAdvertisementMutation.isLoading}
                  variant="contained"
                  sx={{
                    mx: 1,
                  }}
                  onClick={() => {
                    const data = {};

                    if (advertisementIsPaidFor !== null) {
                      data.paidFor = advertisementIsPaidFor;
                    }

                    if (newAdStatus !== null) {
                      data.newAdStatus = newAdStatus;
                    }
                    if (rejectionReason !== null) {
                      data.rejectionReason = rejectionReason;
                    }
                    // alert(JSON.stringify(data));
                    updateAdvertisementMutation.mutate(data);
                  }}
                >
                  {updateAdvertisementMutation.isLoading ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : (
                    t("Save")
                  )}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          {/* advertisement owner */}
          <Box
            sx={{
              display: "flex",
              // alignContent:"center",
              alignItems: "center",
              backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
              padding: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "15px",
              borderRadius: "50px",
              direction: i18n.language == "en" ? "ltr" : "rtl",
              // border:"1px solid red"
            }}
          >
            {/* http://127.0.0.1:8000/storage/advertisements_photoes/2XTCAve1PTBk9iPUrMGwplhB94ItQ82TPo2tgvhI.jpg */}
            <Avatar
              alt="Remy Sharp"
              src={
                adDetailsResponse?.data.data.owner.photo != null
                  ? `http://127.0.0.1:8000/storage/${adDetailsResponse?.data.data.owner.photo}`
                  : "/uesrPhoto.png"
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "5px",
              }}
            >
              {adDetailsResponse?.data.data.owner.fullName}
              <Rating name="read-only" value={3} readOnly size="small" />
            </Box>
          </Box>

          {/* advertisement photoes */}
          <Box>
            {/* <AdvertisementPhotoesSlider
              photoes={adDetailsResponse?.data.data.adPhotoes}
            /> */}
            {adDetailsResponse?.data.data.adPhotoes.map((photo) => {
              return (
                <Box
                  sx={{
                    // backgroundColor: "red",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt="sd"
                    src={`http://127.0.0.1:8000/storage/${photo}`}
                    style={{
                      height: "460px",
                      // width: "80%",
                      marginBottom: "30px",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
          {/* advertisement attributes */}
          <Box
            sx={{
              margin: "15px",
              padding: "10px",
              backgroundColor: theme.palette.WHITE_or_BLACK2,
              borderRadius: "10px",
              direction: i18n.language == "en" ? "ltr" : "rtl",

              // border: "1px solid red",
            }}
          >
            <Typography sx={{ marginBottom: "20px" }} variant="h5">
              {adDetailsResponse?.data.data.title}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.LIGHT_BLUE,
              }}
            >
              {t("description")} :
            </Typography>

            <Typography sx={{ marginBottom: "20px" }}>
              {adDetailsResponse?.data.data.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // justifyContent: "space-around",
                padding: "10px",
                // border:"1px solid black",
                borderRadius: "20px",
                boxShadow: "0px 2px 2px 2px black",
                mb: "20px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <LocationOnOutlinedIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                    }}
                  />
                  <Typography>
                    {i18n.language === "en"
                      ? adDetailsResponse?.data.data.address.country_en
                      : adDetailsResponse?.data.data.address.country_ar}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                    }}
                  >
                    {" - "}
                  </Typography>

                  <Typography>
                    {i18n.language === "en"
                      ? adDetailsResponse?.data.data.address.city_en
                      : adDetailsResponse?.data.data.address.city_ar}
                  </Typography>
                </Box>
                {/* price and newPrice if exist */}
                {adDetailsResponse?.data.data.additionalAttributes != null &&
                  (adDetailsResponse?.data.data.additionalAttributes.newPrice ==
                  null ? (
                    // اذا ماكان في سعر جديد
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid red",
                      }}
                    >
                      {/* price */}
                      <Box
                        sx={
                          {
                            // border: "1px solid blue",
                            // display: "flex",
                          }
                        }
                      >
                        {/* <LocalOfferOutlinedIcon
                              sx={{
                                color: theme.palette.LIGHT_BLUE,
                              }}
                            /> */}
                        <Typography variant="h6">
                          {`${adDetailsResponse?.data.data.additionalAttributes.price
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                            adDetailsResponse?.data.data.additionalAttributes
                              .currency
                          }`}
                        </Typography>
                      </Box>
                      {/* طريقة الدفع في حال كان اجار */}
                      <Typography>
                        {adDetailsResponse?.data.data.additionalAttributes
                          .sellOrRent === "rent" &&
                          `${i18n.language === "en" ? "/" : "\\"} ${
                            adDetailsResponse?.data.data.additionalAttributes
                              .paymentMethodRent
                          }`}
                      </Typography>
                    </Box>
                  ) : (
                    // اذا كان في سعر جديد
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // border: "1px solid red",
                      }}
                    >
                      {/* old price */}
                      <Box
                        sx={
                          {
                            // border: "1px solid blue",
                          }
                        }
                      >
                        <Typography variant="h6">
                          <>
                            <del
                              style={{ color: "red" }}
                            >{`${adDetailsResponse?.data.data.additionalAttributes.price
                              ?.toString()
                              .replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )} `}</del>{" "}
                            {` ${adDetailsResponse?.data.data.additionalAttributes.currency}`}
                          </>
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: theme.palette.LIGHT_BLUE,
                        }}
                      >
                        -
                      </Typography>
                      {/* new price */}
                      <Box
                        sx={
                          {
                            // border: "1px solid blue",
                          }
                        }
                      >
                        <Typography variant="h6">
                          {`${adDetailsResponse?.data.data.additionalAttributes.newPrice
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                 ${
                                   adDetailsResponse?.data.data
                                     .additionalAttributes.currency
                                 }`}
                        </Typography>
                      </Box>
                      {/* طريقة الدفع في حال كان اجار */}
                      <Typography>
                        {adDetailsResponse?.data.data.additionalAttributes
                          .sellOrRent === "rent" &&
                          `/ ${adDetailsResponse?.data.data.additionalAttributes.paymentMethodRent}`}
                      </Typography>
                    </Box>
                  ))}

                {/* <Typography>{adDetailsResponse?.data.data.date}</Typography> */}

                <Box sx={{ display: "flex" }}>
                  <AccessTimeIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                    }}
                  />
                  <Typography sx={{ mx: "5px" }}>
                    {adjustDateToTranslate(
                      moment(adDetailsResponse?.data.data.date).fromNow()
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.LIGHT_BLUE,
                  }}
                >
                  {t("contactNumbers")} :
                </Typography>
                {/* first number */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">
                    {adDetailsResponse?.data.data.contactNumber != null
                      ? `${
                          JSON.parse(adDetailsResponse?.data.data.contactNumber)
                            .firstName
                        }  :  ${
                          JSON.parse(adDetailsResponse?.data.data.contactNumber)
                            .firstPhone
                        } `
                      : "{}"}
                  </Typography>
                  <PhoneInTalkIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                      marginX: "10px",
                    }}
                  />
                </Box>
                {/* second number if exist */}
                {adDetailsResponse?.data.data.contactNumber != null &&
                  JSON.parse(adDetailsResponse?.data.data.contactNumber)
                    .secondName != null && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {adDetailsResponse?.data.data.contactNumber != null &&
                        JSON.parse(adDetailsResponse?.data.data.contactNumber)
                          .secondName != "" && (
                          <>
                            <Typography variant="h6">
                              {adDetailsResponse?.data.data.contactNumber !=
                              null
                                ? `${
                                    JSON.parse(
                                      adDetailsResponse?.data.data.contactNumber
                                    ).secondName
                                  } : ${
                                    JSON.parse(
                                      adDetailsResponse?.data.data.contactNumber
                                    ).secondPhone
                                  } `
                                : "{}"}
                            </Typography>
                            <PhoneInTalkIcon
                              sx={{
                                color: theme.palette.LIGHT_BLUE,
                                marginX: "10px",
                              }}
                            />
                          </>
                        )}
                    </Box>
                  )}
              </Box>
            </Box>
            <Box
              sx={
                {
                  // height: "200px",
                }
              }
            >
              <Typography
                sx={{
                  color: theme.palette.LIGHT_BLUE,
                }}
              >
                {t("advertisementAttributes")} :
              </Typography>
              <AdditionalAdvertisementInfo
                adCategory={adDetailsResponse?.data.data.category.name_en}
                additionalInfo={
                  adDetailsResponse?.data.data.additionalAttributes
                }
              />

              {adDetailsResponse?.data.data.location != null && (
                <>
                  <Typography sx={{ marginBottom: "20px" }}>
                    {/* {adDetailsResponse?.data.data.location} */}
                    {t("location on map")}
                  </Typography>

                  <DisplayLocationMap
                    location={JSON.parse(adDetailsResponse?.data.data.location)}
                  />
                </>
              )}
            </Box>
          </Box>

          {/* advertisement comments */}
          <AdDetailsComments user_id={adDetailsResponse?.data.data.owner.id} />
        </Box>
      ) : (
        <>
          <img alt="page not found" src="/404.png" width={"100%"} />
        </>
      )}
      {/* </Box> */}
    </>
  );
}

export default AdDetails;
