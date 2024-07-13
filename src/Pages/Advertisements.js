import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import axiosInstance from "../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { tableCellClasses } from "@mui/material/TableCell";
import LinearProgress from "@mui/material/LinearProgress";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import SearchInput from "../Components/SearchInput";
import FilterDialog from "../Components/FilterDialog";
import TuneIcon from "@mui/icons-material/Tune";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

function Advertisements() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const getAllAdvertisementsMutation = useMutation(
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get("/all-advertisements");
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

  // const { data: allAdvertisements, refetch: refetchallAdvertisements } =
  //   useQuery(
  //     "all-ads",
  //     () => {
  //       const token = localStorage.getItem("token");

  //       axiosInstance.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${token}`;
  //       return axiosInstance.get("/all-advertisements");
  //     },
  //     {
  //       onSuccess: (response) => {
  //         console.log("aaaaaaaaaaaaa :", response.data);
  //         setAds(response.data);
  //       },
  //       select: (data) => {
  //         return data.data;
  //       },
  //     }
  //   );

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

        // refetchallAdvertisements();
        getAllAdvertisementsMutation.mutate();
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

  useEffect(() => {
    getAllAdvertisementsMutation.mutate();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.DARK_BLUE,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    // <TableContainer component={Paper} sx={{
    //   margin: "25px"
    // }}>
    <>
      {deleteAdvertisementMutation.isLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}
      {getAllAdvertisementsMutation.isLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}
      <Box
        sx={{
          width: "60%",
          // border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          mx: "auto",
        }}
      >
        <IconButton
          onClick={() => {
            getAllAdvertisementsMutation.mutate();
          }}
        >
          <Typography>{t("all")}</Typography>
        </IconButton>
        <IconButton
          onClick={() => {
            setOpenFilterDialog(true);
          }}
        >
          <TuneIcon
            sx={{
              color: theme.palette.LIGHT_BLUE,
            }}
          />
        </IconButton>
        {/* Search input component */}
        <SearchInput />
      </Box>
      {/* filter dialog */}
      <Box
        sx={{
          direction: "rtl",
          mx: "15px",
        }}
      >
        <FilterDialog
          openFilterDialog={openFilterDialog}
          setOpenFilterDialog={setOpenFilterDialog}
        />
      </Box>

      {/* {allAdvertisements?.data.length == 0 ? ( */}
      {ads.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "100px",
            mb: "100px",
          }}
        >
          <ReportGmailerrorredIcon sx={{ fontSize: "50px" }} />
          <Typography sx={{ textAlign: "" }} variant="h5">
            {t("There Is No Advertisements")}
          </Typography>
        </Box>
      ) : (
        <>
          {/* table */}
          <Box
            sx={{
              margin: "10px",
              border: `1px solid ${theme.palette.DARK_BLUE}`,
              borderRadius: "15px",
              height: "450px",
              overflowY: "auto",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead
                sx={{
                  backgroundColor: "red",
                }}
              >
                <TableRow>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("Ad Owner")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("Title")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("Category")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("Address")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("Status")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("Paid for")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("price")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >
                    {t("new price")}
                  </StyledTableCell>
                  <StyledTableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  ></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {allAdvertisements?.data.map((ad) => ( */}
                {ads.map((ad) => (
                  <TableRow
                    key={ad.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align={i18n.language === "en" ? "left" : "right"}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip
                          title={`${ad.user.firstName} ${ad.user.lastName}`}
                          arrow
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={`http://127.0.0.1:8000/storage/${ad.user.image}`}
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align={i18n.language === "en" ? "left" : "right"}
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/ad-details/${ad.id}`);
                      }}
                    >
                      {ad.title}
                    </TableCell>
                    <TableCell
                      align={i18n.language === "en" ? "left" : "right"}
                    >
                      {i18n.language === "en"
                        ? ad.category.name_en
                        : ad.category.name_ar}
                    </TableCell>
                    <TableCell
                      align={i18n.language === "en" ? "left" : "right"}
                    >
                      {i18n.language === "en"
                        ? `${ad.address.country_en} - ${ad.address.city_en}`
                        : `${ad.address.country_ar} - ${ad.address.city_ar}`}
                    </TableCell>
                    <TableCell
                      align={i18n.language === "en" ? "left" : "right"}
                    >
                      {t(ad.status)}
                    </TableCell>
                    <TableCell
                      align={i18n.language === "en" ? "left" : "right"}
                    >
                      {t(ad.paidFor ? "YES" : "NO")}
                    </TableCell>
                    <TableCell
                      align={i18n.language === "en" ? "left" : "right"}
                    >{`${ad.price} - ${ad.currency}`}</TableCell>
                    <TableCell
                      align={i18n.language === "en" ? "left" : "right"}
                    >
                      {" "}
                      {ad.newPrice != null
                        ? `${ad.newPrice} - ${ad.currency}`
                        : "-"}
                    </TableCell>
                    <TableCell align="">
                      <IconButton
                        id={ad.id}
                        onClick={() => {
                          deleteAdvertisementMutation.mutate(ad.id);
                        }}
                      >
                        <DeleteOutlineIcon
                          sx={{
                            color: theme.palette.LIGHT_BLUE,
                          }}
                        />
                      </IconButton>
                      {/* <IconButton onClick={() => {}}>
                  <EditIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                    }}
                  />
                </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      )}
    </>
    // </TableContainer>
  );
}

export default Advertisements;
