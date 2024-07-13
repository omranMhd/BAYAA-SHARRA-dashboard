import React from "react";
import { Outlet, Link } from "react-router-dom";
import MainAppBar from "../Components/MainAppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SideMenuDashboard from "../Components/SideMenuDashboard";

function HomeTest() {
  return (
    <>
      <MainAppBar />
      <Grid container spacing={1} sx={{ mt: "55px" }}>
        <Grid item xs={10}>
          <Box
            sx={
              {
                // backgroundColor: "red",
                // mt:"10px"
              }
            }
          >
            <Outlet />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <SideMenuDashboard />
        </Grid>
      </Grid>
    </>
  );
}

export default HomeTest;
