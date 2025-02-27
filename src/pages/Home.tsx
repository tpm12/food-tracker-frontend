import React from "react";
import FoodTracker from "../components/FoodTracker";
import { Grid, Typography, Container } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🍽️ Food Tracker
      </Typography>
      <Grid container justifyContent="center">
        <FoodTracker />
      </Grid>
    </Container>
  );
};

export default Home;
