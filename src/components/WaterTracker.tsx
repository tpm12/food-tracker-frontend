import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const WaterTracker: React.FC = () => {
  const [water, setWater] = useState("");
  const [waterLogs, setWaterLogs] = useState<{ id: number; amount: number }[]>([]);

  useEffect(() => {
    api.get("/water/1") // Replace with dynamic user ID later
      .then(response => setWaterLogs(response.data))
      .catch(error => console.error("Error fetching water logs:", error));
  }, []);

  const handleAddWater = () => {
    if (water) {
      const newEntry = { user: { id: 1 }, amount: parseFloat(water) };

      api.post("/water", newEntry)
        .then(response => {
          setWaterLogs([...waterLogs, response.data]);
          setWater("");
        })
        .catch(error => console.error("Error adding water intake:", error));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 400 }}>
      <Typography variant="h5" align="center" gutterBottom>
        💧 Water Tracker
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Water Intake (liters)"
          type="number"
          variant="outlined"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddWater}>
          Log Water
        </Button>
      </Box>

      <List sx={{ mt: 2 }}>
        {waterLogs.map((log) => (
          <ListItem key={log.id} divider>
            <ListItemText primary={`${log.amount} L`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default WaterTracker;
