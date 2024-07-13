import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

// import MainSlider from "../Components/MainSlider";
import PhotoSlide from "../Components/PhotoSlide";

function ImageManager() {
  const { t, i18n } = useTranslation();
  const [images, setimages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [deletedImageId, setDeletedImageId] = useState(null);
  const theme = useTheme();

  const {
    isLoading: getSilderImagesIsLoading,
    data: SilderImagesData,
    refetch: refetchSilderImages,
  } = useQuery(
    "silder_images",
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.get("/silder-images");
    },
    {
      onSuccess: (response) => {
        console.log("ffffffffff :", response.data.data);
        setimages(response.data.data);
      },
      onError: (error) => {},
      onSettled: () => {},
    }
  );

  const saveImageMutation = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/save-image", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setNewImage(null);
        refetchSilderImages();
      },
      onError: (error) => {},
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const deleteImage = useMutation(
    (image_id) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-image/${image_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // queryClient.invalidateQueries("advertisement-comments");

        refetchSilderImages();
        setDeletedImageId(null);
        setopenDeleteDialog(false);
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

  const handleFileChange = (event) => {
    setNewImage(event.target.files[0]);
  };

  const handleButtonClick = (input_id) => {
    // Trigger the file input click event
    document.getElementById(input_id).click();
  };
  return (
    <>
      {(getSilderImagesIsLoading || saveImageMutation.isLoading) && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}
      {newImage == null ? (
        <Button
          //   sx={{ width: "75%" }}
          size="small"
          variant="contained"
          endIcon={<EditIcon />}
          onClick={() => {
            handleButtonClick("profile_photo");
          }}
        >
          {t("Add Photo")}
        </Button>
      ) : (
        <>
          <Button
            sx={{ mx: "5px" }}
            size="small"
            variant="outlined"
            endIcon={<SaveIcon />}
            onClick={() => {
              const formData = new FormData();
              formData.append("image", newImage);
              saveImageMutation.mutate(formData);
            }}
            //   disabled={updateUserPhotoMutation.isLoading}
          >
            {/* {updateUserPhotoMutation.isLoading ? (
            <CircularProgress size={25} style={{ color: "white" }} />
          ) : (
            t("Save Photo")
          )} */}
            {t("Save Photo")}
          </Button>
          <Button
            sx={{ mx: "5px" }}
            size="small"
            variant="outlined"
            endIcon={<CloseIcon />}
            onClick={() => {
              setNewImage(null);
            }}
            //   disabled={updateUserPhotoMutation.isLoading}
          >
            {/* {updateUserPhotoMutation.isLoading ? (
            <CircularProgress size={25} style={{ color: "white" }} />
          ) : (
            t("Save Photo")
          )} */}
            {t("Skip")}
          </Button>
        </>
      )}
      {newImage != null && <PhotoSlide img={URL.createObjectURL(newImage)} />}

      {/* hidden input field */}
      <TextField
        id={"profile_photo"}
        type="file"
        inputProps={{
          accept:
            // "image/jpeg,image/png,image/gif,image/bmp,image/webp", // Specify the accepted image formats here
            "image/jpeg,image/png,image/gif", // Specify the accepted image formats here
        }}
        sx={{ display: "none" }}
        onChange={(event) => handleFileChange(event)}
      />
      <Divider sx={{ mt: "20px", mb: "20px" }} />
      {images.map((img) => {
        return (
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{
                color: theme.palette.LIGHT_BLUE,
                backgroundColor: "white",
                borderRadius: "100%",
                position: "absolute",
                left: "20px",
                top: "20px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => {
                setDeletedImageId(img.id);
                setopenDeleteDialog(true);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
            <PhotoSlide img={`http://127.0.0.1:8000/storage/${img.url}`} />
          </Box>
        );
      })}

      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setopenDeleteDialog(false);
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
          {t("Are you sure you want to delete the photo")}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setopenDeleteDialog(false);
              setDeletedImageId(null);
            }}
          >
            {t("Skip")}
          </Button>
          <Button
            disabled={deleteImage.isLoading}
            variant="contained"
            onClick={() => {
              deleteImage.mutate(deletedImageId);
            }}
            autoFocus
          >
            {deleteImage.isLoading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              t("delete")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ImageManager;
