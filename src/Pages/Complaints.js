import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BlockIcon from "@mui/icons-material/Block";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import moment from "moment";


function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const {
    isLoading: getComplaintsIsLoading,
    data: allComplaintsData,
    refetch: refetchAllComplaints,
  } = useQuery(
    "get-complaints",
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.get("/all-complaints");
    },
    {
      onSuccess: (response) => {
        console.log("ffffffffff :", response.data.data);
        setComplaints(response.data.data);
      },
      onError: (error) => {},
      onSettled: () => {},
    }
  );

  const deleteComplaint = useMutation(
    (complaint_id) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-complaint/${complaint_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // queryClient.invalidateQueries("advertisement-comments");

        refetchAllComplaints();
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
    <>
      {getComplaintsIsLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}
      {deleteComplaint.isLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}

      {complaints.length == 0 ? (
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
            {t("There Is No Complaints")}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            margin: "10px",
            border: `1px solid ${theme.palette.DARK_BLUE}`,
            borderRadius: "15px",
            height: "500px",
            overflowY: "auto",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "red",
              }}
            >
              <TableRow>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("complaint owner")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("advertisement title")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("reason")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("date")}
                </StyledTableCell>

                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                ></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow
                  key={complaint.id}
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
                      <Avatar
                        alt="Remy Sharp"
                        src={`http://127.0.0.1:8000/storage/${complaint.user.image}`}
                      />
                      <Typography
                        sx={{ mx: "5px" }}
                      >{`${complaint.user.firstName} ${complaint.user.lastName}`}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell
                    align={i18n.language === "en" ? "left" : "right"}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/ad-details/${complaint.advertisement.id}`);
                    }}
                  >
                    {complaint.advertisement.title}
                  </TableCell>

                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {complaint.reason}
                  </TableCell>

                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {adjustDateToTranslate(
                      moment(complaint.created_at).fromNow()
                    )}
                  </TableCell>

                  <TableCell align="">
                    <IconButton
                      onClick={() => {
                        deleteComplaint.mutate(complaint.id);
                      }}
                    >
                      <DeleteOutlineIcon
                        sx={{
                          color: theme.palette.LIGHT_BLUE,
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
}

export default Complaints;
