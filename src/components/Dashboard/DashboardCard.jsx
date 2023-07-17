import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
const DashboardCard = ({ title, value = 0 }) => {
  return (
    <Card
      sx={{
        borderTop: "5px solid #7575ff",
        width: { xs: "12rem", md: "20rem" },
      }}>
      <CardContent>
        <Typography fontSize={18}>{title}</Typography>
        <Typography align="center" color="#7575ff" variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
