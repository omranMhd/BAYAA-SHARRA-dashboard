import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

function StatisticBox({ title, count }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        height: "150px",
        width: "300px",
        borderRadius: "5px",
        padding: "5px",
        margin: "5px",
        boxShadow: "0px 5px 5px 0px rgba(1, 1, 1, 0.50)", // Add a shadow on hover
        direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
    >
      <Typography variant="h6">{t(title)}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
          height: "75%",
        }}
      >
        <Typography variant="h3">{count}</Typography>
      </Box>
    </Box>
  );
}

export default StatisticBox;
