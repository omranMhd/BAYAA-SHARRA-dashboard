import React, { useState } from "react";
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { convertFilterData } from "../Helpers/formatNewAdDataform";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import CircularProgress from "@mui/material/CircularProgress";

function FilterDialog({ openFilterDialog, setOpenFilterDialog }) {
  const { t, i18n } = useTranslation();
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const [subCategories, setSubCategories] = useState(null);
  const [mobOrTabBrands, setMobOrTabBrands] = useState([
    {
      brand: {
        en: "iphone",
        ar: "آيفون",
      },
      categories: [
        {
          en: "14",
          ar: "14",
        },
        {
          en: "14 Plus",
          ar: "14 بلاس",
        },
        {
          en: "14 Pro",
          ar: "14 برو",
        },
      ],
    },
    {
      brand: {
        en: "samsung",
        ar: "سامسونغ",
      },
      categories: [
        {
          en: "A12",
          ar: "A12",
        },
        {
          en: "J5",
          ar: "J5",
        },
        {
          en: "A13",
          ar: "A13",
        },
        {
          en: "Note5",
          ar: "نوت 5",
        },
      ],
    },
    {
      brand: {
        en: "huawei",
        ar: "هواوي",
      },
      categories: [],
    },
    {
      brand: {
        en: "sony",
        ar: "سوني",
      },
      categories: [],
    },
    {
      brand: {
        en: "blackberry",
        ar: "بلاك بيري",
      },
      categories: [],
    },
    {
      brand: {
        en: "nokia",
        ar: "نوكيا",
      },
      categories: [],
    },
    {
      brand: {
        en: "htc",
        ar: "إتش تي سي",
      },
      categories: [],
    },
    {
      brand: {
        en: "xiaomi",
        ar: "شاومي",
      },
      categories: [],
    },
  ]);
  const [filtersValues, setFiltersValues] = useState({
    category: null,
    subCategory: null,
    sellOrRent: null,
    country: null,
    city: null,
    areaFrom: null,
    areaTo: null,
    ownership: null,
    priceFrom: null,
    priceTo: null,
    currency: null,
    direction: null,
    roomCount: null,
    floor: null,
    cladding: null,
    floorsCount: null,
    vehicleBrand: null,
    vehicleModel: null,
    paintStatus: null,
    vehicleColor: null,
    fuel: null,
    gear: null,
    sparePartVehicleType: null,
    sparePartStatus: null,
    mobOrTabBrand: null, // mobile or tablet Brand
    mobOrTabCategory: null, // mobile or tablet Category
    deviceStatus: null,
    batteryStatus: null,
    computerBrand: null,
    computerCategory: null,
    processor: null,
    screenType: null,
    screenSize: null,
    accessoriesDeviceType: null,
    material: null,
    furnitureStatus: null,
    clothesType: null,
    clothesStatus: null,
  });

  const getfilterdAdsMutation = useMutation(
    (queryParams) => {
      console.log("queryParams :", queryParams);
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get(`/advertisements-filter?${queryParams}`);
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
        setOpenFilterDialog(false);
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

  const { data: vehiclesBrandsResponse } = useQuery(
    "vehicles-brands",
    () => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get("/vehicles-brands");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );
  const modelsCorrespondingToTheSelectedVehicleBrand =
    vehiclesBrandsResponse?.data.find(
      (brand) => brand.brand.en === filtersValues.vehicleBrand
    )?.models;

  const categoriesCorrespondingToTheSelectedMobOrTabBrand = mobOrTabBrands.find(
    (brand) => brand.brand.en === filtersValues.mobOrTabBrand
  )?.categories;
  // const {
  //   isLoading: realestatesdAdsIsLoading,
  //   data: realestatesAds,
  //   refetch,
  // } = useQuery(
  //   `filterd-ads`,
  //   (queryParams) => {
  //     console.log("queryParams :", queryParams);
  //     if (isUserLogedin) {
  //       const user_id = JSON.parse(localStorage.getItem("user")).id;

  //       return axiosInstance.get(
  //         `/advertisements-filter/${user_id}?${queryParams}`
  //       );
  //     } else {
  //       return axiosInstance.get(`/advertisements-filter?${queryParams}`);
  //     }
  //   },
  //   {
  //     onSuccess: (response) => {
  //       console.log("rrr :", response.data.data);
  //       // setAds(response.data.data);
  //     },
  //     refetchInterval: false, // Disables automatic refetching
  //     enabled: false,
  //   }
  // );

  function resetFilterValues() {
    setFiltersValues((prevState) => {
      return {
        category: null,
        subCategory: null,
        sellOrRent: null,
        country: null,
        city: null,
        areaFrom: null,
        areaTo: null,
        ownership: null,
        priceFrom: null,
        priceTo: null,
        currency: null,
        direction: null,
        roomCount: null,
        floor: null,
        cladding: null,
        floorsCount: null,
        vehicleBrand: null,
        vehicleModel: null,
        paintStatus: null,
        vehicleColor: null,
        fuel: null,
        gear: null,
        sparePartVehicleType: null,
        sparePartStatus: null,
        mobOrTabBrand: null, // mobile or tablet Brand
        mobOrTabCategory: null, // mobile or tablet Category
        deviceStatus: null,
        batteryStatus: null,
        computerBrand: null,
        computerCategory: null,
        processor: null,
        screenType: null,
        screenSize: null,
        accessoriesDeviceType: null,
        material: null,
        furnitureStatus: null,
        clothesType: null,
        clothesStatus: null,
      };
    });
  }

  const { data: mainCategoriesResponse } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );

  const getSubCategoriesByIdMutation = useMutation(
    (id) => axiosInstance.get(`/sub-categories/${id}`),
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("aaaaaaaaaaaaaaaaaaaaaa :", response.data.data);
        setSubCategories(response.data.data);
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
  /*هنا نقوم باختيار فقط المدن التي تنتمي الى البلد المختار لاستخدامها ضمن الـ
  select
  الخاصة بالمدينة
  */
  const citiesCorrespondingToTheSelectedCountry = countriesInfo?.find(
    (country) => country.country === filtersValues.country
  )?.cities;

  return (
    <Dialog
      open={openFilterDialog}
      onClose={() => {
        setOpenFilterDialog(false);
      }}
      sx={{
        direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {/* {t("Write Your Reply")} */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{t("filters")}</Typography>
          <IconButton
            aria-label="delete"
            color="primary"
            size="small"
            onClick={() => {
              setOpenFilterDialog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2}>
            {/* category */}
            <Grid item xs={6} sm={6}>
              <TextField
                autoComplete="given-name"
                select
                required
                fullWidth
                id="category"
                label={t("Category")}
                size="small"
                margin="normal"
                value={filtersValues.category}
                onChange={(e) => {
                  setFiltersValues({
                    ...filtersValues,
                    category: e.target.value,
                    subCategory: null,
                  });
                  //   console.log("ff :", e.target.value);
                }}
              >
                {mainCategoriesResponse?.data.map((category) => {
                  return (
                    <MenuItem
                      key={category.id}
                      value={category.name_en}
                      onClick={() => {
                        // alert(category.id);
                        getSubCategoriesByIdMutation.mutate(category.id);
                      }}
                    >
                      {i18n.language === "en"
                        ? category.name_en
                        : category.name_ar}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                select
                fullWidth
                required
                id="Sub Category"
                label={t("SubCategory")}
                autoComplete="family-name"
                size="small"
                margin="normal"
                value={filtersValues.subCategory}
                onChange={(e) => {
                  setFiltersValues({
                    ...filtersValues,
                    subCategory: e.target.value,
                  });
                  //   console.log("ff :", e.target.value);
                }}
              >
                {subCategories?.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.name_en}>
                      {i18n.language === "en"
                        ? category.name_en
                        : category.name_ar}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>
          {/* sell or rent for realEstate and vehicles (exept "Spare parts") only */}
          {(filtersValues.category === "RealEstates" ||
            (filtersValues.category === "vehicles" &&
              filtersValues.subCategory !== "Spare parts")) && (
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={filtersValues.sellOrRent}
                // onChange={handleChange}
                size="small"
              >
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label={t("sell")}
                  onChange={(e) => {
                    setFiltersValues({
                      ...filtersValues,
                      sellOrRent: e.target.value,
                    });
                    //   console.log("ff :", e.target.value);
                  }}
                />
                <FormControlLabel
                  value="rent"
                  control={<Radio />}
                  label={t("rent")}
                  onChange={(e) => {
                    setFiltersValues({
                      ...filtersValues,
                      sellOrRent: e.target.value,
                    });
                    //   console.log("ff :", e.target.value);
                  }}
                />
              </RadioGroup>
            </FormControl>
          )}

          <Grid container spacing={2}>
            {/*Country  */}
            <Grid item xs={6} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="country"
                // label={t("Country")}
                label={t("Country")}
                size="small"
                margin="normal"
                value={filtersValues.country}
                onChange={(e) => {
                  setFiltersValues({
                    ...filtersValues,
                    country: e.target.value,
                    city: null,
                  });
                  //   console.log("ff :", e.target.value);
                }}
              >
                {countriesInfo?.map((country) => {
                  return (
                    <MenuItem key={country.country} value={country.country}>
                      {i18n.language === "en"
                        ? country.country
                        : country.country_ar}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            {/* City */}
            <Grid item xs={6} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="city"
                label={t("City")}
                // label="City"
                autoComplete="family-name"
                size="small"
                margin="normal"
                value={filtersValues.city}
                onChange={(e) => {
                  setFiltersValues({
                    ...filtersValues,
                    city: e.target.value,
                  });
                  //   console.log("ff :", e.target.value);
                }}
              >
                {citiesCorrespondingToTheSelectedCountry?.map((city) => {
                  return (
                    <MenuItem key={city.en} value={city.en}>
                      {i18n.language === "en" ? city.en : city.ar}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>

          {filtersValues.category === "RealEstates" && (
            <>
              <Grid container spacing={2}>
                {/*area from  */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("area from")}
                    size="small"
                    margin="normal"
                    value={filtersValues.areaFrom}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        areaFrom: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* area to */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("area to")}
                    size="small"
                    margin="normal"
                    value={filtersValues.areaTo}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        areaTo: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    select
                    fullWidth
                    id="country"
                    // label={t("Country")}
                    label={t("ownership")}
                    size="small"
                    margin="normal"
                    value={filtersValues.ownership}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        ownership: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    <MenuItem key={"tabo"} value={"tabo"}>
                      tabo
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {/*price from  */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price from")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceFrom}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceFrom: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* price to */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price to")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceTo}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceTo: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* currency */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="currency"
                    label={t("currency")}
                    size="small"
                    margin="normal"
                    value={filtersValues.currency}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        currency: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    {countriesInfo
                      .map((country) => {
                        return country.currency;
                      })
                      .map((currency) => {
                        return (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {["Apartment", "Farm", "Office", "Villa"].includes(
                  filtersValues.subCategory
                ) && (
                  <>
                    {/*direction  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="direction"
                        label={t("direction")}
                        size="small"
                        margin="normal"
                        value={filtersValues.direction}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            direction: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"north"}>North</MenuItem>
                        <MenuItem value={"south"}>South</MenuItem>
                        <MenuItem value={"west"}>West</MenuItem>
                        <MenuItem value={"east"}>East</MenuItem>
                        <MenuItem value={"north-east"}>North-East</MenuItem>
                        <MenuItem value={"north-west"}>North-West</MenuItem>
                        <MenuItem value={"south-east"}>South-East</MenuItem>
                        <MenuItem value={"south-west"}>South-West</MenuItem>
                      </TextField>
                    </Grid>
                  </>
                )}
                {["Apartment", "Farm", "Office", "Villa", "Chalet"].includes(
                  filtersValues.subCategory
                ) && (
                  <>
                    {/*room count  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        type="number"
                        autoComplete="given-name"
                        fullWidth
                        id="roomCount"
                        label={t("roomCount")}
                        size="small"
                        margin="normal"
                        value={filtersValues.roomCount}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            roomCount: Number(e.target.value),
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      />
                    </Grid>
                  </>
                )}

                {["Apartment", "Store", "Office", "Chalet"].includes(
                  filtersValues.subCategory
                ) && (
                  <>
                    {/*floor  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        type="number"
                        autoComplete="given-name"
                        fullWidth
                        id="floor"
                        label={t("floor")}
                        size="small"
                        margin="normal"
                        value={filtersValues.floor}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            floor: Number(e.target.value),
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      />
                    </Grid>
                  </>
                )}

                {[
                  "Apartment",
                  "Farm",
                  "Store",
                  "Office",
                  "Chalet",
                  "Villa",
                ].includes(filtersValues.subCategory) && (
                  <>
                    {/*cladding  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="cladding"
                        label={t("cladding")}
                        size="small"
                        margin="normal"
                        value={filtersValues.cladding}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            cladding: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"deluxe"}>deluxe</MenuItem>
                        <MenuItem value={"new"}>new</MenuItem>
                        <MenuItem value={"good"}>good</MenuItem>
                        <MenuItem value={"old"}>old</MenuItem>
                        <MenuItem value={"chassis"}>chassis</MenuItem>
                      </TextField>
                    </Grid>
                  </>
                )}
                {["Farm", "Villa"].includes(filtersValues.subCategory) && (
                  <>
                    {/*floorsCount  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        type="number"
                        autoComplete="given-name"
                        fullWidth
                        id="floorsCount"
                        label={t("floorsCount")}
                        size="small"
                        margin="normal"
                        value={filtersValues.floorsCount}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            floorsCount: Number(e.target.value),
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
          {filtersValues.category === "vehicles" &&
            [
              "Car",
              "Motorcycle",
              "Truck",
              "Bus",
              "Jabala",
              "Crane",
              "Bulldozer",
            ].includes(filtersValues.subCategory) && (
              <>
                <Grid container spacing={2}>
                  {/* vehicleBrand */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="vehicleBrand"
                      label={t("vehicleBrand")}
                      size="small"
                      margin="normal"
                      value={filtersValues.vehicleBrand}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          vehicleBrand: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      {vehiclesBrandsResponse?.data.map((brand) => {
                        return (
                          <MenuItem value={brand.brand.en}>
                            {brand.brand.en}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  {/* vehicleModel */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="vehicleModel"
                      label={t("vehicleModel")}
                      size="small"
                      margin="normal"
                      value={filtersValues.vehicleModel}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          vehicleModel: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      {modelsCorrespondingToTheSelectedVehicleBrand?.map(
                        (model) => {
                          return (
                            <MenuItem key={model.en} value={model.en}>
                              {i18n.language === "en" ? model.en : model.ar}
                            </MenuItem>
                          );
                        }
                      )}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* paint status */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="paintStatus"
                      label={t("paintStatus")}
                      size="small"
                      margin="normal"
                      value={filtersValues.paintStatus}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          paintStatus: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      <MenuItem value={"original"}>original</MenuItem>
                      <MenuItem value={"repainted"}>repainted</MenuItem>
                    </TextField>
                  </Grid>
                  {/* vehicle color */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="vehicleColor"
                      label={t("vehicleColor")}
                      size="small"
                      margin="normal"
                      value={filtersValues.vehicleColor}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          vehicleColor: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      <MenuItem value={"red"}>Red</MenuItem>
                      <MenuItem value={"blue"}>Blue</MenuItem>
                      <MenuItem value={"black"}>Black</MenuItem>
                      <MenuItem value={"yallow"}>yallow</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  {/* gear */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="gear"
                      label={t("gear")}
                      size="small"
                      margin="normal"
                      value={filtersValues.gear}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          gear: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      <MenuItem value={"normal"}>Normal</MenuItem>
                      <MenuItem value={"automatic"}>Automatic</MenuItem>
                    </TextField>
                  </Grid>
                  {/* fuel */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="fuel"
                      label={t("fuel")}
                      size="small"
                      margin="normal"
                      value={filtersValues.fuel}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          fuel: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      <MenuItem value={"penzen"}>penzen</MenuItem>
                      <MenuItem value={"diesel"}>diesel</MenuItem>
                      <MenuItem value={"electricity"}>electricity</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  {/*price from  */}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="area"
                      label={t("price from")}
                      size="small"
                      margin="normal"
                      value={filtersValues.priceFrom}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          priceFrom: Number(e.target.value),
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    />
                  </Grid>
                  {/* price to */}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="area"
                      label={t("price to")}
                      size="small"
                      margin="normal"
                      value={filtersValues.priceTo}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          priceTo: Number(e.target.value),
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    />
                  </Grid>
                  {/* currency */}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="currency"
                      label={t("currency")}
                      size="small"
                      margin="normal"
                      value={filtersValues.currency}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          currency: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      {countriesInfo
                        .map((country) => {
                          return country.currency;
                        })
                        .map((currency) => {
                          return (
                            <MenuItem key={currency} value={currency}>
                              {currency}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>
                </Grid>
              </>
            )}
          {filtersValues.category === "vehicles" &&
            filtersValues.subCategory === "Spare parts" && (
              <>
                <Grid container spacing={2}>
                  {/* sparePartVehicleType */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="vehicleType"
                      label={t("vehicleType")}
                      size="small"
                      margin="normal"
                      value={filtersValues.sparePartVehicleType}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          sparePartVehicleType: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      {subCategories?.map((category) => {
                        if (category.name_en !== "Spare parts") {
                          return (
                            <MenuItem
                              key={category.id}
                              value={category.name_en}
                            >
                              {i18n.language == "en" && category.name_en}
                              {i18n.language == "ar" && category.name_ar}
                            </MenuItem>
                          );
                        }
                      })}
                    </TextField>
                  </Grid>
                  {/* sparePartStatus */}
                  <Grid item xs={6} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="sparePartStatus"
                      label={t("sparePartStatus")}
                      size="small"
                      margin="normal"
                      value={filtersValues.sparePartStatus}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          sparePartStatus: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      <MenuItem value={"old"}>Old</MenuItem>
                      <MenuItem value={"new"}>New</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/*price from  */}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="area"
                      label={t("price from")}
                      size="small"
                      margin="normal"
                      value={filtersValues.priceFrom}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          priceFrom: Number(e.target.value),
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    />
                  </Grid>
                  {/* price to */}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="area"
                      label={t("price to")}
                      size="small"
                      margin="normal"
                      value={filtersValues.priceTo}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          priceTo: Number(e.target.value),
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    />
                  </Grid>
                  {/* currency */}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="currency"
                      label={t("currency")}
                      size="small"
                      margin="normal"
                      value={filtersValues.currency}
                      onChange={(e) => {
                        setFiltersValues({
                          ...filtersValues,
                          currency: e.target.value,
                        });
                        //   console.log("ff :", e.target.value);
                      }}
                    >
                      {countriesInfo
                        .map((country) => {
                          return country.currency;
                        })
                        .map((currency) => {
                          return (
                            <MenuItem key={currency} value={currency}>
                              {currency}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>
                </Grid>
              </>
            )}
          {filtersValues.category === "Devices" && (
            <>
              <Grid container spacing={2}>
                {/*price from  */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price from")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceFrom}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceFrom: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* price to */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price to")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceTo}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceTo: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* currency */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="currency"
                    label={t("currency")}
                    size="small"
                    margin="normal"
                    value={filtersValues.currency}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        currency: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    {countriesInfo
                      .map((country) => {
                        return country.currency;
                      })
                      .map((currency) => {
                        return (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Grid>
              </Grid>

              {["Mobile", "Tablet"].includes(filtersValues.subCategory) && (
                <>
                  <Grid container spacing={2}>
                    {/* mobOrTabBrand  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="mobOrTabBrand"
                        label={
                          filtersValues.subCategory === "Mobile"
                            ? t("mobileBrand")
                            : t("tabletBrand")
                        }
                        size="small"
                        margin="normal"
                        value={filtersValues.mobOrTabBrand}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            mobOrTabBrand: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        {mobOrTabBrands.map((brand) => {
                          return (
                            <MenuItem
                              key={brand.brand.en}
                              value={brand.brand.en}
                            >
                              {i18n.language === "en"
                                ? brand.brand.en
                                : brand.brand.ar}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                    {/* mobOrTabCategory */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="mobOrTabCategory"
                        label={
                          filtersValues.subCategory === "Mobile"
                            ? t("mobileCategory")
                            : t("tabletCategory")
                        }
                        size="small"
                        margin="normal"
                        value={filtersValues.mobOrTabCategory}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            mobOrTabCategory: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        {categoriesCorrespondingToTheSelectedMobOrTabBrand?.map(
                          (c) => {
                            return (
                              <MenuItem value={c.en}>
                                {i18n.language === "en" ? c.en : c.ar}
                              </MenuItem>
                            );
                          }
                        )}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* DiviceStatus  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="deviceStatus"
                        label={t("deviceStatus")}
                        size="small"
                        margin="normal"
                        value={filtersValues.deviceStatus}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            deviceStatus: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"old"}>Old</MenuItem>
                        <MenuItem value={"new"}>New</MenuItem>
                      </TextField>
                    </Grid>
                    {/* BatteryStatus */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="batteryStatus"
                        label={t("batteryStatus")}
                        size="small"
                        margin="normal"
                        value={filtersValues.batteryStatus}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            batteryStatus: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"original"}>original</MenuItem>
                        <MenuItem value={"replaced"}>replaced</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </>
              )}
              {filtersValues.subCategory === "Computer" && (
                <>
                  <Grid container spacing={2}>
                    {/* computerBrand  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="computerBrand"
                        label={t("computerBrand")}
                        size="small"
                        margin="normal"
                        value={filtersValues.computerBrand}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            computerBrand: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"Samsung"}>Samsung</MenuItem>
                        <MenuItem value={"HP"}>HP</MenuItem>
                        <MenuItem value={"ASUS"}>ASUS</MenuItem>
                        <MenuItem value={"Toshiba"}>Toshiba</MenuItem>
                      </TextField>
                    </Grid>
                    {/* computerCategory */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="computerCategory"
                        label={t("computerCategory")}
                        size="small"
                        margin="normal"
                        value={filtersValues.computerCategory}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            computerCategory: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"Victus"}>Victus</MenuItem>
                        <MenuItem value={"vivo book"}>vivo book</MenuItem>
                        <MenuItem value={"EliteBook"}>EliteBook</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* DiviceStatus  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="deviceStatus"
                        label={t("deviceStatus")}
                        size="small"
                        margin="normal"
                        value={filtersValues.deviceStatus}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            deviceStatus: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"old"}>Old</MenuItem>
                        <MenuItem value={"new"}>New</MenuItem>
                      </TextField>
                    </Grid>
                    {/* processor */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        fullWidth
                        id="processor"
                        label={t("processor")}
                        size="small"
                        margin="normal"
                        value={filtersValues.processor}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            processor: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* screenType  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="screenType"
                        label={t("screenType")}
                        size="small"
                        margin="normal"
                        value={filtersValues.screenType}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            screenType: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"touch"}>touch</MenuItem>
                        <MenuItem value={"normal"}>normal</MenuItem>
                      </TextField>
                    </Grid>
                    {/* screenSize */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        type="number"
                        autoComplete="given-name"
                        fullWidth
                        id="screenSize"
                        label={t("screenSize")}
                        size="small"
                        margin="normal"
                        value={filtersValues.screenSize}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            screenSize: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {filtersValues.subCategory === "Accessories" && (
                <>
                  <Grid container spacing={2}>
                    {/* screenType  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="deviceType"
                        label={t("deviceType")}
                        size="small"
                        margin="normal"
                        value={filtersValues.accessoriesDeviceType}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            accessoriesDeviceType: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"Tablet"}>Tablet</MenuItem>
                        <MenuItem value={"Mobile"}>Mobile</MenuItem>
                        <MenuItem value={"Computer"}>Computer</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </>
              )}
              {[
                "Refrigerator",
                "Washing Machine",
                "Fan",
                "Heater",
                "Blenders juicers",
                "Oven Microwave",
                "Screen",
                "Receiver",
                "Solar Energy",
              ].includes(filtersValues.subCategory) && (
                <>
                  <Grid container spacing={2}>
                    {/* deviceStatus  */}
                    <Grid item xs={6} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="deviceStatus"
                        label={t("deviceStatus")}
                        size="small"
                        margin="normal"
                        value={filtersValues.deviceStatus}
                        onChange={(e) => {
                          setFiltersValues({
                            ...filtersValues,
                            deviceStatus: e.target.value,
                          });
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        <MenuItem value={"old"}>Old</MenuItem>
                        <MenuItem value={"new"}>New</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          )}

          {filtersValues.category === "Furniture" && (
            <>
              <Grid container spacing={2}>
                {/*price from  */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price from")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceFrom}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceFrom: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* price to */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price to")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceTo}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceTo: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* currency */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="currency"
                    label={t("currency")}
                    size="small"
                    margin="normal"
                    value={filtersValues.currency}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        currency: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    {countriesInfo
                      .map((country) => {
                        return country.currency;
                      })
                      .map((currency) => {
                        return (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* material  */}
                <Grid item xs={6} sm={6}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="material"
                    label={t("material")}
                    size="small"
                    margin="normal"
                    value={filtersValues.material}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        material: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    <MenuItem value={"wood"}>wood</MenuItem>
                    <MenuItem value={"metal"}>metal</MenuItem>
                    <MenuItem value={"leather"}>leather</MenuItem>
                    <MenuItem value={"plastic"}>plastic</MenuItem>
                  </TextField>
                </Grid>
                {/* computerCategory */}
                <Grid item xs={6} sm={6}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="furnitureStatus"
                    label={t("furnitureStatus")}
                    size="small"
                    margin="normal"
                    value={filtersValues.furnitureStatus}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        furnitureStatus: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    <MenuItem value={"old"}>Old</MenuItem>
                    <MenuItem value={"new"}>New</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}

          {filtersValues.category === "Clothing and fashion" && (
            <>
              <Grid container spacing={2}>
                {/*price from  */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price from")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceFrom}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceFrom: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* price to */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price to")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceTo}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceTo: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* currency */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="currency"
                    label={t("currency")}
                    size="small"
                    margin="normal"
                    value={filtersValues.currency}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        currency: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    {countriesInfo
                      .map((country) => {
                        return country.currency;
                      })
                      .map((currency) => {
                        return (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* clothesType  */}
                <Grid item xs={6} sm={6}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="clothesType"
                    label={t("clothesType")}
                    size="small"
                    margin="normal"
                    value={filtersValues.clothesType}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        clothesType: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    <MenuItem value={"pants"}>pants</MenuItem>
                    <MenuItem value={"shirt"}>shirt</MenuItem>
                    <MenuItem value={"jacket"}>jacket</MenuItem>
                    <MenuItem value={"formal suit"}>formal suit</MenuItem>
                    <MenuItem value={"shoes"}>shoes</MenuItem>
                  </TextField>
                </Grid>
                {/* clothesStatus */}
                <Grid item xs={6} sm={6}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="clothesStatus"
                    label={t("clothesStatus")}
                    size="small"
                    margin="normal"
                    value={filtersValues.clothesStatus}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        clothesStatus: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    <MenuItem value={"old"}>Old</MenuItem>
                    <MenuItem value={"new"}>New</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}

          {[
            "Animals",
            "Personal Collections",
            "Food and drinks",
            "Books and hobbies",
            "Children equipment",
            "Sports and clubs",
            "Industrial equipment",
          ].includes(filtersValues.category) && (
            <>
              {/* just price and currency */}
              <Grid container spacing={2}>
                {/*price from  */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price from")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceFrom}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceFrom: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* price to */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    fullWidth
                    id="area"
                    label={t("price to")}
                    size="small"
                    margin="normal"
                    value={filtersValues.priceTo}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        priceTo: Number(e.target.value),
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  />
                </Grid>
                {/* currency */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    select
                    autoComplete="given-name"
                    fullWidth
                    id="currency"
                    label={t("currency")}
                    size="small"
                    margin="normal"
                    value={filtersValues.currency}
                    onChange={(e) => {
                      setFiltersValues({
                        ...filtersValues,
                        currency: e.target.value,
                      });
                      //   console.log("ff :", e.target.value);
                    }}
                  >
                    {countriesInfo
                      .map((country) => {
                        return country.currency;
                      })
                      .map((currency) => {
                        return (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            resetFilterValues();
          }}
          sx={{
            mx: "10px",
          }}
        >
          {t("reset")}
        </Button>
        <Button
          disabled={false}
          variant="contained"
          onClick={() => {
            console.log("filters :", filtersValues);
            const convertedData = convertFilterData(filtersValues);

            console.log("filters after cleaning :", convertedData);
            console.log(
              "filters after converted to query params :",
              new URLSearchParams(convertedData).toString()
            );
            const queryParams = new URLSearchParams(convertedData).toString();

            getfilterdAdsMutation.mutate(queryParams);
          }}
          autoFocus
        >
          {getfilterdAdsMutation.isLoading ? (
            <CircularProgress size={25} style={{ color: "white" }} />
          ) : (
            t("filter")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterDialog;
