import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Box, Stack } from "@mui/material";
// import { activityData } from "./DataSource";
import { DataContext } from "../../dataContext";

export default function RecentActivities() {
  const { recentActivities } = useContext(DataContext);
  return (
    <Box pb={1}>
      <List
        sx={{
          height: 350,
          width: "100%",
          bgcolor: "background.paper",
          overflowY: "scroll",
        }}>
        {recentActivities &&
          recentActivities
            .reverse()
            .slice(0, 5)
            .map((val, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemText
                  sx={{ pl: 1, borderLeft: "2px solid red " }}
                  primary=""
                  secondary={
                    <React.Fragment>
                      <Stack justifyContent="stretch">
                        <Typography
                          variant="p"
                          fontSize="small"
                          fontWeight="bold"
                          noWrap
                          color="text.primary">
                          {val.title}
                        </Typography>
                        <Typography
                          fontSize="small"
                          variant="p"
                          color="text.primary">{`- ${val.Message}`}</Typography>
                      </Stack>
                      {val.Time}{" "}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
      </List>
    </Box>
  );
}
