import React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

// import { styled } from '@mui/system';

// const StyledGridItem = styled(Grid)({
//     backgroundColor: 'blue',
//     color: 'white',
//     '&:hover': {
//       backgroundColor: 'darkblue',
//     },
//   });
function GridItem({ label, value }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  return (
    <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <HomeIcon
            sx={{
              color: theme.palette.LIGHT_BLUE,
              marginX: "10px",
            }}
          />{" "}
          <Typography>{t(label)} :</Typography>
        </Box>
        <Box>{value}</Box>
      </Box>
      <Divider
        sx={{ width: "100%", backgroundColor: theme.palette.LIGHT_BLUE }}
      />
    </Grid>
  );
}

function AdditionalAdvertisementInfo({ adCategory, additionalInfo }) {
  return (
    <Box
      sx={{
        mt: "10px",
      }}
    >
      {/* <Typography>{adCategory}</Typography> */}
      {adCategory === "Apartment" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"roomCount"} value={additionalInfo.roomCount} />
            <GridItem label={"cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {adCategory === "Farm" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"floorsCount"} value={additionalInfo.floorCount} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"roomCount"} value={additionalInfo.roomCount} />
            <GridItem label={"cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {adCategory === "Land" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
        </Box>
      )}
      {adCategory === "Store" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
        </Box>
      )}
      {adCategory === "Office" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"roomCount"} value={additionalInfo.roomCount} />
            <GridItem label={"cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {adCategory === "Chalet" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"roomCount"} value={additionalInfo.roomCount} />
            <GridItem label={"cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
        </Box>
      )}
      {adCategory === "Villa" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"area"} value={additionalInfo.area} />
            <GridItem label={"floorsCount"} value={additionalInfo.floorCount} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"roomCount"} value={additionalInfo.roomCount} />
            <GridItem label={"cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {[
        "Car",
        "Motorcycle",
        "Truck",
        "Bus",
        "Jabala",
        "Crane",
        "Bulldozer",
      ].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"model"}
              value={`${additionalInfo.brand} ${additionalInfo.model}`}
            />
            <GridItem label={"vehicleColor"} value={additionalInfo.color} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"gear"} value={additionalInfo.gear} />
            <GridItem
              label={"manufactureYear"}
              value={additionalInfo.manufactureYear}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"traveledDistance"}
              value={additionalInfo.traveledDistance}
            />
            <GridItem
              label={"engineCapacity"}
              value={additionalInfo.engineCapacity}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"fuel"} value={additionalInfo.fuel} />
            <GridItem label={"sellOrRent"} value={additionalInfo.sellOrRent} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"paintStatus"}
              value={additionalInfo.paintStatus}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Spare parts" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Vehicle Type"}
              value={additionalInfo.vehicleType}
            />
            <GridItem label={"Status"} value={additionalInfo.status} />
          </Grid>
        </Box>
      )}
      {["Mobile", "Tablet"].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"model"}
              value={`${additionalInfo.brand} ${additionalInfo.category}`}
            />
            <GridItem label={"deviceStatus"} value={additionalInfo.status} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ram"} value={additionalInfo.ram} />
            <GridItem label={"hard"} value={additionalInfo.hard} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"batteryStatus"}
              value={additionalInfo.batteryStatus}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Computer" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"model"}
              value={`${additionalInfo.brand} ${additionalInfo.category}`}
            />
            <GridItem label={"deviceStatus"} value={additionalInfo.status} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"computerRam"} value={additionalInfo.ram} />
            <GridItem label={"computerHard"} value={additionalInfo.hard} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"batteryStatus"}
              value={additionalInfo.batteryStatus}
            />
            <GridItem label={"processor"} value={additionalInfo.processor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"screenType"} value={additionalInfo.screenType} />
            <GridItem label={"screenSize"} value={additionalInfo.screenSize} />
          </Grid>
        </Box>
      )}
      {adCategory === "Accessories" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"deviceType"} value={additionalInfo.deviceType} />
          </Grid>
        </Box>
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
      ].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"deviceStatus"}
              value={additionalInfo.deviceStatus}
            />
          </Grid>
        </Box>
      )}
      {["Bedroom", "Table", "Chair", "Bed", "Cabinet", "Sofa"].includes(
        adCategory
      ) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"furnitureStatus"} value={additionalInfo.status} />
            <GridItem label={"material"} value={additionalInfo.material} />
          </Grid>
        </Box>
      )}
      {["Men", "Women", "children"].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"clothesStatus"} value={additionalInfo.status} />
            <GridItem label={"clothesType"} value={additionalInfo.type} />
          </Grid>
        </Box>
      )}
      {[
        "Livestock",
        "Birds",
        "Cat",
        "Dog",
        "Fish",
        "gift",
        "Perfume",
        "Makeup",
        "Watch",
        "Glass",
        "Restaurant",
        "Cafe",
        "Park",
        "Bakery",
        "Book",
        "Stationery",
        "Musical Instrument",
        "Children equipment",
        "Sports and clubs",
        "Industrial equipment",
      ].includes(adCategory) && (
        <Box>
          {/* <Grid container spacing={3} sx={{
            marginBottom:"10px"
          }}>
            <GridItem label={"status"} value={additionalInfo.status} />
            <GridItem label={"Type"} value={additionalInfo.type} />
          </Grid> */}
        </Box>
      )}
    </Box>
  );
}

export default AdditionalAdvertisementInfo;
