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
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../Validations Schema/register validation schema";
import editAdminSchema from "../Validations Schema/editAdminSchema validation schema";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";

function Users() {
  const [users, setUsers] = useState([]);
  const [openNewAdminForm, setOpenNewAdminForm] = useState(false);
  const [openEditAdminForm, setOpenEditAdminForm] = useState(false);
  //هون اقوم بتخزين معلومات الأدمن يلي بدي اعدلوا معلوماتو
  const [editedAdminInfo, setEditedAdminInfo] = useState(null);
  const [emailExist, setEmailExist] = useState(null);
  const [emailExistEditAdminForm, setEmailExistEditAdminForm] = useState(null);
  const [phoneExist, setPhoneExist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  //رقم الأدمن الذي اريد تعديل بياناته
  const [adminId, setAdminId] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  //حباشات اضافة مدير جديد

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phoneCode: "",
      country: "",
      city: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const { register, control, handleSubmit, formState, setValue, watch, reset } =
    form;
  const { errors } = formState;
  const selectedCountry = watch("country");
  const selectedCity = watch("city");

  //حباشات تعديل مدير حالي

  const formEditAdmin = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phoneCode: "",
      country: "",
      city: "",
      password: "",
    },
    resolver: yupResolver(editAdminSchema),
  });
  const {
    register: registerEditAdmin,
    control: controlEditAdmin,
    handleSubmit: handleSubmitEditAdmin,
    formState: formStateEditAdmin,
    setValue: setValueEditAdmin,
    watch: watchEditAdmin,
    reset: resetEditAdmin,
    setError,
    clearErrors,
  } = formEditAdmin;
  const { errors: errorsEditAdmin } = formStateEditAdmin;
  const selectedCountryEditAdmin = watchEditAdmin("country");
  const selectedCityEditAdmin = watchEditAdmin("city");

  const {
    isLoading: getUsersIsLoading,
    data: usersData,
    refetch: refetchUsers,
  } = useQuery(
    "get-users",
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.get("/users");
    },
    {
      onSuccess: (response) => {
        console.log("ffffffffff :", response.data.data);
        setUsers(response.data.data);
      },
      onError: (error) => {},
      onSettled: () => {},
    }
  );

  const deleteUser = useMutation(
    (user_id) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-user/${user_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // queryClient.invalidateQueries("advertisement-comments");

        refetchUsers();
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
  const changeAccountStatusUserMutation = useMutation(
    ({ user_id, data }) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/edit-account-status/${user_id}`, data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // queryClient.invalidateQueries("advertisement-comments");

        refetchUsers();
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

  const { data: countriesInfo } = useQuery(
    "countries-info",
    () => {
      return axiosInstance.get("/countries-info");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );

  const postRegisterMutation = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/register", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        refetchUsers();
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        // email or phone already been taken
        if (error.response.status === 422) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.message);
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.errors);
          if ("email" in error.response.data.errors) {
            setEmailExist(error.response.data.errors.email);
          } else if ("phone" in error.response.data.errors) {
            setPhoneExist(error.response.data.errors.phone);
          }
          // setEmailExist(error.response.data.message);
          // setPhoneExist(error.response.data.message);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );
  const postUpdateAdminInfoMutation = useMutation(
    (data) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(
        `/update-admin-info/${data.admin_id}`,
        data.submittedData
      );
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        refetchUsers();
        setAdminId(null);
        setOpenEditAdminForm(false);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
        // email  already been taken
        if (error.response.status === 422) {
          if ("email" in error.response.data.errors) {
            setEmailExistEditAdminForm(error.response.data.errors.email);
          } else if ("phone" in error.response.data.errors) {
            setPhoneExist(error.response.data.errors.phone);
          }
          // setEmailExist(error.response.data.message);
          // setPhoneExist(error.response.data.message);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const citiesCorrespondingToTheSelectedCountry = countriesInfo?.find(
    (country) => country.country === selectedCountry
  )?.cities;

  const citiesCorrespondingToTheSelectedCountryEditAdmin = countriesInfo?.find(
    (country) => country.country === selectedCountryEditAdmin
  )?.cities;

  const onSubmit = (formData) => {
    //هون عملت نسخة من بيانات الفورم مشان اشتغل عليها وعدل عليه , لانو التعديل على اوبجكت الفورم الأساسي رح يأثر على الفورم
    const data = Object.assign({}, formData);
    console.log("submitted dataaaaaaaaaaaa :", data);

    delete data["phone"];
    delete data["phoneCode"];

    data.address = {};
    data.address.country = data.country;
    data.address.city = data.city;
    delete data.country;
    delete data.city;
    // convert address object to string to store it in DB in this format
    data.address = JSON.stringify(data.address);

    console.log("newwwwwwwwwwwww submitted dataaaaaaaaaaaa :", data);
    postRegisterMutation.mutate(data);
  };
  const onSubmitEditAdmin = (formData) => {
    //هون عملت نسخة من بيانات الفورم مشان اشتغل عليها وعدل عليه , لانو التعديل على اوبجكت الفورم الأساسي رح يأثر على الفورم
    const data = Object.assign({}, formData);

    console.log("dataaaaaa :", data);
    const submittedData = {};

    submittedData.password = data.password;

    if (data.firstName?.trim() !== "") {
      submittedData.firstName = data.firstName?.trim();
    }
    if (data.lastName?.trim() !== "") {
      submittedData.lastName = data.lastName?.trim();
    }
    if (data.country?.trim() !== "" && data.city?.trim() !== "") {
      submittedData.address = JSON.stringify({
        country: data.country?.trim(),
        city: data.city?.trim(),
      });
    }
    if (data.email?.trim() !== "") {
      submittedData.email = data.email?.trim();
    }
    console.log("new Data :", submittedData);

    postUpdateAdminInfoMutation.mutate({
      submittedData: submittedData,
      admin_id: adminId,
    });
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
      {getUsersIsLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}
      {deleteUser.isLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}
      {/* add new addmin */}
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            setOpenNewAdminForm(true);
          }}
        >
          {t("Add New Admin")}
        </Button>
      </Box>
      {/* new admin form dialog */}
      <Dialog
        open={openNewAdminForm}
        onClose={() => {
          setOpenNewAdminForm(false);
        }}
        sx={{
          direction: i18n.language === "en" ? "ltr" : "rtl",
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{t("Add New Admin")}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("First Name")}
                  autoFocus
                  size="small"
                  margin="normal"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={t(errors.firstName?.message)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("Last Name")}
                  // name="lastName"
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={t(errors.lastName?.message)}
                />
              </Grid>
            </Grid>
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("Email Address")}
                name="email"
                autoComplete="email"
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={t(errors.email?.message)}
              />
              {emailExist != null ? (
                <Box
                  sx={{
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  <small
                    style={{
                      color: "red",
                    }}
                  >
                    {t(emailExist)}
                  </small>
                </Box>
              ) : null}
            </>
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  id="country"
                  label={t("Country")}
                  autoFocus
                  size="small"
                  margin="normal"
                  {...register("country")}
                  error={!!errors.country}
                  helperText={t(errors.country?.message)}
                >
                  {countriesInfo?.map((country) => {
                    return (
                      <MenuItem key={country.country} value={country.country}>
                        {i18n.language === "en" && country.country}
                        {i18n.language === "ar" && country.country_ar}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  id="city"
                  label={t("City")}
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...register("city")}
                  error={!!errors.city}
                  helperText={t(errors.city?.message)}
                >
                  {citiesCorrespondingToTheSelectedCountry?.map((city) => {
                    return (
                      <MenuItem key={city.en} value={city.en}>
                        {i18n.language === "en" && city.en}
                        {i18n.language === "ar" && city.ar}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </Grid>
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

            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <Grid item xs={12} sm={9}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // sx={{ mt: 3, mb: 2 }}
                  disabled={postRegisterMutation.isLoading}
                >
                  {postRegisterMutation.isLoading ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : (
                    t("Sign up")
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setOpenNewAdminForm(false);
                    reset({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      phoneCode: "",
                      country: "",
                      city: "",
                      password: "",
                    });
                  }}
                >
                  {t("Skip")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      {/* edit admin form dialog */}
      <Dialog
        open={openEditAdminForm}
        onClose={() => {
          setOpenEditAdminForm(false);
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
          {t("Edit Admin Info")}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitEditAdmin(onSubmitEditAdmin)}
            sx={{ mt: 1 }}
          >
            {/* first and last name */}
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("First Name")}
                  autoFocus
                  size="small"
                  margin="normal"
                  {...registerEditAdmin("firstName")}
                  error={!!errorsEditAdmin.firstName}
                  helperText={t(errorsEditAdmin.firstName?.message)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("Last Name")}
                  // name="lastName"
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...registerEditAdmin("lastName")}
                  error={!!errorsEditAdmin.lastName}
                  helperText={t(errorsEditAdmin.lastName?.message)}
                  // defaultValue="EUR"
                />
              </Grid>
            </Grid>

            {/* country and city */}
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  id="country"
                  label={t("Country")}
                  autoFocus
                  size="small"
                  margin="normal"
                  {...registerEditAdmin("country")}
                  error={!!errorsEditAdmin.country}
                  helperText={t(errorsEditAdmin.country?.message)}
                >
                  {countriesInfo?.map((country) => {
                    // const isSelected =
                    //   country.country === "SYRIA" ? true : false;
                    // console.log("country in select :", country.country);

                    return (
                      <MenuItem
                        // selected={isSelected}
                        key={country.country}
                        value={country.country}
                      >
                        {i18n.language === "en" && country.country}
                        {i18n.language === "ar" && country.country_ar}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  id="city"
                  label={t("City")}
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...registerEditAdmin("city")}
                  error={!!errorsEditAdmin.city}
                  helperText={t(errorsEditAdmin.city?.message)}
                >
                  {citiesCorrespondingToTheSelectedCountryEditAdmin?.map(
                    (city) => {
                      return (
                        <MenuItem key={city.en} value={city.en}>
                          {i18n.language === "en" && city.en}
                          {i18n.language === "ar" && city.ar}
                        </MenuItem>
                      );
                    }
                  )}
                </TextField>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("Email Address")}
              name="email"
              autoComplete="email"
              size="small"
              {...registerEditAdmin("email")}
              error={!!errorsEditAdmin.email}
              helperText={t(errorsEditAdmin.email?.message)}
            />
            {emailExistEditAdminForm != null ? (
              <Box
                sx={{
                  direction: i18n.language === "ar" ? "rtl" : "ltr",
                }}
              >
                <small
                  style={{
                    color: "red",
                  }}
                >
                  {t(emailExistEditAdminForm)}
                </small>
              </Box>
            ) : null}
            {/* password */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label={t("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  {...registerEditAdmin("password")}
                  error={!!errorsEditAdmin.password}
                  helperText={t(errorsEditAdmin.password?.message)}
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
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                {" "}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={postUpdateAdminInfoMutation.isLoading}
                >
                  {postUpdateAdminInfoMutation.isLoading ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : (
                    t("Save")
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mx: "5px" }}
                  onClick={() => {
                    // setEditedAdminInfo(false);
                    setOpenEditAdminForm(false);
                  }}
                >
                  {t("skip")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      {users.length == 0 ? (
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
            {t("There Is No Users")}
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
                  {t("image")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("First Name")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Last Name")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Email")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("user address")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("type")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("account status")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                ></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.language === "en" ? "left" : "right"}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      //   navigate(`/profile/user-ad-details/${ad.id}`);
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://127.0.0.1:8000/storage/${user.image}`}
                    />
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {user.firstName}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {user.lastName}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {user.email}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {/* {`${JSON.parse(user.address).country}-${
                      JSON.parse(user.address).city
                    }`} */}
                    {i18n.language === "en"
                      ? `${user.address.country_en}-${user.address.city_en}`
                      : `${user.address.country_ar}-${user.address.city_ar}`}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {t(user.type)}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {t(user.account_status)}
                  </TableCell>
                  <TableCell align="">
                    <IconButton
                      onClick={() => {
                        deleteUser.mutate(user.id);
                      }}
                    >
                      <DeleteOutlineIcon
                        sx={{
                          color: theme.palette.LIGHT_BLUE,
                        }}
                      />
                    </IconButton>

                    {user.type === "admin" && (
                      <IconButton
                        onClick={() => {
                          setOpenEditAdminForm(true);
                          setAdminId(user.id);
                        }}
                      >
                        <EditIcon
                          sx={{
                            color: theme.palette.LIGHT_BLUE,
                          }}
                        />
                      </IconButton>
                    )}

                    {user.type === "user" &&
                      user.account_status === "active" && (
                        <IconButton
                          onClick={() => {
                            const data = {};
                            data.account_status = "forbidden";
                            changeAccountStatusUserMutation.mutate({
                              user_id: user.id,
                              data: data,
                            });
                          }}
                        >
                          <LockOutlinedIcon
                            sx={{
                              color: theme.palette.LIGHT_BLUE,
                            }}
                          />
                        </IconButton>
                      )}

                    {user.type === "user" &&
                      user.account_status === "forbidden" && (
                        <IconButton
                          onClick={() => {
                            const data = {};
                            data.account_status = "active";
                            changeAccountStatusUserMutation.mutate({
                              user_id: user.id,
                              data: data,
                            });
                          }}
                        >
                          <LockOpenOutlinedIcon
                            sx={{
                              color: theme.palette.LIGHT_BLUE,
                            }}
                          />
                        </IconButton>
                      )}
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

export default Users;
