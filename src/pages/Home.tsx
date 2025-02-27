import React from "react";
import FoodTracker from "../components/FoodTracker";
import WaterTracker from "../components/WaterTracker";
import { Container, Grid, Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", pt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        🥗 Food & Water Tracker
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <FoodTracker />
        </Grid>
        <Grid item>
          <WaterTracker />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
