import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import axiosInstance from "../Axios/axiosInstance";
import Alert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate, Link } from "react-router-dom";
import loginValidationSchema from "../Validations Schema/login validation schema";
import { useQuery, useMutation } from "react-query";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  // This is to save the case where the user wants to enter an email or mobile number
  const [showEmailField, setShowEmailField] = useState(true);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [emailExist, setEmailExist] = useState(null);
  const [phoneExist, setPhoneExist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  console.log("ttttttttttttttttttttttttttttt :", theme);

  // const { data: countriesInfo } = useQuery(
  //   "countries-info",
  //   () => {
  //     return axiosInstance.get("/countries-info");
  //   },
  //   {
  //     select: (data) => {
  //       return data.data;
  //     },
  //   }
  // );

  const postLoginMutation = useMutation(
    (data) => axiosInstance.post("/login", data),
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // save response data (user info and its token ) in local Storage
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);

        // after that go to home page
        navigate("/");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        // if credentials is Invalid (email-phone or password)
        if (
          error.response.status === 401 &&
          error.response.data.message === "Invalid credentials"
        ) {
          setInvalidCredentials(true);
          // setTimeout(() => {
          //   setInvalidCredentials(false);
          // }, 5000);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const form = useForm({
    defaultValues: {
      email: "",
      phoneCode: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    console.log("setShowEmailField :", Number(showEmailField));
    if (showEmailField) {
      setValue("phone", "");
    } else {
      setValue("email", "");
    }
  }, [showEmailField, setValue]);

  const onSubmit = (formData) => {
    //هون عملت نسخة من بيانات الفورم مشان اشتغل عليها وعدل عليه , لانو التعديل على اوبجكت الفورم الأساسي رح يأثر على الفورم
    const data = Object.assign({}, formData);

    if (showEmailField) {
      delete data["phone"];
      delete data["phoneCode"];
    } else {
      delete data["email"];
      //combine phone code and phone together
      data.phone = `${data.phoneCode}${data.phone}`;
      delete data["phoneCode"];
    }

    console.log("submitted data :", data);
    postLoginMutation.mutate(data);
  };

  const handleSwitchChange = () => {
    setShowEmailField((showEmailField) => !showEmailField);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={invalidCredentials}
        autoHideDuration={5000}
        onClose={() => {
          setInvalidCredentials(false);
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {showEmailField
            ? t("Email or Password is Incorrect")
            : t("Phone or Password is Incorrect")}
        </Alert>
      </Snackbar>
      <Box
        id="a"
        sx={{
          height: "100vh",
          // backgroundImage: "url(realEstates‬.jpg)", // Set the background image
          // backgroundImage: "url('hand shake.gif')", // Set the background image
          // backgroundImage: "url(https://source.unsplash.com/random?wallpapers)", // Set the background image
          backgroundImage: "url(/login.png)", // Set the background image
          backgroundSize: "cover", // Cover the entire Box with the image
          backgroundPosition: "center", // Center the image within the Box
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={"BAYAASHARRA.png"}
          alt="Login"
          style={{ width: "120px", height: "100px", marginBottom: "5px" }}
        />

        {/* <Typography component="h1" variant="h5">
          BAYYA SHARRA
        </Typography> */}
        <Box
          id="b"
          sx={{
            // width: "300px",
            // height: "300px",
            backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
            padding: "20px",
            borderRadius: "10px",
            // border: "2px solid",
            // borderColor: "blue",
            // direction: i18n.language === "ar" ? "rtl" : "ltr",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: "center",
              color: theme.palette.BLACK_or_WHITE,
            }}
          >
            {t("Sign in")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* <Box
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <label>{t("login by email")}:</label>
              <Switch
                checked={showEmailField}
                onChange={handleSwitchChange}
                color="primary"
                size="small"
              />
            </Box> */}
            {showEmailField ? (
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t("Email Address")}
                    autoComplete="email"
                    size="small"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={t(errors.email?.message)}
                  />
                </Grid>
              </Grid>
            ) : // <Grid container spacing={1}>
            //   <Grid item xs={12} sm={4}>
            //     <TextField
            //       margin="normal"
            //       labelId="demo-simple-select-label"
            //       id="demo-simple-select"
            //       select
            //       label={t("code")}
            //       size="small"
            //       fullWidth
            //       // value={age}
            //       // label="Age"
            //       // onChange={handleChange}
            //       {...register("phoneCode")}
            //     >
            //       {countriesInfo?.map((country) => {
            //         return (
            //           <MenuItem value={country.phoneCode}>
            //             {country.phoneCode}
            //           </MenuItem>
            //         );
            //       })}
            //     </TextField>
            //   </Grid>
            //   <Grid item xs={12} sm={8}>
            //     <TextField
            //       margin="normal"
            //       required
            //       fullWidth
            //       id="phoneNumber"
            //       label={t("phone number")}
            //       name="phoneNumber"
            //       size="small"
            //       {...register("phone")}
            //       error={!!errors.phone}
            //       helperText={errors.phone?.message}
            //     />
            //     {phoneExist != null ? (
            //       <small style={{ color: "red" }}>{phoneExist}</small>
            //     ) : null}
            //   </Grid>
            // </Grid>
            null}
            <TextField
              margin="normal"
              required
              fullWidth
              label={t("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              size="small"
              {...register("password")}
              error={!!errors.password}
              helperText={t(errors.password?.message)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={postLoginMutation.isLoading}
            >
              {postLoginMutation.isLoading ? (
                <CircularProgress size={25} style={{ color: "white" }} />
              ) : (
                t("Sign in")
              )}
            </Button>
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            </Grid>
            <DevTool control={control} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
