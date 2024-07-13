import { Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import StatisticBox from "../Components/StatisticBox";
import { t } from "i18next";

function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const { isLoading: getStatisticsIsLoading, data: statisticsData } = useQuery(
    "get-statistics",
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.get("/get-statistics");
    },
    {
      onSuccess: (response) => {
        console.log("ffffffffff :", response.data.data);
        setStatistics(response.data.data);
      },
      onError: (error) => {},
      onSettled: () => {},
    }
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        mt: "100px",
        // border:"1px solid red"
      }}
    >
      {/* <StatisticBox title={t("users")} count={statistics?.users} />
      <StatisticBox title={t("All Ads")} count={statistics?.advertisements} />
      <StatisticBox
        title={t("Closed Ads")}
        count={statistics?.closed_advertisements}
      />
      <StatisticBox
        title={t("Active Ads")}
        count={statistics?.active_advertisements}
      />
      <StatisticBox
        title={t("Closed Paid Ads")}
        count={statistics?.closed_paidFor_advertisements}
      /> */}
      <StatisticBox title="users" count={statistics?.users} />
      <StatisticBox title="All Ads" count={statistics?.advertisements} />
      <StatisticBox
        title="Closed Ads"
        count={statistics?.closed_advertisements}
      />
      <StatisticBox
        title="Active Ads"
        count={statistics?.active_advertisements}
      />
      <StatisticBox
        title="Closed Paid Ads"
        count={statistics?.closed_paidFor_advertisements}
      />
    </Box>
  );
}

export default Statistics;
