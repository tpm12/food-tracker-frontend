import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const FoodTracker: React.FC = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [foodEntries, setFoodEntries] = useState<{ id: number; foodName: string; calories: number }[]>([]);

  useEffect(() => {
    api.get("/food/1") // Replace with dynamic user ID later when implemented
      .then(response => setFoodEntries(response.data))
      .catch(error => console.error("Error fetching food entries:", error));
  }, []);

  const handleAddFood = () => {
    if (food && calories) {
      const newEntry = { user: { id: 1 }, foodName: food, calories: parseFloat(calories) };

      api.post("/food", newEntry)
        .then(response => {
          setFoodEntries([...foodEntries, response.data]);
          setFood("");
          setCalories("");
        })
        .catch(error => console.error("Error adding food:", error));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 400 }}>
      <Typography variant="h5" align="center" gutterBottom>
        🍽️ Food Tracker
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Food Name"
          variant="outlined"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <TextField
          label="Calories"
          type="number"
          variant="outlined"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddFood}>
          Add Food
        </Button>
      </Box>

      <List sx={{ mt: 2 }}>
        {foodEntries.map((entry) => (
          <ListItem key={entry.id} divider>
            <ListItemText primary={`${entry.foodName} - ${entry.calories} kcal`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FoodTracker;
