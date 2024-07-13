import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { useTranslation } from "react-i18next";
import useUserLogedin from "../Custom Hooks/useUserLogedin";

function AdDetailsComments({ user_id }) {
  const { t, i18n } = useTranslation();
  let params = useParams();
  const theme = useTheme();
  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  //هنا اقوم بتخزين رقم التعليق الذي اريد الرد عليه من اجل استخدامه في عمليه ارسال الرد مع رقم التعليق
  const [repliedCommentId, setRepliedCommentId] = useState(null);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [reply, setReply] = useState("");

  const {
    isLoading: advertisementCommentsIsLoading,
    data: advertisementComments,
    refetch: refetchadvertisementComments,
  } = useQuery(
    `advertisement-comments-${params.adId}`,
    () => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.get(`/advertisement-comments/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("onSuccess response", response);
        console.log("test test", response);
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

  const deleteComment = useMutation(
    (comment_id) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-comment/${comment_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // queryClient.invalidateQueries("advertisement-comments");

        refetchadvertisementComments();
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

  const deleteReply = useMutation(
    (reply_id) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-reply/${reply_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // queryClient.invalidateQueries("advertisement-comments");

        refetchadvertisementComments();
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

  const addComment = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/add-comment", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        setComment("");
        // queryClient.invalidateQueries("advertisement-comments");

        refetchadvertisementComments();
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

  const addReply = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/add-reply", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        setRepliedCommentId(null);
        setOpenReplyDialog(false);
        setReply("");

        // queryClient.invalidateQueries("advertisement-comments");

        refetchadvertisementComments();
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
  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        // backgroundColor:"red"
        mb: "15px",
        direction: i18n.language == "en" ? "ltr" : "rtl",
      }}
    >
      {/* one comment */}
      <Box>
        {/* comment */}
        {advertisementComments?.data.data.map((comment) => {
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  // direction:"rtl"
                }}
              >
                {/* comment container */}
                <Box
                  sx={{
                    backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                    padding: "5px",
                    borderRadius: "15px",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  {/* comment owner */}
                  <Box
                    sx={{
                      display: "flex",
                      // alignContent:"center",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                      }}
                      alt="Remy Sharp"
                      src={`http://127.0.0.1:8000/storage/${comment.user.image}`}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "5px",
                        color: "white",
                        fontSize: "15px",
                      }}
                    >
                      {`${comment.user.firstName} ${comment.user.lastName}`}
                    </Box>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ backgroundColor: theme.palette.WHITE }}
                  />
                  <Typography
                    sx={{
                      color: "white",
                      marginLeft: "10px",
                      fontSize: "20px",
                    }}
                    variant="string"
                  >
                    {comment.value}
                  </Typography>
                </Box>
                {/* comment actions */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    size="small"
                    onClick={() => {
                      deleteComment.mutate(comment.id);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* reply 2 */}
              {comment?.reply !== null && (
                <Box
                  sx={{
                    display: "flex",
                    // direction:"rtl"
                  }}
                >
                  {/* reply container */}
                  <Box
                    sx={{
                      backgroundColor: "white",
                      padding: "5px",
                      borderRadius: "15px",
                      marginBottom: "10px",
                      marginLeft: "50px",
                      // marginRight: "25px",
                      // border: "2px solid red",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        // alignContent:"center",
                        alignItems: "center",
                        padding: "5px",
                        // backgroundColor: "red",
                        // width: "15%",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "30px",
                          height: "30px",
                        }}
                        alt="Remy Sharp"
                        src={`http://127.0.0.1:8000/storage/${comment.reply.user.image}`}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "5px",
                          color: "black",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {`${comment.reply.user.firstName} ${comment.reply.user.lastName}`}
                      </Box>
                      <Divider
                        orientation="vertical"
                        flexItem
                        color={theme.palette.DARK_BLUE}
                      />
                      <Typography
                        sx={{
                          color: "black",
                          m: "5px",
                        }}
                      >
                        {comment.reply.value}
                      </Typography>
                    </Box>
                  </Box>
                  {/* reply actions */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      size="small"
                      onClick={() => {
                        deleteReply.mutate(comment.reply.id);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </>
          );
        })}
      </Box>
      {/* reply dialog */}
      <Dialog
        open={openReplyDialog}
        onClose={() => {
          setOpenReplyDialog(false);
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
          {t("Write Your Reply")}
        </DialogTitle>
        <DialogContent>
          <TextField
            // label={t("description")}
            label={t("message")}
            required
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            margin="normal"
            name="ComplaintReason"
            value={reply}
            onChange={(e) => {
              setReply(e.target.value);
            }}
            // {...register("description")}
            // error={!!errors.description}
            // helperText={t(errors.description?.message)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenReplyDialog(false);
            }}
          >
            {t("Skip")}
          </Button>
          <Button
            disabled={addReply.isLoading || reply === ""}
            variant="contained"
            onClick={() => {
              const data = {};
              const user_id = JSON.parse(localStorage.getItem("user"))?.id;
              data.user_id = user_id;
              data.comment_id = repliedCommentId;
              data.value = reply;
              // alert(complaintReason);
              addReply.mutate(data);
              // setOpen(false);
            }}
            autoFocus
          >
            {addReply.isLoading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              t("send")
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {isUserLogedin && (
        <>
          <TextField
            label={t("leaveComment")}
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            variant="contained"
            disabled={addComment.isLoading || comment === ""}
            endIcon={<SendIcon />}
            // startIcon={<SendIcon />}
            size="small"
            sx={{
              marginTop: "5px",
              direction: i18n.language == "en" ? "ltr" : "ltr",
            }}
            onClick={() => {
              const data = {};
              const user_id = JSON.parse(localStorage.getItem("user"))?.id;
              data.user_id = user_id;
              data.advertisement_id = params.adId;
              data.value = comment;
              addComment.mutate(data);
            }}
          >
            {addComment.isLoading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              t("send")
            )}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AdDetailsComments;
